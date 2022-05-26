import { useState, useEffect, useRef } from "react";
import getCategoryWise from "../services/getCategoryWise";
import getFreshProducts from "../services/getFreshProducts";

const useMainHome = () => {
	const [search, setSearch] = useState("");
	const [filters, setFilters] = useState({});
	const [freshProducts, setFreshProducts] = useState([]);
	const [mobiles, setMobiles] = useState([]);
	const [bikes, setBikes] = useState([]);
	const [vehicles, setVehicles] = useState([]);
	const [electronics, setElectronics] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [pageSize] = useState(20);
	const [loading, setLoading] = useState(false);
	const [tabsLoading, setTabsLoading] = useState(false);
	const fetchData = useRef(null);
	const fetchTabs = useRef(null);

	fetchData.current = async () => {
		setLoading(true);
		const [freshProducts, freshProductsError] = await getFreshProducts(
			pageNumber,
			pageSize,
			filters.city
		);
		if (!freshProductsError)
			setFreshProducts(freshProducts);
		setLoading(false);
	};

	fetchTabs.current = async () => {
		setTabsLoading(true);
		const [mobiles, mobileError] = await getCategoryWise(
			"Mobiles",
			filters.city
		);
		const [bikes, bikeError] = await getCategoryWise("Bikes", filters.city);
		const [vechiles, vechilesError] = await getCategoryWise("Vehicles", filters.city)
		const [electronics, electronicsError] = await getCategoryWise("Electronic Systems", filters.city)
		if (mobileError || bikeError || vechilesError || electronicsError)
			console.log(mobileError || bikeError || vechilesError || electronicsError);
		else {
			setMobiles(mobiles);
			setBikes(bikes);
			setVehicles(vechiles);
			setElectronics(electronics)
		}
		setTabsLoading(false)
	}

	useEffect(() => {
		if (!mobiles.length)
			fetchTabs.current();
	}, [])

	useEffect(() => {
		fetchData.current();
	}, [filters.city, pageNumber]);

	const nextPage = () =>
		freshProducts.length >= pageSize &&
		setPageNumber((prevNumber) => prevNumber + 1);

	const previousPage = () =>
		pageNumber > 1 && setPageNumber((prevNumber) => prevNumber - 1);

	return [
		search, setSearch,
		filters, setFilters,
		freshProducts, setFreshProducts,
		mobiles, setMobiles,
		bikes, setBikes,
		vehicles, setVehicles,
		electronics, setElectronics,
		pageNumber, loading, tabsLoading,
		nextPage, previousPage
	];
}

export default useMainHome;