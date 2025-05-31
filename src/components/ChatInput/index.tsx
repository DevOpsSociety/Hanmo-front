import Image from "next/image";
import { useState } from "react";
import submitBtn from "../../../public/postSubmit.svg";

interface ChatInputProps {
  onSend: (content: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState("");

  return (
    <div className="grid grid-cols-6 h-[75px] items-center py-3 gap-4 px-4 border-t border-[#e6e6e6]">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="예쁜 말만 부탁드립니다 ^_^ (최대 20자)"
        className="col-span-5 rounded-2xl h-full px-4 bg-[#F7F7F7] placeholder:font-[manseh]"
      />
      <button
        onClick={() => {
          onSend(input);
          setInput("");
        }}
        className="col-span-1 h-full rounded-2xl font-[manseh] text-xl"
      >
        <Image src={submitBtn} alt="제출버튼" />
      </button>
    </div>
  );
}