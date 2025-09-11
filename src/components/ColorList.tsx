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
  return (
    <div className="mt-6">
      <p className="text-sm text-gray-600 mb-2">컬러</p>
      <div className="flex flex-wrap gap-2">
        {product.colors?.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setSelectedColor(c)}
            className={clsx(
              'px-3 py-1.5 rounded-full border text-sm transition-colors cursor-pointer',
              selectedColor === c
                ? 'border-black'
                : 'border-gray-300 hover:border-gray-400',
            )}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
