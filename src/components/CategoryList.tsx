import hot from '@/assets/hot.png';
import sale from '@/assets/sale.png';
import top from '@/assets/top.png';
import bottom from '@/assets/bottom.webp';
import outer from '@/assets/outer.png';
import shose from '@/assets/shoes.webp';
import bag from '@/assets/bag.webp';
import fashion from '@/assets/fashion.png';

type CategoryType = {
  name: string;
  image: string;
};

const Category: CategoryType[] = [
  { name: '인기', image: hot },
  { name: '할인', image: sale },
  { name: '상의', image: top },
  { name: '바지', image: bottom },
  { name: '아우터', image: outer },
  { name: '신발', image: shose },
  { name: '가방', image: bag },
  { name: '패션소품', image: fashion },
];

export default function CategoryList() {
  return (
    <div className="grid space-y-4 justify-items-center grid-cols-4 xl:grid-cols-8 mt-10 ">
      {Category.map((cate) => (
        <button className="px-2 py-1 flex  flex-col justify-center items-center bg-gray-50 h-20 w-20 sm:h-32 sm:w-32 rounded-full cursor-pointer hover:bg-gray-100">
          <img
            src={cate.image}
            alt={cate.name}
            className=" w-12 sm:w-20 transition-all duration-200 hover:scale-115"
          />
          <p className="font-semibold text-xs sm:text-base">{cate.name}</p>
        </button>
      ))}
    </div>
  );
}
