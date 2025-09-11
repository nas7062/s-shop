import { Product } from '@/pages/DetailPage';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfoTab({ product }: ProductInfoProps) {
  return (
    <div className="prose max-w-none flex flex-col justify-center gap-4">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-96 self-center"
      />
      <h2 className="text-2xl">상세 설명</h2>
      <p>
        소재: 폴리에스터 혼방 / 세탁: 미온수 단독 세탁 권장. 제품 색상은 모니터
        설정에 따라 차이가 있을 수 있습니다.
      </p>
      <ul>
        <li>가벼운 착용감</li>
        <li>통기성 우수</li>
        <li>데일리/운동 겸용</li>
      </ul>
    </div>
  );
}
