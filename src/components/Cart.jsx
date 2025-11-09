// Контекстная(Общая) функция доступа к данным.
import { CartContext } from '@/store/shopping-cart-context.jsx';

export default function Cart() {
  // Массив товаров в корзине, Функция изменения кол-ва товара.
  // const { items, UpdateItemQuantity } = useContext(CartContext);

  // Альтернативный подход <CartContext.Consumer>(НЕ РЕКОММЕНДУЕТСЯ).
  return (
    <CartContext.Consumer>
      {({ items, UpdateItemQuantity }) => {
        // Общая стоимость товаров в корзине.
        const totalPrice = items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        // Форматирование общей стоимости всех объектов(обрезание нулей после 2ух знаков после запятой).
        const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

        return (
          <div id='cart'>
            {items.length === 0 && <p>No items in cart!</p>}

            {items.length > 0 && (
              <ul id='cart-items'>
                {items.map((item) => {
                  // Форматирование цены объект(обрезание нулей после 2ух знаков после запятой).
                  const formattedPrice = `$${item.price.toFixed(2)}`;
                  return (
                    <li key={item.id}>
                      <div>
                        <span>{item.name}</span>
                        <span> ({formattedPrice})</span>
                      </div>

                      <div className='cart-item-actions'>
                        <button onClick={() => UpdateItemQuantity(item.id, -1)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => UpdateItemQuantity(item.id, 1)}>
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
      }}
    </CartContext.Consumer>
  );
}
