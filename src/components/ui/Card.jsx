export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        bg-white/80
        backdrop-blur-xl
        rounded-3xl
        border
        border-white/60
        shadow-xl
        p-8
        transition-all
        duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}