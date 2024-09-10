const Products = async () => {
    const res = await fetch("https://seller.tizaraa.com/api/frontend/latest/justoforyou/product/view/10");
    const data = await res.json();
    console.log(data); 
  
    const products = data.data || []; 
  
    return (
      <>
        {products.map((product, index) => (
          <h1 key={index}>{product.product_name}</h1>
        ))}
      </>
    );
  };
  
  export default Products;
  