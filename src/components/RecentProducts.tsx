import { Product } from '@/pages/DetailPage';
import ProductCard from './ProductCard';

interface RecentProductProps {
  recentLoading: boolean;
  recentProducts: Product[];
}

export default function RecentProducts({
  recentLoading,
  recentProducts,
}: RecentProductProps) {
  return (
    <section className="mt-6">
      <h3 className="font-semibold text-xl">최근 본 상품</h3>
      {recentLoading ? (
        <div className="mt-2 text-sm text-gray-500">로딩 중…</div>
      ) : recentProducts.length === 0 ? (
        <div className="mt-2 text-sm text-gray-500">
          최근 본 상품이 없습니다.
        </div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {recentProducts.map((p) => (
            <ProductCard product={p} />
          ))}
        </ul>
      )}
    </section>
  );
}
