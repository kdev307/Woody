import React, { useEffect, useState } from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Star } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Tags from "../components/Tags";

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

    const sortButtons = [
        { sortName: "Alphabetical", methodName: "alphabetical" },
        { sortName: "Popularity", methodName: "popularity" },
        { sortName: "Price -- High to Low", methodName: "priceHighToLow" },
        { sortName: "Price -- Low to High", methodName: "priceLowToHigh" },
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
    const [activeSort, setActiveSort] = useState("alphabetical");

    const handleCategoryFilter = (category) => {
        setSelectedCategory((prevCategory) =>
            prevCategory === category ? "All" : category
        );
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
            .filter((product) => {
                const { productName, productBrand, productCategories } =
                    product;
                const query = searchQuery.toLowerCase();
                return (
                    (productName &&
                        productName.toLowerCase().includes(query)) ||
                    (productBrand &&
                        productBrand.toLowerCase().includes(query)) ||
                    (productCategories &&
                        productCategories.some((category) =>
                            category.toLowerCase().includes(query)
                        ))
                );
            })
            .filter(
                (product) =>
                    selectedCategory === "All" ||
                    product.productCategories.some((category) =>
                        category.includes(selectedCategory)
                    )
            );
    console.log(filteredProducts);
    let sortedProducts = [...filteredProducts];
    if (sortBy === "alphabetical") {
        sortedProducts.sort((a, b) =>
            a.productName.localeCompare(b.productName)
        );
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
            <div className="store-container bg-[#e4efe4] p-8">
                <div className="nav-bar my-1 mx-0 flex justify-start items-center mb-6">
                    <ul className="sort-btns flex justify-center items-center gap-3">
                        {sortButtons.map((sortBtn, index) => (
                            <li key={index}>
                                <button
                                    className={`relative bg-transparent border-none p-2 cursor-pointer 
                                ${
                                    activeSort === sortBtn.methodName
                                        ? "text-[#014210]"
                                        : ""
                                } group
                                `}
                                    onClick={() => {
                                        setActiveSort(sortBtn.methodName);
                                        setSortBy(sortBtn.methodName);
                                    }}
                                >
                                    {sortBtn.sortName}
                                    <span
                                        className={`absolute left-0 right-0 bottom-[-0.2rem] h-[2px] bg-[#014210] 
                                    ${
                                        activeSort === sortBtn.methodName
                                            ? "scale-x-100"
                                            : "scale-x-0"
                                    } group-hover:scale-x-100
                                    transition-transform duration-300`}
                                    ></span>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-bar w-[38vw] p-2.5 pl-6 pr-6 text-base border-2 border-[#014210] text-[#014210] bg-[#eee] rounded-lg shadow-md transition-all duration-1000 ease-in-out transform translate-x-[79%] focus:border-[#560000] focus:outline-none focus:text-[#560000]"
                    />
                    {/* <Search style={{ fontSize: "3.6rem", color: "#014210" }} /> */}
                    {/* <button onClick={handleSearch} className="search-button">
                        <Search style={{ fontSize: "3.6rem", color: "#014210" }} />
                    </button> */}
                </div>
                <div className="products-section grid grid-cols-[1fr_4fr] items-start justify-center gap-6 text-xl">
                    <ProductFilters
                        productFilters={productFilters}
                        selectedCategory={selectedCategory}
                        handleCategoryFilter={handleCategoryFilter}
                    />
                    <Products
                        productsList={sortedProducts}
                        loading={loading}
                        error={error}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}

function ProductFilters({
    productFilters,
    selectedCategory,
    handleCategoryFilter,
}) {
    return (
        <>
            <ul className="filters-list flex flex-col items-center justify-center text-center p-8 gap-4 bg-[#eee] rounded-lg shadow-[2px_2px_8px_rgba(0,86,0,0.3)]">
                {productFilters.map((category) => (
                    <li
                        key={category}
                        className={`category block cursor-pointer p-4 w-full rounded-lg shadow-[2px_2px_8px_rgba(0,86,0,0.3)] transition-all ease-in-out duration-1000 
                ${
                    selectedCategory === category
                        ? "bg-[#e8f6e8] text-[#014210] font-bold border-2 border-[#014210]"
                        : "hover:bg-[#d0f4d0] hover:scale-105 hover:border-2 hover:border-[#014210]"
                }`}
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
                    <ul className="products-list grid grid-cols-3 items-center justify-center gap-2 -mt-2">
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
    const {
        productName,
        productBrand,
        image,
        price,
        rating,
        productCategories,
        productDescription,
        numReviews,
        stockCount,
    } = product;

    return (
        <Link
            to={`/product/${product.id}`}
            element
            className="detail-btn inline-flex text-[#014210] p-2 text-center font-normal border-none outline-none hover:bg-[#014210] hover:border-none hover:outline-none hover:text-white transition-all ease duration-500"
        >
            <div className="product-card flex flex-col items-start justify-center rounded-lg shadow-[5px_5px_10px_rgba(83,0,0,0.3)] transition-all ease-in-out duration-1000 bg-[#eee] relative text-[#014210] hover:border-2 hover:border-[#014210] hover:scale-105 hover:shadow-[5px_5px_10px_rgba(1,66,16,0.3)] hover:bg-white">
                <div className="img-container w-[29.2rem] rounded-t-lg overflow-hidden">
                    {!stockCount ? (
                        <Tags
                            tagData="Out of Stock"
                            tagColor="#fff"
                            tagBackgroundColor="#fb2d2d"
                        />
                    ) : stockCount < 50 ? (
                        <Tags
                            tagData="Only few left"
                            tagColor="#fff"
                            tagBackgroundColor="#ff8811"
                        />
                    ) : (
                        ""
                    )}
                    <img
                        src={image}
                        alt={productName}
                        className="product-img w-full"
                    />
                </div>
                <ul className="product-category-list flex flex-wrap items-center justify-start gap-2 mt-2 p-2">
                    {(productCategories || []).map((category) => {
                        return (
                            <li
                                className="category-item rounded-lg text-base font-bold bg-[#560000] text-white p-2 text-center"
                                key={category}
                            >
                                {category}
                            </li>
                        );
                    })}
                </ul>
                <div className="product-info flex flex-col items-start justify-start h-60 p-4 gap-1">
                    <h4 className="product-brand text-left text-[#560000] font-bold">
                        {productBrand}
                    </h4>
                    <h3 className="product-name text-left font-semibold">
                        {productName}
                    </h3>
                    <div className=" flex items-center justify-start gap-40">
                        <h3 className="product-price font-bold text-2xl">
                            ₹ {price}
                        </h3>
                        {/* <InfoOutlined style={{ fontSize: "2.4rem" }} className="info-icon" /> */}
                        <div className="rating flex items-center justify-center gap-2 text-[#560000] rounded-[4rem] font-semibold">
                            <h3>{rating}</h3>
                            <Star
                                style={{
                                    textAlign: "center",
                                    verticalAlign: "center",
                                }}
                            />
                            {` (${numReviews})`}
                            {/* {`from ${numReviews} reviews`} */}
                        </div>
                    </div>
                    <p className="product-desc text-lg text-left text-[#560000] overflow-hidden w-96 whitespace-nowrap text-ellipsis mt-4">
                        {productDescription}
                    </p>
                </div>
            </div>
        </Link>
    );
}
