import image from '@/assets/shop1.jpg';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductSideBar from '@/components/ProductSideBar';
import ProductCard from '@/components/ProductCard';

// 타입: 실제로는 API 응답 타입과 맞추세요
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  colors?: string[];
  sizes?: string[];
  rating: number;
}

export default function DetailPage() {
  const { productId } = useParams();

  // TODO: productId로 API 호출하여 데이터 가져오기
  const product: Product = useMemo(
    () => ({
      id: Number(productId),
      name: '상품 이름',
      description:
        '이 상품은 높은 내구성과 편안한 착용감을 특징으로 합니다. 일상과 운동 모두에 적합합니다.',
      price: 10000,
      image_url: image,
      colors: ['블랙', '그레이', '화이트'],
      sizes: ['S', 'M', 'L', 'XL'],
      rating: 4.3,
    }),
    [productId],
  );

  const TABS = ['상품정보', '리뷰', '추천'] as const;
  type Tab = (typeof TABS)[number];
  const [selectedTab, setSelectedTab] = useState<Tab>('상품정보');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [wish, setWish] = useState(false);

  // 상태 변경 로그는 setState 직후가 아니라 effect에서 확인
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('selectedTab:', selectedTab);
  }, [selectedTab]);

  const handleAddCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('컬러와 사이즈를 선택해 주세요.');
      return;
    }
    // 장바구니 로직 (ex. 전역상태/서버에 추가)
    alert(
      `장바구니 담기 완료: ${product.name} / ${selectedColor} / ${selectedSize}`,
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
        {/* 탭 헤더 */}
        <div className="grid grid-cols-3 text-center text-sm font-medium overflow-hidden rounded-t-2xl ">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedTab(tab)}
              className={clsx(
                'px-4 py-3 focus:outline-none transition-colors cursor-pointer',
                selectedTab === tab
                  ? 'bg-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200',
              )}
              aria-current={selectedTab === tab ? 'page' : undefined}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 탭 컨텐츠 */}
        <div className="p-6">
          {selectedTab === '상품정보' && (
            <div className="prose max-w-none flex flex-col justify-center gap-4">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-96 self-center"
              />
              <h2 className="text-2xl">상세 설명</h2>
              <p>
                소재: 폴리에스터 혼방 / 세탁: 미온수 단독 세탁 권장. 제품 색상은
                모니터 설정에 따라 차이가 있을 수 있습니다.
              </p>
              <ul>
                <li>가벼운 착용감</li>
                <li>통기성 우수</li>
                <li>데일리/운동 겸용</li>
              </ul>
            </div>
          )}

          {selectedTab === '리뷰' && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-xl p-4">
                  <div className="text-sm text-gray-600">user{i}@mail.com</div>
                  <div className="mt-1 text-yellow-500" aria-label="별점">
                    {'★'.repeat(4)}
                    {'☆'}
                  </div>
                  <p className="mt-2 text-gray-700">
                    만족스럽습니다. 재구매 의사 있어요.
                  </p>
                </div>
              ))}
            </div>
          )}

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
