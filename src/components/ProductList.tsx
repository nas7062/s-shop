import React, { useEffect, useState } from 'react';
import supabase from '../supabase'; // Supabase 클라이언트
import { Product } from '@/pages/DetailPage'; // Product 타입
import ProductCard from './ProductCard';

interface ProductListProps {
  category?: string;
  keyword?: string;
}

const ProductList: React.FC<ProductListProps> = ({
  category = 'All',
  keyword,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let query = supabase.from('Products').select('*');
        if (category && category !== 'All') {
          query.contains('Categories', [category]);
        }
        if (keyword && keyword.trim() !== '') {
          query = query.or(
            `name.ilike.%${keyword}%,description.ilike.%${keyword}%`,
          );
        }
        const { data, error } = await query;
        console.log(data);
        if (error) throw error;

        setProducts(data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, keyword]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (products.length === 0) return <div>No products available</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold py-4">
        {category === 'All' || category === null
          ? '전체 상품'
          : `"${category}" 카테고리`}{' '}
        추천 아이템!
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-0.5">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
