// components/Banner.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import image1 from '@/assets/shop1.jpg';
import image2 from '@/assets/shop2.webp';
import image3 from '@/assets/shop3.webp';
import image4 from '@/assets/shop4.webp';

interface BannerProps {
  id: number;
  title: string;
  descript: string;
  image: string;
}

const banners: BannerProps[] = [
  {
    id: 1,
    title: 'MINIMAL FASHION',
    descript:
      '심플한 디자인, 세련된 감각. 일상에 자연스럽게 녹아드는 미니멀 스타일.',
    image: image1,
  },
  {
    id: 2,
    title: 'DAILLY ASSENTIAL',
    descript: '부드럽고 포근한 텍스처, 데일리로 입기 좋은 핏과 컬러 구성.',
    image: image2,
  },
  {
    id: 3,
    title: 'DENIM COLLECTION',
    descript: '트렌드에 휘둘리지 않는 스트레이트 핏, 다양한 워싱으로 취향대로.',
    image: image3,
  },
  {
    id: 4,
    title: 'OFFICE SHIRTS',
    descript: '주름에 강한 원단과 깔끔한 실루엣으로 매일 새 옷 같은 컨디션.',
    image: image4,
  },
];

export default function Banner() {
  return (
    <div className="w-full">
      {/* 히어로(첫 슬라이드와 동일한 톤을 유지하고 싶다면 이 섹션을 유지하거나 제거해도 됩니다) */}
      {/* 배너 슬라이더 */}

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="flex flex-col-reverse min-[450px]:flex-row justify-around items-center bg-gray-50 py-10 rounded-md">
              <div className="flex flex-col gap-2 sm:gap-6 w-64 sm:max-w-md px-4">
                <h2 className="text-3xl sm:text-5xl font-bold tracking-widest">
                  {banner.title}
                </h2>
                <p className="text-gray-600 text-base sm:text-xl leading-relaxed">
                  {banner.descript}
                </p>
                <button className="mt-4 w-fit px-6 py-2 rounded bg-secondary text-white hover:bg-green-600 cursor-pointer">
                  Go To Detail
                </button>
              </div>
              <div className="px-4 overflow-hidden">
                <img
                  src={banner.image}
                  alt={`${banner.title} 배너 이미지`}
                  className="w-full max-w-[300px] sm:max-w-[350px] aspect-[3/4] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
