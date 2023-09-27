import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import { ProductComponent } from './ProductComponent';
import Pagination from 'react-js-pagination';
import '../App.css';
import Search from './Search';
import { useParams } from 'react-router-dom';
import PriceRangeSlider from './PriceRangeSlider';

const ProductListing = () => {
  const [price, setPrice] = useState([1, 1000]);


  const [category, setcategory] = useState("");
  console.log(category)

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor"
]

  const dispatch = useDispatch();
  const productCount = useSelector((state) => state.allproducts.ProductCount);
  const resPerPage = useSelector((state) => state.allproducts.resPerPage);

  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
 
  const [sortOption, setSortOption] = useState("");


  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
   
      setSortOption(selectedSortOption);
    
  };
  

  useEffect(() => {
    dispatch(fetchProducts(keyword, currentPage, category, price, sortOption));
  }, [currentPage, keyword, price,category,sortOption, dispatch]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const handleCategoryChange = (event) => {
    setcategory(event.target.value);
  };

  return (
    <div className='ui grid container'>
      <div>
        <Search keyword={keyword} />
      </div>
      <div>
        <PriceRangeSlider price={price} sprice={setPrice} />
      </div>
      <div>
  <label htmlFor="sort">Sort by Price: </label>
  <select id="sort" name="sort" value={sortOption} onChange={handleSortChange}>
    <option value="">Default</option>
    <option value="asc">Low to High</option>
    <option value="desc">High to Low</option>
  </select>
</div>
      <div>
        <label htmlFor="category">Select a Category: </label>
        <select id="category" name="category" value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="product-container">
        <ProductComponent />
      </div>
      <div className='pagination-container horizontal-pagination'>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={productCount}
          onChange={setCurrentPageNo}
          nextPageText={'Next '}
          prePageText={'Prev'}
          firstPageText={'First'}
          lastPageText={'Last'}
          itemClass='page-item'
          linkClass='page-link'
        />
      </div>
    </div>
  );
};

export default ProductListing;
