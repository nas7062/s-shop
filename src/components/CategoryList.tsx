import hot from '@/assets/hot.png';
import sale from '@/assets/sale.png';
import top from '@/assets/top.png';
import bottom from '@/assets/bottom.webp';
import outer from '@/assets/outer.png';
import shose from '@/assets/shoes.webp';
import bag from '@/assets/bag.webp';
import fashion from '@/assets/fashion.png';
import { useState } from 'react';

type CategoryType = {
  name: string;
  image: string;
};

const Category: CategoryType[] = [
  { name: 'Hot', image: hot },
  { name: 'Sale', image: sale },
  { name: 'Top', image: top },
  { name: 'Bottom', image: bottom },
  { name: 'Outer', image: outer },
  { name: 'Shoes', image: shose },
  { name: 'Bag', image: bag },
  { name: 'Fassion', image: fashion },
];

export default function CategoryList({
  onSelect,
}: {
  onSelect: (category: string) => void;
}) {
  const [selected, setSelected] = useState<string>('All');

  const handleSelect = (category: CategoryType) => {
    if (selected === category.name) {
      setSelected('All');
      onSelect('All');
    } else {
      setSelected(category.name);
      onSelect(category.name);
    }
  };

  return (
    <div className="grid space-y-4 justify-items-center grid-cols-4 xl:grid-cols-8 mt-10 ">
      {Category.map((cate) => (
        <button
          key={cate.name}
          onClick={() => handleSelect(cate)}
          className={`px-2 py-1 flex flex-col justify-center items-center h-20 w-20 sm:h-32 sm:w-32 rounded-full cursor-pointer
          ${selected === cate.name ? 'bg-gray-200' : 'bg-gray-50 hover:bg-gray-100'}`}
        >
          {cate.image && (
            <img
              src={cate.image}
              alt={cate.name}
              className="w-12 sm:w-20 transition-all duration-200 hover:scale-110"
            />
          )}
          <p className="font-semibold text-xs sm:text-base">{cate.name}</p>
        </button>
      ))}
    </div>
  );
}
