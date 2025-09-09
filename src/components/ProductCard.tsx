import image from '@/assets/top.png';
import { useNavigate, useParams } from 'react-router-dom';
interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: string;
}
export default function ProductCard({
  id,
  title,
  description,
  price,
}: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col  bg-gray-50 rounded pb-4  "
      onClick={() => navigate(`/detail/${id}`)}
    >
      <div className="flex justify-center items-center">
        <img
          src={image}
          alt="이미지"
          className="w-48 h-48 transition-all duration-200 hover:scale-110 cursor-pointer"
        />
      </div>
      <div className="px-4">
        <p>title</p>
        <p>descript</p>
        <p>price</p>
      </div>
    </div>
  );
}
