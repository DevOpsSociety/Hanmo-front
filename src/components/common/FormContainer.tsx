export default function FormContainer({ children }: { children: React.ReactNode; }) {
  return (
    <div className="max-w-[393px] mx-auto flex flex-col h-[calc(100vh-73px)] bg-white font-[manseh]">
      {children}
    </div>
  );
}