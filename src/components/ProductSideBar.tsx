import { Product } from '@/pages/DetailPage';
import ActionButtons from './ActionButtons';
import ColorList from './ColorList';
import ProductInfo from './ProductInfo';
import SizeList from './SizeList';

interface ProductSideBarProps {
  product: Product;
  selectedColor: string | null;
  setSelectedColor: (color: string) => void;
  selectedSize: string | null;
  setSelectedSize: (size: string) => void;
  wish: boolean;
  onToggleWish: () => void;
  onAddCart: () => void;
  onBuyNow: () => void;
}

export default function ProductSideBar({
  product,
  selectedColor,
  selectedSize,
  setSelectedColor,
  setSelectedSize,
  wish,
  onToggleWish,
  onAddCart,
  onBuyNow,
}: ProductSideBarProps) {
  return (
    <aside className="lg:col-span-1 bg-white rounded-2xl shadow p-5 h-max lg:sticky lg:top-6">
      <ProductInfo product={product} />
      {/* 옵션: 컬러 */}
      <ColorList
        product={product}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      {/* 옵션: 사이즈 */}
      <SizeList
        product={product}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />

      {/* 액션 버튼 */}
      <ActionButtons
        wish={wish}
        onToggleWish={onToggleWish}
        onAddCart={onAddCart}
        onBuyNow={onBuyNow}
      />
    </aside>
  );
}
