import { tailChase } from 'ldrs'

function LoadingModal() {
  tailChase.register();
  return (
    <div className='relative z-10'>
      <div className='fixed inset-0 bg-gray-500  bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center '>
          <l-tail-chase
            size='100'
            speed='1.75'
            color='#780d47bf'
          ></l-tail-chase>
        </div>
      </div>
    </div>
  );
}

export default LoadingModal;
