import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./../components/ProductDetail";
import MainHome from "../components/Home/MainHome";
import SearchHome from "../components/Home/SearchHome";
import CityProvider from "../global/CityContext";

import "../styles/home.scss";

const Home = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});

  return (
    <CityProvider>
      <Routes>
        <Route
          path="/"
          element={
            <MainHome
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
              filters={filters}
              setFilters={setFilters}
              search={search}
              setSearch={setSearch}
            />
          }
        />
        <Route path="/:id" element={<ProductDetail />} />
      </Routes>
    </CityProvider>
  );
};

export default Home;
