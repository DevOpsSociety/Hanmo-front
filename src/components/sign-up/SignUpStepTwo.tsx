export default function SignUpStepTwo(): JSX.Element {
  return (
    <div className='flex flex-col'>
      <div className='text-center border-b border-solid border-#E7E7E7 h-[73px] flex items-center justify-center'>
        <span className='text-[38px] text-[#04447C]'>정보입력</span>
      </div>

      <div className='flex flex-col gap-5'>
        <div className='w-[200px] flex flex-col gap-4 mx-auto'>
          <div className='mt-20'>
            <div className='text-[15px] mb-2'>학번</div>
            <input
              type='text'
              placeholder='ex)202010955'
              className='border-[1.5px] border-solid border-[rgba(0,0,0,0.5)] rounded-[10px] w-full h-11 px-3'
            />
            <div className='text-[red] text-[9px] mt-3 text-center'>
              학번은 아이디로 사용되니 정확히 입력해주세요.
            </div>
          </div>

          <div className=''>
            <div className='text-[15px] mb-2'>성별</div>
            <div className='flex justify-between gap-5'>
              <button className='border-[1.5px] border-solid border-[rgba(0,0,0,0.5)] rounded-[10px] w-full h-[43px] text-[24px]'>
                남
              </button>
              <button className=' bg-[#04447C] text-white rounded-[10px] w-full h-[43px] text-[24px]'>
                여
              </button>
            </div>
          </div>

          <div className=''>
            <div className='text-[15px] mb-2'>MBTI</div>
            <input
              type='text'
              placeholder='select option 변경예정'
              className='border-[1.5px] border-solid border-[rgba(0,0,0,0.5)] rounded-[10px] w-full h-11 px-3'
            />
          </div>
          <div className=''>
            <div className='text-[15px] mb-2'>학과</div>
            <input
              type='text'
              placeholder='select option 변경예정'
              className='border-[1.5px] border-solid border-[rgba(0,0,0,0.5)] rounded-[10px] w-full h-11 px-3'
            />
          </div>
          <div className=''>
            <div className='text-[15px] mb-2'>인스타</div>
            <input
              type='text'
              placeholder='hsu_it_zzang'
              className='border-[1.5px] border-solid border-[rgba(0,0,0,0.5)] rounded-[10px] w-full h-11 px-3'
            />
          </div>
          <button className=' bg-[#04447C] text-white rounded-[10px] w-[170px] h-[43px] text-[24px] mt-5 mx-auto'>
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
}
