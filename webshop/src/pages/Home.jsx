import { useEffect, useState } from "react";
import Pagination from 'react-bootstrap/Pagination';
import { ToastContainer } from 'react-toastify';
import SortButtons from "../components/home/SortButtons";
import Product from "../components/home/Product";
import FilterBar from "../components/home/FilterBar";
import CarouselGallery from "../components/home/CarouselGallery";
import Spinner from "../components/home/Spinner";

// ffc    https://react-query.tanstack.com/overview
// toast erinevate lehtede erinev disain
function Home() {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const productDb = "https://react-06-webshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const [categories, setCategories] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(()=>{
    // setLoading(true);
    fetch(productDb)
      .then(res => res.json())
      .then(body => {
        updateData(body);
        setLoading(false);
      })
  },[]);

  const updateData = (firebaseProducts) => {
    const productArray = [];
    let categoryArray = [];
    const pagesArray = [];
    let i = 0;
    for (const key in firebaseProducts) {
      const product = firebaseProducts[key];
      if (product.isActive) {
        productArray.push(product);
        categoryArray.push(product.category);
        if (i % 10 === 0) {
          pagesArray.push(i/10+1);
        }
        i++;
      }
    }
    categoryArray = [...new Set(categoryArray)];
    setCategories(categoryArray);
    setProducts(productArray.slice(0,10));
    setFilteredProducts(productArray);
    setOriginalProducts(productArray);
    setPages(pagesArray);
  }

  const changePage = (number) => {
    setActivePage(number);
    if (selectedCategory === 'all') {
      setProducts(originalProducts.slice(number*10-10, number*10));
    } else {
      const newProducts = originalProducts.filter(element => element.category === selectedCategory);
      setProducts(newProducts.slice(number*10-10, number*10));
    }
  } 

  return (
  <div>
    <CarouselGallery />
    { isLoading && <Spinner />}
    <div>Kokku {filteredProducts.length} toodet</div>
    { categories.length > 1 && <FilterBar
      originalProducts={originalProducts}
      categories={categories}
      selectedCategory={selectedCategory}
      setActivePage={setActivePage}
      setPages={setPages}
      setFilteredProducts={setFilteredProducts}
      setProducts={setProducts}
      setSelectedCategory={setSelectedCategory}
    />}
    <SortButtons
      products={products}
      updateProducts={setProducts} />
    {products.map((element, index) => 
      <Product element={element} index={index} />
    )}
    {pages.length > 1 && <Pagination>{pages.map(number => 
      <Pagination.Item onClick={() => changePage(number)} key={number} active={number === activePage}>
        {number}
      </Pagination.Item>)}
    </Pagination>}
    <ToastContainer />
  </div>)
}

export default Home;