import { Product } from '@/pages/DetailPage';
import clsx from 'clsx';

interface SizeListProps {
  product: Product;
  selectedSize: string | null;
  setSelectedSize: (size: string) => void;
}

export default function SizeList({
  product,
  selectedSize,
  setSelectedSize,
}: SizeListProps) {
  return (
    <div className="mt-4">
      <p className="text-sm text-gray-600 mb-2">사이즈</p>
      <div className="flex flex-wrap gap-2">
        {product.Sizes?.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSelectedSize(s)}
            className={clsx(
              'px-3 py-1.5 rounded-full border text-sm transition-colors cursor-pointer w-10 h-10',
              selectedSize === s
                ? 'border-black'
                : 'border-gray-300 hover:border-gray-400',
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
