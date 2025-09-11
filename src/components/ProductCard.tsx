import image from '@/assets/top.png';
import { Product } from '@/pages/DetailPage';
import { useNavigate, useParams } from 'react-router-dom';
interface ProductCardProps {
  product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  console.log(product.image_url);
  return (
    <div
      className="flex flex-col  bg-gray-50 rounded pb-4  "
      onClick={() => navigate(`/detail/${product.id}`)}
    >
      <div className="flex justify-center items-center">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-48 h-48 transition-all duration-200 hover:scale-110 cursor-pointer"
        />
      </div>
      <div className="px-4">
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    </div>
  );
}
