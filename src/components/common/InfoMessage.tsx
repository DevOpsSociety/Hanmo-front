export default function InfoMessage({ children }: { children: React.ReactNode; }) {
  return (
    <div className="text-[#9ECCF3] text-[13px] text-left mb-2 ml-1 mt-2 font-[pretendard]">
      {children}
    </div>
  );
}