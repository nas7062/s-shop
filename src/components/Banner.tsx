import image1 from '@/assets/shop1.jpg';
import { useMediaQuery } from 'usehooks-ts';
export default function Banner() {
  const isMobile = useMediaQuery('(max-width: 640px)');
  return (
    <div className="flex flex-col-reverse min-[450px]:flex-row  justify-around items-center bg-gray-50 py-10 rounded-md">
      {/* 왼쪽 텍스트 */}
      <div className="flex flex-col gap-2 sm:gap-6 w-64 sm:max-w-md px-4 ">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-widest">
          MINIMAL FASHION
        </h2>
        <p className="text-gray-600 text-base sm:text-xl leading-relaxed">
          심플한 디자인, 세련된 감각. 일상에 자연스럽게 녹아드는 미니멀 스타일을
          만나보세요.
        </p>
        <button className="mt-4 w-fit px-6 py-2 rounded bg-secondary text-white hover:bg-green-600 cursor-pointer">
          Go To Detail
        </button>
      </div>
      {/* 오른쪽 이미지 */}
      <div className="px-4 overflow-hidden  ">
        <img
          src={image1}
          alt="미니멀 패션 배너 이미지"
          className="w-full max-w-[300px] sm:max-w-[350px] aspect-[3/4] object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
