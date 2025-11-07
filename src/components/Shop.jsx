import { DUMMY_PRODUCTS } from '@/dummy-products.js';
import Product from './Product.jsx';

export default function Shop({ onAddItemToCart }) {
  const listOfProducts =
    'grid gap-8 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] m-0 p-0 list-none';

  return (
    <section className='w-[70%] my-8 mx-auto'>
      <h2 className='text-2xl uppercase text-[#a59b8b]'>
        Elegant Clothing For Everyone
      </h2>
      <ul className={listOfProducts}>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={onAddItemToCart} />
          </li>
        ))}
      </ul>
    </section>
  );
}
