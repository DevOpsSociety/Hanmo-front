import HeaderBackButton from "../HeaderBackButton";

export default function PageHeader({ title }: { title: string; }) {
  return (
    <div className="relative text-center border-b border-solid border-[#E7E7E7] h-[73px] flex items-center justify-center">
      <div className="absolute left-0 pl-4">
        <HeaderBackButton />
      </div>
      <span className="mx-auto text-[38px] font-[manSeh] text-[#134D80]">{title}</span>
    </div>
  );
}