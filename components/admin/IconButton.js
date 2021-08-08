import { PlusIcon, PencilIcon, RefreshIcon } from "@heroicons/react/outline";

export default function IconButton({
  label,
  icon,
  color,
  action = null,
  loading = false,
}) {
  const colors = {
    gray: {
      border: "border-gray-900",
      text: "text-gray-900",
      bg: "bg-gray-100 hover:bg-gray-200",
      ring: "ring-gray-200",
    },
    green: {
      border: "border-green-900",
      text: "text-green-900",
      bg: "bg-green-100 hover:bg-green-200",
      ring: "ring-green-200",
    },
    yellow: {
      border: "border-yellow-900",
      text: "text-yellow-900",
      bg: "bg-yellow-100 hover:bg-yellow-200",
      ring: "ring-yellow-200",
    },
    red: {
      border: "border-red-900",
      text: "text-red-900",
      bg: "bg-red-100 hover:bg-red-200",
      ring: "ring-red-200",
    },
  };
  return (
    <button
      onClick={action}
      className={`${colors[color].bg} border ${colors[color].border} ${colors[color].text} py-1 px-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${colors[color].ring}`}
    >
      {
        {
          plus: <PlusIcon className="w-4 h-4 mx-auto" />,
          pencil: <PencilIcon className="w-4 h-4 mx-auto" />,
          refresh: (
            <RefreshIcon
              className={`${
                loading == true ? "animate-spin" : ""
              } w-4 h-4 mx-auto`}
            />
          ),
        }[icon]
      }
      <p className={`text-xs ${colors[color].text}`}>{label}</p>
    </button>
  );
}
