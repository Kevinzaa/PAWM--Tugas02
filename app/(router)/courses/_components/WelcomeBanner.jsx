import React from 'react';

function WelcomeBanner() {
  return (
    <div className='flex flex-col md:flex-row items-center bg-white rounded-xl p-5 '>
      <img src="/welcome.svg" alt="Welcome" className='w-48 h-48 md:w-64 md:h-64' />
      <div className="mt-4 md:mt-0 md:ml-5 text-center md:text-left">
        <h2 className='font-bold text-2xl md:text-3xl text-gray-900'>Selamat datang ke <span className='text-primary'>Virtual Lab ITB</span></h2>
        <p className='text-gray-600 mt-2'>Web ini dibuat untuk memenuhi tugas mata kuliah "Pengembangan Aplikasi Web dan Mobile" dengan membuat sebuah media pembelajaran interaktif untuk mata kuliah TPB ITB.</p>
      </div>
    </div>
  );
}

export default WelcomeBanner;
