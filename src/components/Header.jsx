import { useRef, useContext } from 'react';
// Контекстная(Общая) функция доступа к массиву.
import { CartContext } from '@/store/cart-context.jsx';

// Диалоговое окно dialog.
import CartModal from './CartModal.jsx';

export default function Header() {
  // Хук получения общего контекста(доступа) к массиву(Корзине) объектов(Товаров).
  const { items } = useContext(CartContext);

  // Кол-во товара в корзине.
  const cartQuantity = items.length;

  // Ref открытия диалогового окна dialog.
  const modal = useRef();
  // Открытие диалогового окна dialog.
  function handleOpenCartClick() {
    modal.current.open();
  }

  // Кнопка внутри диалогового окна.
  let modalActions = <button>Close</button>;
  // Две кнопки при кол-во товара в корзине большу нуля.
  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={modal} title='Your Cart' actions={modalActions} />
      <header id='main-header'>
        <div id='main-title'>
          <img src='logo.png' alt='Elegant model' />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
