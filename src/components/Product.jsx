// Хук получения(Consume) доступа к общим данным Context.
import { useContext } from 'react';
// Контекстная(Общая) функция доступа к массиву.
import { CartContext } from '@/store/shopping-cart-context.jsx';

export default function Product({ id, image, title, price, description }) {
  // Массив товаров в корзине, Функция изменения кол-ва товара.
  const { addItemToCart } = useContext(CartContext);
  return (
    <article className='rounded-md w-full flex flex-col shadow-soft'>
      <img className='rounded-t-md w-full' src={image} alt={title} />
      <div className='product-content'>
        <div>
          <h3>{title}</h3>
          <p className='product-price'>${price}</p>
          <p>{description}</p>
        </div>
        <p className='product-actions'>
          <button onClick={() => addItemToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
