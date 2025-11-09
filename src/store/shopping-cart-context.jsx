import { useReducer } from 'react';
import { DUMMY_PRODUCTS } from '@/dummy-products.js';
import { CartContext } from '@/store/cart-context.jsx';

// Обработка логики работы хука shoppingCart(useState).
function shoppingCartReducer(state, action) {
  // Добавление товара в корзину.
  if (action.type === 'ADD_ITEM') {
    // Копия корзины(массива) с товарами.
    const updatedItems = [...state.items];
    // Получение индекса товара по id.
    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
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
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      // Добавление шаблонного товара в корзину.
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }
    // Возврат модифицированной корзины товаров для перерендера.
    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type === 'UPDATE_ITEM') {
    // Копия корзины(массива) с товарами.
    const updatedItems = [...state.items];
    // Получение индекса товара по id.
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.id
    );
    // Копия искомого товара в корзине по его индексу.
    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };
    // Изменение кол-ва товара на величину amount(1/-1).
    updatedItem.quantity += action.payload.amount;

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
      ...state,
      items: updatedItems,
    };
  }
  return state;
}

// Шаблон контекстного(общего) доступа.
export default function CartContextProvider({ children }) {
  // Корзина с товарами.
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  // Добавление товара в корзину.
  // (Не нашелся товар по индексу - Добавляем товар из шаблонного массива/Нашелся товар - увеличиваем кол-во товара на единицу).
  function handleAddItemToCart(id) {
    // Отправка данных для обработки в shoppingCartReducer.
    shoppingCartDispatch({
      type: 'ADD_ITEM',
      payload: id,
    });
  }

  // Изменение кол-ва товара в корзине.
  // При кол-ве товара равном нулю товар удаляется.
  function handleUpdateCartItemQuantity(productId, amount) {
    // Отправка данных для обработки в shoppingCartReducer.
    shoppingCartDispatch({
      type: 'UPDATE_ITEM',
      payload: { id: productId, amount: amount },
    });
  }

  // Контекст общего доступа к данным.
  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    UpdateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
