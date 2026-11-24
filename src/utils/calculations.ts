import type { DebtTransaction, Group, NetBalances } from "../types";

const toCents = (amount: number) => Math.round(amount * 100);
const fromCents = (cents: number) => cents / 100;

export const getGroupNetBalances = (group: Group) => {
  const balancesInCents: NetBalances = {};

  // Initialize for every member
  for (const member of group.members) {
    balancesInCents[member.id] = 0;
  }

  // Process expenses
  for (const expense of group.expenses) {
    if (expense.paidBy in balancesInCents) {
      balancesInCents[expense.paidBy] += toCents(expense.amount);
    }

    for (const split of expense.splits) {
      if (split.memberId in balancesInCents) {
        balancesInCents[split.memberId] -= toCents(split.owedAmount);
      }
    }
  }

  // Process settlements
  for (const settlement of group.settlements) {
    if (settlement.payerId in balancesInCents) {
      balancesInCents[settlement.payerId] += toCents(settlement.amount);
    }
    if (settlement.receiverId in balancesInCents) {
      balancesInCents[settlement.receiverId] -= toCents(settlement.amount);
    }
  }

  const netBalances: NetBalances = {};
  for (const [memberId, cents] of Object.entries(balancesInCents)) {
    netBalances[memberId] = cents === 0 ? 0 : fromCents(cents);
  }
  return netBalances;
};

export const getMemberNetBalance = (group: Group, memberId: string) =>
  getGroupNetBalances(group)[memberId] ?? 0;

interface UserBalanceSummary {
  netBalance: number;
  totalPaid: number;
  totalShare: number;
}

export const getUserBalanceSummary = (
  group: Group,
  userId: string,
): UserBalanceSummary => {
  let paidCents = 0;
  let shareCents = 0;
  let settlementDeltaCents = 0;

  for (const expense of group.expenses) {
    if (expense.paidBy === userId) {
      paidCents += toCents(expense.amount);
    }

    const userSplit = expense.splits.find((split) => split.memberId === userId);
    if (userSplit) {
      shareCents += toCents(userSplit.owedAmount);
    }
  }

  for (const settlement of group.settlements) {
    if (settlement.payerId === userId) {
      settlementDeltaCents += toCents(settlement.amount);
    }
    if (settlement.receiverId === userId) {
      settlementDeltaCents -= toCents(settlement.amount);
    }
  }

  const netCents = paidCents - shareCents + settlementDeltaCents;
  return {
    netBalance: netCents === 0 ? 0 : fromCents(netCents),
    totalPaid: fromCents(paidCents),
    totalShare: fromCents(shareCents),
  };
};

export const simplifyDebts = (group: Group): DebtTransaction[] => {
  if (!group.members.length || !group.expenses.length) return [];

  const netBalances = getGroupNetBalances(group);

  // Initialize debtors and creditors
  interface DebtNode {
    memberId: string;
    name: string;
    cents: number;
  }

  const debtors: DebtNode[] = [];
  const creditors: DebtNode[] = [];

  for (const member of group.members) {
    const balance = netBalances[member.id] ?? 0;
    const cents = toCents(balance);

    if (cents < 0) {
      debtors.push({
        memberId: member.id,
        name: member.name,
        cents: Math.abs(cents),
      });
    } else if (cents > 0) {
      creditors.push({
        memberId: member.id,
        name: member.name,
        cents,
      });
    }
  }

  // Sort them in descending order of balance
  debtors.sort((a, b) => b.cents - a.cents);
  creditors.sort((a, b) => b.cents - a.cents);

  // Generate suggested settlements
  const transactions: DebtTransaction[] = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    const settleCents = Math.min(debtor.cents, creditor.cents);

    if (settleCents > 0) {
      transactions.push({
        payerId: debtor.memberId,
        payerName: debtor.name,
        receiverId: creditor.memberId,
        receiverName: creditor.name,
        amount: fromCents(settleCents),
      });
    }

    debtor.cents -= settleCents;
    creditor.cents -= settleCents;

    if (debtor.cents === 0) i++;
    if (creditor.cents === 0) j++;
  }

  return transactions;
};
