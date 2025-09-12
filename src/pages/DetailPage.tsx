import image from '@/assets/shop1.jpg';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductSideBar from '@/components/ProductSideBar';
import ProductCard from '@/components/ProductCard';
import supabase from '@/supabase';
import TabButtons, { Tab } from '@/components/TabButtons';
import ProductInfoTab from '@/components/ProductInfoTab';
import TabReviews from '@/components/TabReviews';

// 타입: 실제로는 API 응답 타입과 맞추세요
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  Colors?: string[];
  Sizes?: string[];
  rating: number;
}

export default function DetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<Tab>('상품정보');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [wish, setWish] = useState(false);
  useEffect(() => {
    // productId가 있을 경우 API로 데이터 요청
    if (productId) {
      const fetchProduct = async () => {
        const { data, error } = await supabase
          .from('Products')
          .select('*')
          .eq('id', productId)
          .single();

        if (error) {
          setError('Product not found');
          console.error(error);
        } else {
          setProduct(data);
        }

        setLoading(false);
      };

      fetchProduct();
    } else {
      setError('Product ID is missing');
      setLoading(false);
    }
  }, [productId]);

  const handleAddCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('컬러와 사이즈를 선택해 주세요.');
      return;
    }
    // 장바구니 로직 (ex. 전역상태/서버에 추가)
    alert(
      `장바구니 담기 완료: ${product?.name} / ${selectedColor} / ${selectedSize}`,
    );
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      alert('컬러와 사이즈를 선택해 주세요.');
      return;
    }
    // 결제 페이지로 이동 또는 주문 생성 로직
    alert('바로 구매 진행');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="mx-auto  ">
      {/* 상단 그리드: 좌측 이미지, 우측 정보 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 이미지 영역 */}
        <section className="lg:col-span-2 bg-white rounded-2xl shadow p-4 flex items-center justify-center">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full max-w-xl aspect-auto object-cover rounded-xl"
          />
        </section>

        {/* 정보 사이드바 */}
        <ProductSideBar
          product={product}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          wish={wish}
          onToggleWish={() => setWish((w) => !w)}
          onAddCart={handleAddCart}
          onBuyNow={handleBuyNow}
        />
      </div>

      {/* 하단 탭 영역 */}
      <section className="mt-8 bg-white rounded-2xl shadow">
        <TabButtons selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {/* 탭 컨텐츠 */}
        <div className="p-6">
          {selectedTab === '상품정보' && <ProductInfoTab product={product} />}

          {selectedTab === '리뷰' && <TabReviews />}

          {selectedTab === '추천' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((idx) => (
                <ProductCard product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
