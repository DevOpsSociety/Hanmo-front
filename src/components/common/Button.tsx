type ButtonProps = {
  name?: string;
  verificationVisible?: boolean;
  className?: string;
};

export default function Button({
  name,
  verificationVisible,
  className,
}: ButtonProps) {
  return (
    <button
      type='submit'
      className={`bg-[#04447C] bg-opacity-90 text-white rounded-[10px] h-[43px] text-[24px] font-[manSeh] cursor-pointer ${
        verificationVisible && 'bg-gray-400'
      } ${className}`}
      disabled={verificationVisible}
    >
      {name}
    </button>
  );
}
