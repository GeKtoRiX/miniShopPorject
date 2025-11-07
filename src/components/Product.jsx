export default function Product({
  id,
  image,
  title,
  price,
  description,
  onAddToCart,
}) {
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
          <button onClick={() => onAddToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
