import Banner from '@/components/Banner';
import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProductList';
import { useState } from 'react';

export default function HomePage() {
  const [category, setCategory] = useState<string>('');
  return (
    <div className="flex flex-col gap-10">
      <Banner />
      <CategoryList onSelect={setCategory} />
      <ProductList category={category} />
    </div>
  );
}
