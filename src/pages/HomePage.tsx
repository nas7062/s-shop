import Banner from '@/components/Banner';
import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProductList';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <Banner />
      <CategoryList />
      <ProductList />
    </div>
  );
}
