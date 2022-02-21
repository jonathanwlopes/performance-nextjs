import { useMemo } from 'react';
import { ProductItem } from './ProductItem';
import { List, ListRowRenderer } from 'react-virtualized'; // Auto size
interface Product {
  id: number;
  price: number;
  title: string;
}

interface SearchResultsProps {
  results: Product[];
  onAddToWishList: (id: number) => void;
}

export const SearchResults = ({ results, onAddToWishList }: SearchResultsProps) => {
  const totalPrice = useMemo(() => {
    return results.reduce((acc, product) => {
      return acc + product.price;
    }, 0);
  }, [results]);

  const rowRender: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem  product={results[index]} onAddToWishList={onAddToWishList} />;
      </div>
    );
  };

  return (
    <div>
      <h2>{totalPrice}</h2>
      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRender}
      />
      {/* {results.map((product) => (
        <ProductItem key={product.id} product={product} onAddToWishList={onAddToWishList} />
      ))} */}
    </div>
  );
};
