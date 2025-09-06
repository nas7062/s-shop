import CategoryList from '@/components/CategoryList';
import { Search } from 'lucide-react';

const SearchDate = {};

export default function SearchPage() {
  return (
    <div>
      <div className="w-full flex relative justify-center items-center ">
        <input type="text" className="bg-gray-200 w-full rounded-md h-8" />
        <Search className="absolute right-2" />
      </div>
      <CategoryList />
      <section>
        <h3>인기 검색어</h3>
      </section>
      <section>
        <h3>최근 본 상품</h3>
      </section>
    </div>
  );
}
