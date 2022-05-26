import React, { useState, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { Carousel } from "react-responsive-carousel";
import banner from "../../assets/b1.jpg";
import Box from "@mui/material/Box";
import HomePageControl from "../HomePageControl";
import ProductItem from "../ProductItem";
import getCategoryWise from "../../services/getCategoryWise";
import getFreshProducts from "../../services/getFreshProducts";
import ProductSkeletonList from "../ProductSkeletonList";
import CategoryFilterSection from "./CategoryFilterSection";
import SearchSection from "../SearchSection";

const MainHome = ({
  filters,
  setFilters, 
  search,
  setSearch,
  freshProducts, setFreshProducts,
  mobiles, setMobiles,
  bikes, setBikes,
  vehicles, setVehicles,
  electronics, setElectronics ,
  loading, tabsLoading,
  pageNumber, nextPage, previousPage
}) => {
  return (
    <div className="home-wrapper">
      <Toaster />
      <CategoryFilterSection filters={filters} setFilters={setFilters} />
      <SearchSection
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
      />
      <Carousel
        width="100%"
        autoPlay
        infiniteLoop
        interval={4000}
        stopOnHover
        showArrows={false}
        showThumbs={false}
      >
        <div>
          <img width="100%" src={banner} alt="" />
        </div>
        <div>
          <img width="100%" src={banner} alt="" />
        </div>
        <div>
          <img width="100%" src={banner} alt="" />
        </div>
      </Carousel>
      <div className="home-products-wrapper">
        <Box width="100%" padding={1}>
          <h2>Fresh Recommendations</h2>
        </Box>
        {!loading ? (
          freshProducts.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        ) : (
          <ProductSkeletonList number={12} />
        )}
        {!freshProducts.length && !loading && (
          <div className="no-result">No Results</div>
        )}
      </div>

      <HomePageControl
        pageNumber={pageNumber}
        nextPage={nextPage}
        previousPage={previousPage}
      />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding={2}
        width="100%"
      >
        <Box display="flex" width="100%" flexDirection="row">
          <h2>Mobiles</h2>
        </Box>
        <Box
          display="flex"
          padding="10px"
          justifyContent="center"
          alignItems="center"
          gap="20px"
          width="100%"
          flexDirection="row"
          flexWrap="wrap"
        >
          {tabsLoading ? (
            <ProductSkeletonList number={6} />
          ) : (
            mobiles.map((mobile) => (
              <ProductItem key={mobile._id} product={mobile} />
            ))
          )}
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding={2}
        width="100%"
      >
        <Box display="flex" width="100%" flexDirection="row">
          <h2>Bikes</h2>
        </Box>
        <Box
          display="flex"
          padding="10px"
          justifyContent="center"
          alignItems="center"
          gap="20px"
          width="100%"
          flexDirection="row"
          flexWrap="wrap"
        >
          {tabsLoading ? (
            <ProductSkeletonList number={6} />
          ) : (
            bikes.map((bike) => <ProductItem key={bike._id} product={bike} />)
          )}
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding={2}
        width="100%"
      >
        <Box display="flex" width="100%" flexDirection="row">
          <h2>Vehicles</h2>
        </Box>
        <Box
          display="flex"
          padding="10px"
          justifyContent="center"
          alignItems="center"
          gap="20px"
          width="100%"
          flexDirection="row"
          flexWrap="wrap"
        >
          {tabsLoading ? (
            <ProductSkeletonList number={6} />
          ) : (
            vehicles.map((vehicle) => <ProductItem key={vehicle._id} product={vehicle} />)
          )}
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding={2}
        width="100%"
      >
        <Box display="flex" width="100%" flexDirection="row">
          <h2>Electronics</h2>
        </Box>
        <Box
          display="flex"
          padding="10px"
          justifyContent="center"
          alignItems="center"
          gap="20px"
          width="100%"
          flexDirection="row"
          flexWrap="wrap"
        >
          {tabsLoading ? (
            <ProductSkeletonList number={6} />
          ) : (
            electronics.map((electronic) => <ProductItem key={electronic._id} product={electronic} />)
          )}
        </Box>
      </Box>
    </div>
  );
};

export default MainHome;
