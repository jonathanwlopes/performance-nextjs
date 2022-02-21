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

