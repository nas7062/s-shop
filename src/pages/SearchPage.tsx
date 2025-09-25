import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProductList';
import { useDebounce } from '@/hooks/useDebounce';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>('');
  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    if (debouncedKeyword) {
      navigate(`/search?keyword=${encodeURIComponent(debouncedKeyword)}`);
    }
  }, [debouncedKeyword, navigate]);

  return (
    <div>
      <div className="w-full flex relative justify-center items-center ">
        <input
          type="text"
          className="bg-gray-200 w-full rounded-md h-8 p-2"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Search className="absolute right-2" />
      </div>
      <CategoryList onSelect={setKeyword} />
      <section>
        <h3>인기 검색어</h3>
      </section>
      <section>
        <h3>최근 본 상품</h3>
      </section>
      <ProductList keyword={keyword} />
    </div>
  );
}
