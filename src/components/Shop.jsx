export default function Shop({ children }) {
  const listOfProducts =
    'grid gap-8 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] m-0 p-0 list-none';

  return (
    <section className='w-[70%] my-8 mx-auto'>
      <h2 className='text-2xl uppercase text-[#a59b8b]'>
        Elegant Clothing For Everyone
      </h2>
      <ul className={listOfProducts}>{children}</ul>
    </section>
  );
}
