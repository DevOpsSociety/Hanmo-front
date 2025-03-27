export default function LoginPage(): JSX.Element {
  return (
    <div className='flex flex-col'>
      <div className='text-center border-b border-solid border-#E7E7E7'>
        <span className='text-[38px] text-[#04447C]'>한</span>
        <span className='text-[38px] text-[#9ECCF3]'>모</span>
      </div>

      <div className=''>
        <div className='text-[50px] text-[#04447c] text-center mt-[90px]'>
          로그인
        </div>
        <div className='mt-16 px-[56px] flex flex-col gap-4'>
          <div className=''>
            <div className='text-[15px]'>학번</div>
            <input
              type='text'
              placeholder='245151551'
              className='border border-solid border-black rounded-[10px] w-full h-11 px-3'
            />
          </div>

          <div className='mt-4'>
            <div className=''>전화번호</div>
            <input
              type='text'
              placeholder='01011112222'
              className='border border-solid border-black rounded-[10px] w-full h-11 px-3'
            />
          </div>

          <div className='flex flex-col gap-3 mt-4'>
            <button className='border border-solid border-black bg-[#04447C] text-white rounded-[10px] h-[43px] text-[24px]'>
              로그인
            </button>
            <button className='border border-solid border-black rounded-[10px] h-[43px] text-[24px]'>
              회원탈퇴
            </button>
          </div>
          <div className='text-[red] mt-3'>틀렸어요 ㅠ_ㅠ</div>
        </div>
      </div>
    </div>
  );
}
