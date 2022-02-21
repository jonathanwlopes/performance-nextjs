export interface AddProductToWishlistProps {
  onAddToWishList: () => void;
  onRequestClose: () => void;
}

export const AddProductToWishlist = ({ onAddToWishList, onRequestClose }: AddProductToWishlistProps) => {
  return (
    <span>
      Deseja adicionar aos favoritos?
      <button onClick={onAddToWishList}>Sim</button>
      <button onClick={onRequestClose}>Não</button>
    </span>
  );
};
