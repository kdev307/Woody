import React, { useEffect, useState } from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Star } from "@mui/icons-material";
import "../styles/common.css";
import "../styles/store.css";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

export default function Store() {
    const productFilters = [
        "Accessories",
        "Bedroom",
        "Dining Room",
        "Hallway",
        "Kid's Room",
        "Living Room",
        "Outdoor",
        "Storage",
        "Workspace",
    ];
    // const productsList = [];

    const dispatch = useDispatch();
    const productsList = useSelector((state) => state.productsList);
    const { error, loading, products } = productsList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);
    console.log(products);

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("alphabetical");

    const handleCategoryFilter = (category) => {
        setSelectedCategory((prevCategory) => (prevCategory === category ? "All" : category));
    };

    // const handleSearch = () => {};
    // const filteredProducts =
    //     selectedCategory === "All"
    //         ? productsList
    //         : productsList.filter((product) => product.category === selectedCategory);

    console.log(products);
    const filteredProducts =
        // products && products.length > 0
        products
            .filter((product) =>
                product.productName.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .filter(
                (product) =>
                    selectedCategory === "All" || product.productCategory.includes(selectedCategory)
            );
    console.log(filteredProducts);
    let sortedProducts = [...filteredProducts];
    if (sortBy === "alphabetical") {
        sortedProducts.sort((a, b) => a.productName.localeCompare(b.productName));
    } else if (sortBy === "popularity") {
        sortedProducts.sort(
            (a, b) =>
                Number(a.stockCount - b.stockCount) &&
                Number(b.rating - a.rating) &&
                Number(b.numReviews - a.numReviews)
        );
    } else if (sortBy === "priceLowToHigh") {
        sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "priceHighToLow") {
        sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return (
        <>
            <Navbar />
            <div className="store-container">
                <div className="nav-bar">
                    <ul className="sort-btns">
                        <li>
                            <button
                                className={`sort-btn ${sortBy === "alphabetical" ? "active" : ""}`}
                                onClick={() => setSortBy("alphabetical")}
                            >
                                Alphabetical
                            </button>
                        </li>
                        <li>
                            <button
                                className={`sort-btn ${sortBy === "popularity" ? "active" : ""}`}
                                onClick={() => setSortBy("popularity")}
                            >
                                Popularity
                            </button>
                        </li>
                        <li>
                            <button
                                className={`sort-btn ${
                                    sortBy === "priceLowToHigh" ? "active" : ""
                                }`}
                                onClick={() => setSortBy("priceLowToHigh")}
                            >
                                Price -- Low to High
                            </button>
                        </li>
                        <li>
                            <button
                                className={`sort-btn ${
                                    sortBy === "priceHighToLow" ? "active" : ""
                                }`}
                                onClick={() => setSortBy("priceHighToLow")}
                            >
                                Price -- High to Low
                            </button>
                        </li>
                    </ul>
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-bar"
                    />
                    {/* <Search style={{ fontSize: "3.6rem", color: "#014210" }} /> */}
                    {/* <button onClick={handleSearch} className="search-button">
                        <Search style={{ fontSize: "3.6rem", color: "#014210" }} />
                    </button> */}
                </div>
                <div className="products-section">
                    <ProductFilters
                        productFilters={productFilters}
                        selectedCategory={selectedCategory}
                        handleCategoryFilter={handleCategoryFilter}
                    />
                    <Products productsList={sortedProducts} loading={loading} error={error} />
                </div>
            </div>
            <Footer />
        </>
    );
}

function ProductFilters({ productFilters, selectedCategory, handleCategoryFilter }) {
    return (
        <>
            <ul className="filters-list">
                {productFilters.map((category) => (
                    <li
                        key={category}
                        className={`category ${selectedCategory === category ? "active" : ""}`}
                        onClick={() => handleCategoryFilter(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </>
    );
}

function Products({ productsList, loading, error }) {
    // if (!productsList.length) {
    //     return <div>No products found.</div>;
    // }
    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <Error message={error} />
            ) : (
                <>
                    <ul className="products-list">
                        {productsList.map((product) => {
                            return (
                                <li key={product.id}>
                                    <ProductCard product={product} />
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </>
    );
}

function ProductCard({ product }) {
    const { productName, productBrand, image, price, rating, description, category, numReviews } =
        product;

    return (
        <Link to={`/product/${product.id}`} element className="detail-btn">
            <div className="product-card">
                <div className="img-container">
                    <img src={image} alt={productName} className="product-img" />
                </div>
                {/* <ul className="product-category-list">
                    {categories.map((category) => {
                        return (
                            <li className="category-item" key={category}>
                                {category}
                            </li>
                        );
                    })}
                </ul> */}
                <div className="product-info">
                    <h4 className="product-brand">{productBrand}</h4>
                    <h3 className="product-name">{productName}</h3>
                    <p className="product-desc">{description}</p>
                    <div>
                        <h3 className="product-price">₹ {price}</h3>
                        {/* <InfoOutlined style={{ fontSize: "2.4rem" }} className="info-icon" /> */}
                        <div className="rating">
                            <h3>{rating}</h3>
                            <Star style={{ textAlign: "center", verticalAlign: "center" }} />
                            {` (${numReviews})`}
                            {/* {`from ${numReviews} reviews`} */}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
