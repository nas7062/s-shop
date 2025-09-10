// ActionButtons.tsx
import clsx from 'clsx';
import { Star } from 'lucide-react';

interface Props {
  wish: boolean;
  onToggleWish: () => void;
  onAddCart: () => void;
  onBuyNow: () => void;
}

export default function ActionButtons({
  wish,
  onToggleWish,
  onAddCart,
  onBuyNow,
}: Props) {
  return (
    <div className="mt-6 flex gap-2 items-center">
      <button
        type="button"
        onClick={onToggleWish}
        className={clsx(
          'w-10 h-10 flex items-center justify-center rounded-xl border transition',
          wish ? 'border-black' : 'border-gray-300 hover:border-gray-400',
        )}
      >
        <Star
          className={clsx(wish ? 'fill-yellow-300' : '', 'cursor-pointer')}
        />
      </button>

      <button
        type="button"
        onClick={onAddCart}
        className="flex-1 bg-white border border-gray-300 px-4 py-3 rounded-xl hover:bg-gray-50 transition cursor-pointer"
      >
        장바구니
      </button>
      <button
        type="button"
        onClick={onBuyNow}
        className="flex-1 bg-black text-white border border-black px-4 py-3 rounded-xl hover:opacity-90 transition cursor-pointer"
      >
        구매하기
      </button>
    </div>
  );
}
