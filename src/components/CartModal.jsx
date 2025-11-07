import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
// Товары в корзине.
import Cart from './Cart.jsx';

const CartModal = forwardRef(function CartModal(
  { title, actions, cartItems, onUpdateCartItemQuantity },
  ref
) {
  // Локальный хук доступа к dialog.
  const dialogRef = useRef();
  // Проброс хука открытия диалогового окна.
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialogRef.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog id='modal' ref={dialogRef}>
      <h2>{title}</h2>
      <Cart
        cartItems={cartItems}
        onUpdateCartItemQuantity={onUpdateCartItemQuantity}
      />
      <form id='modal-actions' method='dialog'>
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal-root')
  );
});

export default CartModal;
