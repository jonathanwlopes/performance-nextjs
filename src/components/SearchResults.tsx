import { ProductItem } from './ProductItem';

interface Product {
  id: string;
  price: number;
  title: string;
}

interface SearchResultsProps {
  results: Product[];
}

export const SearchResults = ({ results }: SearchResultsProps) => {
  return (
    <div>
      {results.map((product) => (
        <ProductItem product={product} />
      ))}
    </div>
  );
};
