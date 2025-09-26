import image from '@/assets/top.png';
import { Product } from '@/pages/DetailPage';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col bg-gray-50 rounded py-4 cursor-pointer"
      onClick={() => navigate(`/detail/${product.id}`)}
    >
      <div className="flex justify-center items-center">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-52 h-52 object-cover transition-all duration-200 hover:scale-103"
        />
      </div>
      <div className="px-4 mt-2 flex flex-col flex-1">
        <p className="font-semibold">{product.name}</p>
        <p className="text-sm">{product.description}</p>

        {/* 하단 고정 영역 */}
        <div className="flex justify-between items-center mt-auto">
          <p className="font-semibold text-sm">{product.price}$</p>
          <button
            className="p-1"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Heart />
          </button>
        </div>
      </div>
    </div>
  );
}
