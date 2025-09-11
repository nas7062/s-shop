import { Product } from '@/pages/DetailPage';

interface productInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: productInfoProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
        <span className="font-medium">평점</span>
        <span aria-label={`평점 ${product.rating}`}>
          {product.rating && '★'.repeat(Math.round(product.rating))}
        </span>
        <span className="ml-1">
          {product.rating && product.rating.toFixed(1)}
        </span>
      </div>

      <p className="mt-4 text-gray-700 leading-relaxed">
        {product.description}
      </p>

      <p className="mt-4 text-2xl font-semibold">{product.price}</p>
    </div>
  );
}
