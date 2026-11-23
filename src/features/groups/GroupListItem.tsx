import { getBalanceTextClass } from "../../utils/balanceStyles";
import { formatSignedBalance } from "../../utils/formatters";

interface GroupListItemProps {
  id: string;
  name: string;
  isActive: boolean;
  userBalance: number;
  onSelect: (id: string) => void;
}

export function GroupListItem({
  id,
  name,
  isActive,
  userBalance,
  onSelect,
}: GroupListItemProps) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(id)}
        className={`relative w-full py-2.5 px-3 flex justify-between items-center rounded-lg text-sm transition-colors ${isActive ? "bg-white text-slate-900 font-medium shadow-xs hover:bg-slate-50 dark:shadow-none dark:text-slate-100 dark:bg-blue-500/20 dark:hover:bg-blue-500/25" : "text-slate-600 hover:bg-white/60 dark:text-slate-400 dark:hover:bg-blue-500/10"}`}
        aria-current={isActive ? "page" : undefined}
      >
        {isActive && (
          <span className="absolute h-4.5 w-1 rounded-full bg-blue-600 dark:bg-blue-500" />
        )}
        <span className="pl-4">{name}</span>
        <span
          className={`font-mono text-xs font-semibold ${getBalanceTextClass(userBalance)}`}
        >
          {formatSignedBalance(userBalance)}
        </span>
      </button>
    </li>
  );
}
