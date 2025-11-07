export default function Cart({ cartItems, onUpdateCartItemQuantity }) {
  // Общая стоимость товаров в корзине.
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  // Форматирование общей стоимости всех объектов(обрезание нулей после 2ух знаков после запятой).
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id='cart'>
      {cartItems.length === 0 && <p>No items in cart!</p>}

      {cartItems.length > 0 && (
        <ul id='cart-items'>
          {cartItems.map((item) => {
            // Форматирование цены объект(обрезание нулей после 2ух знаков после запятой).
            const formattedPrice = `$${item.price.toFixed(2)}`;
            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>

                <div className='cart-item-actions'>
                  <button onClick={() => onUpdateCartItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateCartItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p id='cart-total-price'>
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
