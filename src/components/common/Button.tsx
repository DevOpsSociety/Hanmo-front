interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`w-full h-[50px] rounded-xl bg-[#134D80] text-white text-[18.5px] font-[pretendard] tracking-wider ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}