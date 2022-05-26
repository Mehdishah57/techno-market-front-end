import {useState, useEffect, useRef} from "react";
import getProducts from "../services/getProducts";

const useSearchHome = ({search, filters}) => {
    const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const fetchProducts = useRef();

  fetchProducts.current = async (payload) => {
    try {
      setLoading(true);
      const { data, error } = await getProducts(payload);
      if (error) console.log(error);
      setProducts(data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts.current({ pageNumber, search, filters });
  }, [pageNumber, search, filters]);

  const nextPage = () => products.length >= 10 && setPageNumber(prevNumber => prevNumber + 1)

  const previousPage = () => pageNumber > 1 && setPageNumber(prevNumber => prevNumber - 1)

  return [
    products,
    loading, setLoading,
    pageNumber,
    nextPage, previousPage
  ]
}

export default useSearchHome;