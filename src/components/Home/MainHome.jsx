import React, { useState, useEffect, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { Carousel } from 'react-responsive-carousel';
import bannerOne from "../../assets/h1.png"
import bannerTwo from "../../assets/h2.png"
import bannerThree from "../../assets/h3.png"
import Box from '@mui/material/Box';
import HomePageControl from '../HomePageControl';
import ProductItem from '../ProductItem';
import getCategoryWise from '../../services/getCategoryWise';
import getFreshProducts from '../../services/getFreshProducts';
import ProductSkeletonList from '../ProductSkeletonList';
import CategoryFilterSection from './CategoryFilterSection';
import SearchSection from '../SearchSection';

const MainHome = ({filters, setFilters, search, setSearch}) => {
		const [freshProducts, setFreshProducts] = useState([]);
	const [mobiles, setMobiles] = useState([]);
	const [bikes, setBikes] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [pageSize] = useState(10);
	const [loading, setLoading] = useState(true);
	const fetchData = useRef(null);

	fetchData.current = async () => {
		const [freshProducts, freshProductsError] = await getFreshProducts(pageNumber, pageSize);
		const [mobiles, mobileError] = await getCategoryWise("Mobiles");
		const [bikes, bikeError] = await getCategoryWise("Bikes")
		if (mobileError || bikeError || freshProductsError) 
			return console.log(mobileError || bikeError || freshProductsError);
		setFreshProducts(freshProducts);
		setMobiles(mobiles);
		setBikes(bikes);
		setLoading(false);
	}

	useEffect(() => {
		fetchData.current();
	}, [])

	const nextPage = () => freshProducts.length >= pageSize && setPageNumber(prevNumber => prevNumber + 1)

	const previousPage = () => pageNumber > 1 && setPageNumber(prevNumber => prevNumber - 1)

	return <div className="home-wrapper">
		<Toaster />
		<CategoryFilterSection filters={filters} setFilters={setFilters} />
		<SearchSection
					search={search}
					setSearch={setSearch}
					filters={filters}
					setFilters={setFilters}
				/>
		<Carousel
			width="700px"
			autoPlay
			infiniteLoop
			interval={4000}
			stopOnHover
			showArrows={false}
			showThumbs={false}
		>
			<div>
				<img width='700px' src={bannerOne} alt='' />
			</div>
			<div>
				<img width='700px' src={bannerTwo} alt='' />
			</div>
			<div>
				<img width='700px' src={bannerThree} alt='' />
			</div>
		</Carousel>
		<div className="home-products-wrapper">
			<Box width='100%' padding={1}>
				<h2>Fresh Recommendations</h2>
			</Box>
			{!loading ? freshProducts.map(product =>
				<ProductItem
					key={product._id}
					product={product}
				/>) : <ProductSkeletonList number={12} />}
			{!freshProducts.length && !loading && <div className='no-result'>No Results</div>}
		</div>

		<HomePageControl
			pageNumber={pageNumber}
			nextPage={nextPage}
			previousPage={previousPage}
		/>
		<Box
			display='flex'
			flexDirection='column'
			justifyContent="center"
			alignItems="center"
			padding={2}
			width='100%'>
			<Box display='flex' width="100%" flexDirection="row">
				<h2>Mobiles</h2>
			</Box>
			<Box
				display="flex"
				padding="10px"
				justifyContent='center'
				alignItems='center'
				gap="20px"
				width="100%"
				flexDirection="row"
				flexWrap="wrap"
			>
				{loading? 
					<ProductSkeletonList number={6} />
				:mobiles.map(mobile => <ProductItem key={mobile._id} product={mobile} />)}
			</Box>
		</Box>
		<Box 
			display='flex' 
			flexDirection='column' 
			justifyContent="center" 
			alignItems="center"
			padding={2} 
			width='100%'>
			<Box display='flex' width="100%" flexDirection="row">
				<h2>Bikes</h2>
			</Box>
			<Box 
				display="flex" 
				padding="10px" 
				justifyContent='center' 
				alignItems='center' 
				gap="20px" 
				width="100%" 
				flexDirection="row" 
				flexWrap="wrap"
			>
				{loading? 
					<ProductSkeletonList />
				:bikes.map(bike => <ProductItem key={bike._id} product={bike} />)}
			</Box>
		</Box>
		{/* <Fab onClick={() => setShowFilter(true)} sx={{position:"absolute", bottom:"20px", right:"20px"}} color="inherit" aria-label="add">
            <TuneIcon />
          </Fab>
        <Filters 
            showFilter={showFilter} 
            setShowFilter={setShowFilter}
            applyFilters={applyFilters}
        /> */}
	</div>
}

export default MainHome;