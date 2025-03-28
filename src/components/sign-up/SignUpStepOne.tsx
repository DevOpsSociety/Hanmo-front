'use client';

import Image from 'next/image';
import BoxImg from '../../../public/box.png';

export default function SignUpStepOne(): JSX.Element {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const phone = formData.get('phone');

    console.log(name, phone);

    try {
      const response = await fetch('/api/signup', {
        // 백엔드 주소 넣기
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      });
      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='text-center border-b border-solid border-#E7E7E7 h-[73px] flex items-center justify-center'>
        <span className='text-[38px] text-[#04447C]'>회원가입</span>
      </div>

      <div className='flex flex-col gap-5'>
        <Image src={BoxImg} alt='로고' className='mx-auto mt-16' />
        <form
          onSubmit={handleSubmit}
          className='w-[393px] h-[852px] px-[56px] flex flex-col gap-4 mx-auto'
        >
          <div className='mt-12'>
            <div className='text-[15px]'>이름 입력</div>
            <input
              type='text'
              name='name'
              placeholder='이름을 입력해주세요'
              className='border-[1.5px] border-solid border-[rgba(0,0,0,0.5)] rounded-[10px] w-full h-11 px-3'
            />
          </div>

          <div className=''>
            <div className=''>휴대전화</div>
            <input
              type='text'
              name='phone'
              placeholder='번호를 입력해주세요'
              className='border-[1.5px] border-solid border-[rgba(0,0,0,0.5)] rounded-[10px] w-full h-11 px-3'
            />
          </div>

          <div className='flex flex-col gap-2 mt-4'>
            <button
              type='submit'
              className='border border-solid border-black bg-[#04447C] text-white rounded-[10px] h-[43px] text-[24px]'
            >
              인증하기
            </button>

            <div className='flex flex-col gap-6 mt-5'>
              <input
                type='text'
                placeholder='인증번호를 입력해주세요'
                className='border-[1.5px] border-solid border-[rgba(0,0,0,0.5)] rounded-[10px] w-full h-11 px-3'
              />
              <button className='border border-solid border-black bg-[#04447C] text-white rounded-[10px] h-[43px] text-[24px]'>
                인증확인
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
