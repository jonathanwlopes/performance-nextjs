import { memo, useState } from 'react';
// import { AddProductToWishlist } from './AddProductToWishlist';
import { AddProductToWishlistProps } from './AddProductToWishlist';
interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  };
  onAddToWishList: (id: number) => void;
}


import dynamic from 'next/dynamic';

const AddProductWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import('./AddProductToWishlist').then((mod) => mod.AddProductToWishlist);
}, {
  loading: () => <span>Carregando...</span>
});


const ProductItemComponent = ({ product, onAddToWishList }: ProductItemProps) => {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {product.title} - <strong>R$ {product.price}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>
      {isAddingToWishList && (
        <AddProductWishlist
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  );
};

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product);
});
