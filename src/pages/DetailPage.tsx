import image from '@/assets/shop1.jpg';
import { Star } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function DetailPage() {
  const { productId } = useParams();
  const product = {
    id: productId,
    title: '상품 제목',
    description: '상품 설명',
    price: '₩10,000',
    image: image,
  };

  return (
    <div className=" flex justify-between">
      <div></div>
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-80 h-80 object-cover"
        />
      </div>
      <div className="mt-4 w-1/3 flex flex-col gap-4">
        <h1 className="text-xl font-bold">{product.title}</h1>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <p className="mt-2 text-lg font-semibold">{product.price}</p>
        <div>
          <p>컬러</p>
        </div>
        <div>
          <p>사이즈</p>
        </div>
        <div className="flex justify-between gap-2">
          <button className="w-10">
            <Star />
          </button>
          <button className="bg-white border border-gray-200 px-10 py-2 flex-1">
            장바구니
          </button>
          <button className="bg-black text-white border border-gray-800 px-10 py-2 flex-1">
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
}
