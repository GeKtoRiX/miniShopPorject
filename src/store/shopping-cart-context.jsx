import { useState, createContext } from 'react';
import { DUMMY_PRODUCTS } from '@/dummy-products.js';

// Шаблон контекстного(общего) доступа.
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  UpdateItemQuantity: () => {},
});

export default function CartContextProvider({ children }) {
  // Корзина с товарами.
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  // Добавление товара в корзину.
  // (Не нашелся товар по индексу - Добавляем товар из шаблонного массива/Нашелся товар - увеличиваем кол-во товара на единицу).
  function handleAddItemToCart(id) {
    // Изменение состояния корзины с товарами.
    setShoppingCart((prevShoppingCart) => {
      // Копия корзины(массива) с товарами.
      const updatedItems = [...prevShoppingCart.items];

      // Получение индекса товара по id.
      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );

      // Ссылка на искомый товар в корзине по его индексу.
      const existingCartItem = updatedItems[existingCartItemIndex];

      // Товар в корзине по индексу нашелся - увеличиваем кол-во товара на единицу.
      if (existingCartItem) {
        // Копия найденного товара в корзине.
        const updatedItem = {
          ...existingCartItem,
          // Увеличение кол-ва текущего товара на единицу.
          quantity: existingCartItem.quantity + 1,
        };
        // Замена товара с измененным количеством.
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      // Товар в корзине по индексу НЕ нашелся - добавляем шаблон товара из массива товаров.
      else {
        // Ссылка на товар в массиве шаблонов.
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        // Добавление шаблонного товара в корзину.
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      // Возврат модифицированной корзины товаров для перерендера.
      return {
        items: updatedItems,
      };
    });
  }

  // Изменение кол-ва товара в корзине.
  // При кол-ве товара равном нулю товар удаляется.
  function handleUpdateCartItemQuantity(productId, amount) {
    // Изменение состояния корзины с товарами.
    setShoppingCart((prevShoppingCart) => {
      // Копия корзины(массива) с товарами.
      const updatedItems = [...prevShoppingCart.items];
      // Получение индекса товара по id.
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );
      // Копия искомого товара в корзине по его индексу.
      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };
      // Изменение кол-ва товара на величину amount(1/-1).
      updatedItem.quantity += amount;

      // Кол-во товара в корзине равно нулю.
      if (updatedItem.quantity <= 0) {
        // Удаление товара из корзины.
        updatedItems.splice(updatedItemIndex, 1);
        // Кол-во товара в корзине больше нуля.
      } else {
        // Замена товара с измененным количеством.
        updatedItems[updatedItemIndex] = updatedItem;
      }
      // Возврат модифицированной корзины товаров для перерендера.
      return {
        items: updatedItems,
      };
    });
  }

  // Контекст общего доступа к данным.
  const ctxValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    UpdateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
