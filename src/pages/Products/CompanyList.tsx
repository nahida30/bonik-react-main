



import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './CompanyList.module.css';


const CompanyList = () => {
    const [products, setProducts] = useState([]); // Store all the companies
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [lastPage, setLastPage] = useState(1); // Track the last page
    const [loading, setLoading] = useState(false); // Loading state for data fetching
    const [loadingMore, setLoadingMore] = useState(false); // Loading state for "Load More"

    // Function to fetch companies based on page number
    const fetchProducts = async (page = 1) => {
        if (loadingMore || loading) return;

        setLoading(page === 1); // Show loading only for the first load
        setLoadingMore(page > 1); // Show loading for "Load More"
        try {

            // http://localhost/icml/api/test?page=${page}
            const response = await axios.get(`https://seller.tizaraa.com/api/frontend/latest/justoforyou/product/view/'+number?page=${page}`);
            const data = response.data;

            console.log(data)
            

            // Append new data for load more, or set data on the first load
            setProducts(prevProducts => [...prevProducts, ...data.data]);

            setCurrentPage(data.current_page);
            setLastPage(data.last_page);
        } catch (error) {
            console.error('Error fetching companies:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // Fetch initial data when the component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    // Function to load more companies when button is clicked
    const handleLoadMore = () => {
        fetchProducts(currentPage + 1); // Load the next page
    };

    return (
        <div>
          

            {/* Display the company list */}
            <div className={styles.productCard}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Just for you</h1>
        </div>
        <div className={styles.gridContainer}>
          {products.map((product) => (
            <div className={styles.gridItem}>
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
       
      </div>
    </div>

            {/* Show "Load More" button only if there are more pages */}
            {currentPage < lastPage && (
                <div className={styles.buttonStyle}>
                    <button className={styles.loadMore} onClick={handleLoadMore} disabled={loadingMore}>
                    {loadingMore ? 'Loading...' : 'Load More'}
                </button>
                </div>
            //      <div class="load text-center">
            //     <a href="#" class="load-more text-center">Load More</a>
            // </div>
            )}

            {/* Loading message for first load */}
            {loading && <p>Loading products...</p>}
        </div>
    );
};

export default CompanyList;