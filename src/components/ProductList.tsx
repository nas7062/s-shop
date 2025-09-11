import React, { useEffect, useState } from 'react';
import supabase from '../supabase'; // Supabase 클라이언트
import { Product } from '@/pages/DetailPage'; // Product 타입
import ProductCard from './ProductCard';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('Products').select();
      console.log(data);
      if (error) {
        setError('Failed to fetch products');
        console.error(error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // 로딩 상태 처리
  if (loading) {
    return <div>Loading...</div>;
  }

  // 에러 처리
  if (error) {
    return <div>{error}</div>;
  }

  // 데이터가 없을 때 처리
  if (products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold py-4">당신을 위한 추천 아이템!</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-0.5 ">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
