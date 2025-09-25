import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProductList';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import supabase from '@/supabase'; // ✅ Supabase 클라이언트 임포트
import { Product } from './DetailPage';
import ProductCard from '@/components/ProductCard';
import PopularList from '@/components/PopularList';
import RecentProducts from '@/components/RecentProducts';

export interface popularProps {
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

  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [recentLoading, setRecentLoading] = useState<boolean>(true);

  //인기 검색어 조회 내림차순
  useEffect(() => {
    let mounted = true;
    const fetchPopular = async () => {
      setPopLoading(true);
      const { data, error } = await supabase
        .from('search_keywords')
        .select('keyword, count')
        .order('count', { ascending: false })
        .limit(9);

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

  useEffect(() => {
    let mounted = true;
    const fetchRecent = async () => {
      try {
        setRecentLoading(true);

        // 1) 유저 조회
        const { data: userData, error: userErr } =
          await supabase.auth.getUser();
        if (userErr) {
          console.error('[auth getUser] ', userErr);
          if (mounted) setRecentProducts([]);
          return;
        }
        const userId = userData.user?.id;
        if (!userId) {
          if (mounted) setRecentProducts([]);
          return;
        }
        // 2) 최근 본 product_id 10개 (최신순)
        const { data: recs, error: recErr } = await supabase
          .from('recent_products')
          .select('product_id, viewed_at')
          .eq('user_id', userId)
          .order('viewed_at', { ascending: false })
          .limit(10);

        if (recErr) {
          console.error('[recent_products] ', recErr);
          if (mounted) setRecentProducts([]);
          return;
        }
        const productIds = (recs || []).map((r) => r.product_id);
        if (productIds.length === 0) {
          if (mounted) setRecentProducts([]);
          return;
        }

        // 3) 제품 상세 조회
        const { data: products, error: prodErr } = await supabase
          .from('Products')
          .select('*')
          .in('id', productIds);

        if (prodErr) {
          console.error('[Products in] ', prodErr);
          if (mounted) setRecentProducts([]);
          return;
        }

        // 4) 원래 본 순서대로 정렬
        const orderMap = new Map(productIds.map((id, i) => [id, i]));
        const ordered = (products || []).slice().sort((a, b) => {
          const ai = orderMap.get(a.id) ?? 0;
          const bi = orderMap.get(b.id) ?? 0;
          return ai - bi;
        });

        if (mounted) setRecentProducts(ordered as Product[]);
      } finally {
        if (mounted) setRecentLoading(false);
      }
    };

    fetchRecent();
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
      if (idx === -1) return [{ keyword: q, cnt: 1 }, ...prev].slice(0, 9);
      const next = [...prev];
      next[idx] = { ...next[idx], count: next[idx].count + 1 };
      next.sort((a, b) => b.count - a.count);
      return next.slice(0, 9);
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
      <CategoryList onSelect={setCategory} />

      {keyword.trim() !== '' || category !== 'All' ? (
        <ProductList keyword={keyword} category={category} />
      ) : (
        <>
          <PopularList
            popLoading={popLoading}
            popular={popular}
            onSelect={recordAndGo}
          />
          <RecentProducts
            recentLoading={recentLoading}
            recentProducts={recentProducts}
          />
        </>
      )}
    </div>
  );
}
