import { createContext, useContext, useReducer } from 'react';
import faker from 'faker';
import { cartReducer, productReducer } from './Reducer';

const Cart = createContext();

function getRandomImage() {
  const width = 200; // Lebar gambar
  const height = 200; // Tinggi gambar
  const randomImageId = Math.floor(Math.random() * 1000); // ID gambar acak
  return `https://picsum.photos/${width}/${height}?image=${randomImageId}`;
}

const Context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: getRandomImage(), // Menggunakan gambar acak
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: '',
  });

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
}

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
