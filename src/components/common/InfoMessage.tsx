export default function InfoMessage({ children }: { children: React.ReactNode; }) {
  return (
    <div className="text-[#4AA0E8] text-[13px] text-left mb-2 ml-1 font-[pretendard]">
      {children}
    </div>
  );
}