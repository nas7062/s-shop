import Banner from '@/components/Banner';
import CategoryList from '@/components/CategoryList';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <Banner />
      <CategoryList />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-0.5 ">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
          <ProductCard />
        ))}
      </div>
    </div>
  );
}
