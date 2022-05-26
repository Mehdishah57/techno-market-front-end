import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./../components/ProductDetail";
import MainHome from "../components/Home/MainHome";
import SearchHome from "../components/Home/SearchHome";
import CityProvider from "../global/CityContext";
import useMainHome from "../hooks/useMainHome";
import useSearchHome from "../hooks/useSearchHome";

import "../styles/home.scss";


const Home = () => {
  const [
    search, setSearch,
    filters, setFilters,
    freshProducts, setFreshProducts,
    mobiles, setMobiles,
    bikes, setBikes,
    vehicles, setVehicles,
    electronics, setElectronics,
    pageNumber, loading, tabsLoading,
    nextPage, previousPage
  ] = useMainHome();
  const [
    products,
    isLoading , setIsLoading,
    pageNo,
    nextPg, prevPage
  ] = useSearchHome({search, filters});

  return (
    <CityProvider>
      <Routes>
        <Route
          path="/"
          element={
            <MainHome
              freshProducts={freshProducts}
              setFreshProducts={setFreshProducts}
              mobiles={mobiles}
              setMobiles={setMobiles}
              bikes={bikes}
              setBikes={setBikes}
              vehicles={vehicles}
              setVehicles={setVehicles}
              electronics={electronics}
              setElectronics={setElectronics}
              loading={loading}
              tabsLoading={tabsLoading}
              pageNumber={pageNumber}
              nextPage={nextPage}
              previousPage={previousPage}
              filters={filters}
              setFilters={setFilters}
              search={search}
              setSearch={setSearch}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchHome
            products={products}
              loading={isLoading}
              setLoading={setIsLoading}
              pageNumber={pageNo}
              nextPage={nextPg}
              previousPage={prevPage}
              filters={filters}
              setFilters={setFilters}
              search={search}
              setSearch={setSearch}
            />
          }
        />
        <Route path="/item/:id" element={<ProductDetail />} />
      </Routes>
    </CityProvider>
  );
};

export default Home;
