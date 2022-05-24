import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import CityFilterSection from "./Home/CityFilterSection";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const SearchSection = (props) => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    search !== props.search && props.setSearch(search);
    navigate("../search");
  };

  const handleChange = (e) => {
    setSearch(e.currentTarget.value);
    if (!e.currentTarget.value) props.setSearch("");
  };

  useEffect(() => {
    if (props.search) setSearch(props.search);
  }, []);

  return (
    <div className="search-wrapper">
      <Box width="20%" minWidth="160px" className="box">
        <CityFilterSection
          filters={props.filters}
          setFilters={props.setFilters}
          loading={props.loading}
          setLoading={props.setLoading}
        />
      </Box>
      <Box
        className="box"
        width="75%"
        minWidth="220px"
        display="flex"
        flexDirection="row"
      >
        <TextField
          size="small"
          className="f0011"
          id="outlined-basic"
          label="Search"
          variant="outlined"
          type="text"
          autoComplete="off"
          fullWidth
          value={search}
          onChange={handleChange}
        />
        <Button
          className="b0011"
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSearch}
        >
          <SearchIcon />
        </Button>
      </Box>
    </div>
  );
};

export default SearchSection;
