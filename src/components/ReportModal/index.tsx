import Button from "../common/Button";
import MotionWrapper from "../MotionWrapper";

interface ReportModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  reason: string;
  setReason: (value: string) => void;
}

export default function ReportModal({ open, onClose, onSubmit, reason, setReason }: ReportModalProps) {
  if (!open) return null;
  return (
    <MotionWrapper duration={0.5}>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-25 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-[90vw] max-w-[350px] relative">

          <div className="flex items-center justify-between mb-6">
            <div className="text-[#134D80] text-[22px] font-[manSeh]">신고하기</div>
            <button
              onClick={onClose}
              aria-label="닫기"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                <path d="M2.12742 1.95485C8.60068 8.43593 14.8794 14.7222 21.3234 21.174" stroke="#134D80" stroke-width="3" stroke-linecap="round" />
                <path d="M11.6504 12.0044C11.6967 12.0044 11.7421 11.1242 11.7882 11.1242" stroke="#134D80" stroke-width="3" stroke-linecap="round" />
                <path d="M2.14941 21.1738C8.62274 14.6928 14.9015 8.40656 21.3455 1.9549" stroke="#134D80" stroke-width="3" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <form
            onSubmit={e => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <div className="mb-4">
              <textarea
                className="w-full h-24 border border-none rounded-lg p-3 text-[16px] text-[#444] resize-none focus:outline-none"
                placeholder="신고 사유를 입력해 주세요"
                value={reason}
                onChange={e => setReason(e.target.value)}
              />
            </div>
            {/* 제출 버튼 */}
            <div className="flex justify-end">
              <Button type="submit" className="w-20">
                제출
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MotionWrapper>
  );
}