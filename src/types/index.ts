export interface Member {
  id: string;
  name: string;
}

export type SplitType = "equal" | "exact" | "shares" | "percentages";

export type ExpenseCategory =
  | "food"
  | "transport"
  | "lodging"
  | "entertainment"
  | "shopping"
  | "utilities"
  | "other";

export interface SplitShare {
  memberId: string;
  owedAmount: number;
  shareUnits?: number;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  date: string;
  category: ExpenseCategory;
  splitType: SplitType;
  splits: SplitShare[];
}

export interface Settlement {
  id: string;
  payerId: string;
  receiverId: string;
  amount: number;
  date: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  members: Member[];
  expenses: Expense[];
  settlements: Settlement[];
}

export type NetBalances = Record<string, number>;

export interface DebtTransaction {
  payerId: string;
  payerName: string;
  receiverId: string;
  receiverName: string;
  amount: number;
}
