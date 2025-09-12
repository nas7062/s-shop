import { Product } from '@/pages/DetailPage';
import clsx from 'clsx';
interface ColorListProps {
  product: Product;
  selectedColor: string | null;
  setSelectedColor: (color: string) => void;
}

export default function ColorList({
  product,
  selectedColor,
  setSelectedColor,
}: ColorListProps) {
  console.log(product);
  return (
    <div className="mt-6">
      <p className="text-sm text-gray-600 mb-2">컬러</p>
      <div className="flex flex-wrap gap-2">
        {product.Colors?.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => setSelectedColor(color)}
            className={clsx(
              'px-3 py-1.5 rounded-full border text-sm transition-colors cursor-pointer',
              selectedColor === color
                ? 'border-black'
                : 'border-gray-300 hover:border-gray-400',
            )}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
}
