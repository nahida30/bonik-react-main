import { useEffect, useState } from 'react';
import styles from './Section2.module.css';

const Section3 = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://seller.tizaraa.com/api/frontend/latest/justoforyou/product/view/10");
      const data = await res.json();
      setProducts(data.data || []);
      console.log(data)
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.productCard}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h3>Just for you</h3>
        </div>
        <div className={styles.gridContainer}>
          {products.map((product, index) => (
            <div key={index} className={styles.gridItem}>
              <a href="#">
                <div className={styles.product}>
                  <div className={styles.imgPart}>
                    <img src={product.product_thumbnail} alt={product.product_name} />
                  </div>
                  <div className={styles.contentPart}>
                    <p>{product.product_name}</p>
                    <div className={styles.discountPrice}>
                      <h5><del>৳ {product.seeling_price}</del></h5>
                      <span>{product.sellerPurprice}</span>
                    </div>
                    <div className={styles.price}>
                      <h3>৳ {product.profiteprice}</h3>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className={styles.loadMore}>
          <a href="#">Load More</a>
        </div>
      </div>
    </div>
  );
};

export default Section3;
