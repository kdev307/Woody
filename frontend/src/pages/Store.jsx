import React, { useEffect, useState } from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    AddCircle,
    ArrowDropDown,
    ArrowDropUp,
    Delete,
    Edit,
    Star,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Tags from "../components/Tags";
import ProductForm from "../components/ProductForm";

function Store() {
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
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
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
    const [isSortExpanded, setIsSortExpanded] = useState(false);
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);

    const handleCategoryFilter = (category) => {
        setSelectedCategory((prevCategory) =>
            prevCategory === category ? "All" : category
        );
        setIsFilterExpanded(!isFilterExpanded);
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
                <div className="nav-bar my-1 mx-0 flex sm_tab:flex-col-reverse lg_tab:gap-8 sm_desk:gap-64 sm_tab:items-start justify-start items-center mb-6">
                    <ul className="sort-btns flex lg_tab:hidden justify-center items-center gap-8">
                        {sortButtons.map((sortBtn, index) => (
                            <li key={index}>
                                <button
                                    className={`relative bg-transparent border-none p-2 cursor-pointer text-[1.8rem]
                                ${
                                    activeSort === sortBtn.methodName
                                        ? "text-[#014210] font-semibold"
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
                    <div className="hidden lg_tab:block">
                        <div
                            className={`category relative flex items-center justify-between text-center cursor-pointer p-8 w-full rounded-lg transition-colors duration-300 text-4xl sm_desk:text-3xl ${
                                sortButtons.find(
                                    (btn) => btn.methodName === activeSort
                                )
                                    ? "active font-bold bg-[#e8f6e8] text-[#014210] "
                                    : "hover:bg-[#d0f4d0]"
                            } hover:font-semibold flex justify-center items-center gap-4 p-8`}
                        >
                            <>
                                {sortButtons.find(
                                    (btn) => btn.methodName === activeSort
                                )?.sortName || ""}
                            </>
                            <button
                                className="hidden lg_tab:block"
                                onClick={() =>
                                    setIsSortExpanded(!isSortExpanded)
                                }
                            >
                                {isSortExpanded ? (
                                    <ArrowDropUp
                                        style={{
                                            fontSize: "2.4rem",
                                        }}
                                    />
                                ) : (
                                    <ArrowDropDown
                                        style={{
                                            fontSize: "2.4rem",
                                        }}
                                    />
                                )}
                            </button>
                            {isSortExpanded && (
                                <ul className="sort-btns lg_tab:w-full lg_tab:flex lg_tab:flex-col lg_tab:absolute lg_tab:z-50 lg_tab:bg-white lg_tab:p-4 lg_tab:rounded-xl top-32 right-0 justify-center items-center gap-3">
                                    {sortButtons.map((sortBtn, index) => (
                                        <li key={index}>
                                            <button
                                                className={`relative bg-transparent border-none p-2 cursor-pointer w-full text-[1.8rem]
                                ${
                                    activeSort === sortBtn.methodName
                                        ? "text-[#014210] font-semibold"
                                        : ""
                                } group
                                `}
                                                onClick={() => {
                                                    setActiveSort(
                                                        sortBtn.methodName
                                                    );
                                                    setSortBy(
                                                        sortBtn.methodName
                                                    );
                                                    setIsSortExpanded(
                                                        !isSortExpanded
                                                    );
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
                            )}
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-bar w-[40vw] lg_tab:w-[80vw] tab:w-[55vw] sm_tab:w-full p-2 px-6 text-[1.8rem] border-2 border-[#014210] text-[#014210] bg-[#eee] rounded-lg shadow-md transition-all duration-1000 ease-in-out transform translate-x-[65%] sm_desk:translate-x-0 focus:border-[#560000] focus:outline-none focus:text-[#560000]"
                    />
                    {/* <Search style={{ fontSize: "3.6rem", color: "#014210" }} /> */}
                    {/* <button onClick={handleSearch} className="search-button">
                        <Search style={{ fontSize: "3.6rem", color: "#014210" }} />
                    </button> */}
                </div>
                <div className="products-section grid grid-cols-[1fr_4fr] lg_tab:flex lg_tab:flex-col items-start justify-center lg_tab:justify-start gap-8">
                    <ProductFilters
                        productFilters={productFilters}
                        selectedCategory={selectedCategory}
                        handleCategoryFilter={handleCategoryFilter}
                        isFilterExpanded={isFilterExpanded}
                        setIsFilterExpanded={setIsFilterExpanded}
                    />
                    <Products
                        productsList={sortedProducts}
                        loading={loading}
                        error={error}
                        userInfo={userInfo}
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
    isFilterExpanded,
    setIsFilterExpanded,
}) {
    return (
        <>
            <ul className="filters-list flex lg_tab:hidden flex-col items-center justify-center text-center p-8 gap-4 bg-[#eee] rounded-lg shadow-[2px_2px_8px_rgba(0,86,0,0.3)] mt-2">
                {productFilters.map((category) => (
                    <li
                        key={category}
                        className={`category block cursor-pointer text-[2rem] p-8 w-full rounded-lg shadow-[2px_2px_8px_rgba(0,86,0,0.3)] transition-all ease-in-out duration-1000 
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
            <div className="hidden lg_tab:flex lg_tab:flex-col lg_tab:items-center lg_tab:justify-center lg_tab:gap-12 lg_tab:p-8">
                <div
                    className={`category relative flex items-center justify-between text-center w-[30rem] cursor-pointer p-8 rounded-lg transition-colors duration-300 text-4xl sm_desk:text-3xl ${
                        selectedCategory.name
                            ? "active font-bold bg-[#eee] text-[#014210] "
                            : "hover:bg-[#d0f4d0]"
                    } hover:font-semibold flex justify-center items-center gap-4 p-8`}
                >
                    <>{selectedCategory}</>
                    <button
                        className="hidden lg_tab:block"
                        onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                    >
                        {isFilterExpanded ? (
                            <ArrowDropUp
                                style={{
                                    fontSize: "2.4rem",
                                }}
                            />
                        ) : (
                            <ArrowDropDown
                                style={{
                                    fontSize: "2.4rem",
                                }}
                            />
                        )}
                    </button>
                    {isFilterExpanded && (
                        <ul className="hidden lg_tab:flex lg_tab:flex-col lg_tab:absolute lg_tab:top-24 lg_tab:right-0 lg_tab:bg-[#eee] lg_tab:max-h-[80rem] lg_tab:z-[999] lg_tab:rounded-xl w-full items-center justify-center text-center gap-8 p-8">
                            {productFilters.map((category) => (
                                <li
                                    key={category}
                                    className={`category block cursor-pointer text-[2rem] p-8 w-full rounded-lg shadow-[2px_2px_8px_rgba(0,86,0,0.3)] transition-all ease-in-out duration-1000 
                ${
                    selectedCategory === category
                        ? "bg-[#e8f6e8] text-[#014210] font-bold border-2 border-[#014210]"
                        : "hover:bg-[#d0f4d0] hover:scale-105 hover:border-2 hover:border-[#014210]"
                }`}
                                    onClick={() =>
                                        handleCategoryFilter(category)
                                    }
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}

function Products({ productsList, loading, error, userInfo = {} }) {
    // if (!productsList.length) {
    //     return <div>No products found.</div>;
    // }
    const [viewProductForm, setViewProductForm] = useState(false);
    const toggleViewProductForm = () => {
        setViewProductForm(!viewProductForm);
    };
    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <Error message={error} />
            ) : (
                <>
                    <ul className="products-list grid grid-cols-4 sm_desk:grid-cols-3 tab:grid-cols-2 mob:grid-cols-1 items-center justify-center gap-y-0 sm_tab:gap-x-10 sm_tab:-ml-8 mob:ml-0">
                        {productsList.map((product) => {
                            return (
                                <li key={product.id}>
                                    <ProductCard
                                        product={product}
                                        userInfo={userInfo}
                                    />
                                </li>
                            );
                        })}
                        {userInfo.isAdmin && (
                            <li>
                                <div
                                    className="product-card cursor-pointer p-2 h-[65rem] flex flex-col items-center justify-center gap-8 rounded-lg shadow-[5px_5px_10px_rgba(83,0,0,0.3)] border-2 border-dashed transition-all ease-in-out duration-1000 bg-[#eee] relative text-[#014210] hover:border-solid border-[#014210] hover:scale-105"
                                    onClick={toggleViewProductForm}
                                >
                                    <AddCircle
                                        style={{
                                            fontSize: "6.4rem",
                                            color: "#014210",
                                        }}
                                    />
                                    <h2 className="font-semibold text-5xl text-[#014210]">
                                        Add New Product
                                    </h2>
                                </div>
                                {viewProductForm && (
                                    <div
                                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                                        onClick={toggleViewProductForm}
                                    >
                                        <div
                                            className="relative w-11/12 max-w-4xl bg-[#e4efe4] rounded-lg p-8 overflow-auto"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <ProductForm
                                                route="/api/products/add"
                                                method="addProduct"
                                                handleProductFormToggle={
                                                    toggleViewProductForm
                                                }
                                            />
                                        </div>
                                    </div>
                                    // <ProductForm
                                    //     method="addProduct"
                                    //     handleProductFormToggle={
                                    //         toggleViewProductForm
                                    //     }
                                    //     isViewProductFormOpen={viewProductForm}
                                    // />
                                )}
                            </li>
                        )}
                    </ul>
                </>
            )}
        </>
    );
}

function ProductCard({ product, userInfo }) {
    const {
        productName,
        productBrand,
        productImage,
        productPrice,
        productRating,
        productCategories,
        productDescription,
        productNumReviews,
        productStockCount,
        createdAT,
    } = product;

    return (
        <Link
            to={`/product/${product.id}`}
            element
            className="detail-btn inline-flex text-[#014210] p-2 text-center font-normal border-none outline-none hover:bg-[#014210] hover:border-none hover:outline-none hover:text-white transition-all ease duration-500"
        >
            <div className="product-card flex flex-col items-start justify-center rounded-lg shadow-[5px_5px_10px_rgba(83,0,0,0.3)] transition-all ease-in-out duration-1000 bg-[#eee] relative text-[#014210] hover:border-2 hover:border-[#014210] hover:scale-105 hover:shadow-[5px_5px_10px_rgba(1,66,16,0.3)] hover:bg-white hover:z-50">
                <div className="img-container w-[100%] sm_tab:mx-auto sm_tab:px-auto mob:w-[100%] rounded-t-lg overflow-hidden">
                    {!productStockCount ? (
                        <Tags
                            tagData="Out of Stock"
                            tagColor="#fff"
                            tagBackgroundColor="#fb2d2d"
                        />
                    ) : productStockCount < 50 ? (
                        <Tags
                            tagData="Only few left"
                            tagColor="#fff"
                            tagBackgroundColor="#ff8811"
                        />
                    ) : (
                        ""
                    )}
                    <img
                        src={productImage}
                        alt={productName}
                        className="product-img w-full"
                    />
                </div>
                {userInfo.isAdmin && (
                    <>
                        <div className="flex self-end items-center justify-center">
                            <button>
                                <Edit
                                    style={{
                                        fontSize: "3.2rem",
                                        color: "#560000",
                                    }}
                                />
                            </button>
                            <button>
                                <Delete
                                    style={{
                                        fontSize: "3.2rem",
                                        color: "#560000",
                                    }}
                                />
                            </button>
                        </div>
                        <div className="admin-product-btns flex flex-col items-center justify-center gap-4">
                            <h3 className="px-4 self-start text-2xl font-semibold text-[#560000] text-left">
                                Added on:{" "}
                                {new Date(createdAT).toLocaleString("en-US", {
                                    weekday: "short",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
                            </h3>

                            <h3 className="px-4 self-start text-2xl font-semibold text-[#560000] text-left">
                                Stock Count: {productStockCount}
                            </h3>
                        </div>
                    </>
                )}
                <ul className="product-category-list flex flex-wrap items-center justify-start gap-2 mt-2 p-2">
                    {(productCategories || []).map((category) => {
                        return (
                            <li
                                className="category-item rounded-lg text-2xl font-bold bg-[#560000] text-white p-2 text-center"
                                key={category}
                            >
                                {category}
                            </li>
                        );
                    })}
                </ul>
                <div className="product-info flex flex-col items-start justify-start h-[20rem] p-4 gap-4">
                    <h4 className="product-brand text-left text-[#560000] text-3xl font-extrabold">
                        {productBrand}
                    </h4>
                    <h3 className="product-name text-left font-medium text-4xl">
                        {productName}
                    </h3>
                    <div className=" flex items-center justify-start gap-40">
                        <h3 className="product-price font-bold text-[2.4rem]">
                            ₹ {productPrice}
                        </h3>
                        {/* <InfoOutlined style={{ fontSize: "2.4rem" }} className="info-icon" /> */}
                        <div className="rating flex items-center justify-center gap-2 text-[#560000] rounded-[4rem] font-semibold text-[1.8rem]">
                            <h3>{productRating}</h3>
                            <Star
                                style={{
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    fontSize: "2.4rem",
                                }}
                            />
                            <>{` (${productNumReviews})`}</>
                            {/* {`from ${numReviews} reviews`} */}
                        </div>
                    </div>
                    <p className="product-desc text-[1.8rem] text-left text-[#560000] overflow-hidden w-[32rem] whitespace-nowrap text-ellipsis">
                        {productDescription}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default Store;
