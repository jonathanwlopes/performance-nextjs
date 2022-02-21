import { memo } from 'react';

interface ProductItemProps {
  product: {
    id: string;
    price: number;
    title: string;
  };
}

const ProductItemComponent = ({ product }: ProductItemProps) => {
  return (
    <div>
      {product.title} - <strong>R$ {product.price}</strong>
    </div>
  );
};

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product)
});
