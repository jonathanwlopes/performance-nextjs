# Linha do tempo

- Criar um servidor fake de dados, no arquivo server.js

```js
module.exports = () => {
  const data = {
    products: [],
  };

  for (let i = 0; o < 1000; i++) {
    data.products.push({
      id: i + 1,
      price: 80,
      title: `Camiseta ${i + 1}`,
    });
  }

  return data;
};
```

- Instalar o json-server

```js
yarn add json-server -D
```

- Configurar o json-server no package

```jsonc
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start",
    "server": "json-server -d 750 -w -p 3333 ./server.js"
  },
```

### Fluxo de renderização

- O fluxo acontece sempre que o componente pai alterar, resultado na re-renderização dos componentes filhos

1. Criar uma nova versão do componente;
2. Comparar com a versão anterior;
3. Se houver alteração, atualizar o que foi alterado.

### Memo

- O memo vai evitar que a primeira etapa do fluxo aconteça caso nenhuma propriedade do componente tenha sido alterada.
- Como segundo parâmetro o memo vai receber as propriedades anteriores e as próximas propriedades, para fazermos a verificação de igualdade.
- Por exemplo abaixo, fazemos as verificações de comparação se o objeto anterior é igual ao novo objeto

```tsx
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product);
});
```

- Quando utilizar o memo?

1. Pure Functional Components
   -- Dados os mesmos parâmetros sempre retornam o mesmo resultado

2. Renders too often
   -- Componentes que renderizam de mais (Podemos analisar pelo devtools através do highlight).

3. Re-renders with same props
   -- Quando o componente renderiza muitas vezes com as mesmas props

4. Medium to big siz
   -- Componentes de tamanho médio para grande.

### useMemo

- Evitar re-renderização de componentes que realizam cálculos.
- Podemos utilizar o useMemo, para memorizar o calculo.

```tsx
const totalPrice = useMemo(() => {
  return results.reduce((acc, product) => {
    return acc + product.price;
  }, 0);
}, [results]);
```

- Podemos utilizar também o useMemo nos casos de igualdade referencial, para evitar que uma variável ocupe um novo local na memoria.
  -- Quando repassamos a informação para um componente filho.

### useCallback

- Utilizado apenas em uma situação, quando queremos memorizar uma função.
  -- Quando componente é re-renderizado todas as funções irão executar novamente.
  -- Vale lembrar que não utilizamos o useCallback pela quantidade de código da função, mas sim pela igualdade referencial.

- Quando criamos uma função e ela será repassada para elementos filhos da nossa aplicação, é importante que ela utilize o useCallback

### Importante!

- Realizar as formatações dos dados sempre no momento que se busca os dados e não no momento da renderização do componente.

### Lazyload components

- Conhecido como Code Splitting utilizamos o dynamic do next para realizar as importações, desta forma o componente será carregando apenas
  quando solicitado.

```tsx
import dynamic from 'next/dynamic';

const AddProductWishlist = dynamic<AddProductToWishlistProps>(
  () => {
    return import('./AddProductToWishlist').then((mod) => mod.AddProductToWishlist);
  },
  {
    loading: () => <span>Carregando...</span>,
  },
);

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
```

### Virtualização

- Mostrar em tela somente os itens visíveis no navegador do usuário
- Utilizamos para essa funcionalidade o react-virtualized

### Analisar performance

- Bundle analyzer
