import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProductList';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import supabase from '@/supabase'; // ✅ Supabase 클라이언트 임포트

interface popularProps {
  keyword: string;
  count: number;
}

const normalize = (s: string) => s.trim().toLowerCase();

export default function SearchPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>('');
  const [category, setCategory] = useState<string>('All');

  const [popular, setPopular] = useState<popularProps[]>([]);
  const [popLoading, setPopLoading] = useState<boolean>(true);

  //인기 검색어 조회 내림차순
  useEffect(() => {
    let mounted = true;
    const fetchPopular = async () => {
      setPopLoading(true);
      const { data, error } = await supabase
        .from('search_keywords')
        .select('keyword, count')
        .order('count', { ascending: false })
        .limit(10);

      if (!mounted) return;
      if (error) {
        console.error('[popular fetch] ', error);
        setPopular([]);
      } else {
        setPopular(data || []);
      }
      setPopLoading(false);
    };

    fetchPopular();
    return () => {
      mounted = false;
    };
  }, []);

  const recordAndGo = async (raw: string) => {
    const q = normalize(raw);
    if (!q) return;

    //DB에 카운트 증가
    const { error: rpcErr } = await supabase.rpc('increment_search', {
      p_keyword: q,
    });
    if (rpcErr) {
      console.error('[increment_search] ', rpcErr);
    }
    navigate(`/search?keyword=${encodeURIComponent(q)}`);
    setKeyword(q);

    setPopular((prev: any) => {
      const idx = prev.findIndex((p: any) => p.keyword === q);
      if (idx === -1) return [{ keyword: q, cnt: 1 }, ...prev].slice(0, 10);
      const next = [...prev];
      next[idx] = { ...next[idx], count: next[idx].count + 1 };
      next.sort((a, b) => b.count - a.count);
      return next.slice(0, 10);
    });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          recordAndGo(keyword);
        }}
        className="w-full flex relative justify-center items-center "
      >
        <input
          type="text"
          className="bg-gray-200 w-full rounded-md h-8 px-8"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)} // 입력은 상태만 변경
          placeholder="검색어를 입력하세요"
        />
        {/* 아이콘 클릭 시에만 이동 */}
        <button
          type="submit"
          className="absolute right-2 cursor-pointer p-1"
          aria-label="검색"
          title="검색"
        >
          <Search />
        </button>
      </form>

      {/* 카테고리는 페이지 내 필터 상태로만 사용 */}
      <CategoryList onSelect={setCategory} />

      <section className="mt-6 w-1/2">
        <h3 className="font-semibold text-xl">인기 검색어</h3>
        {popLoading ? (
          <div>로딩 중…</div>
        ) : (
          <ul className="grid grid-cols-3 grid-rows-3    gap-2 mt-2">
            {popular.map((p, idx) => (
              <li key={p.keyword}>
                <button
                  className="px-3 py-1 rounded-lg   cursor-pointer text-sm font-semibold"
                  onClick={() => recordAndGo(p.keyword)}
                >
                  {idx + 1} {p.keyword}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-6">
        <h3 className="font-semibold text-xl">최근 본 상품</h3>
      </section>

      <ProductList keyword={keyword} category={category} />
    </div>
  );
}
