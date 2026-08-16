export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-8
        py-4
        rounded-full
        bg-linear-to-r
        from-green-500
        to-emerald-500
        text-white
        font-semibold
        shadow-xl
        hover:scale-105
        hover:shadow-2xl
        transition-all
        duration-300
        ${className}
      `}
    >
      {children}
    </button>
  );
}