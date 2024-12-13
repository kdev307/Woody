import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { ArrowDropDown, ArrowDropUp, East } from "@mui/icons-material";

function Categories() {
    const categoriesData = [
        {
            name: "Bedroom",
            images: [
                "/images/category/bed1.jpg",
                "/images/category/bed2.jpg",
                "/images/category/bed3.jpg",
                "/images/category/bed4.jpg",
                "/images/category/bed5.jpg",
                "/images/category/bed6.jpg",
                "/images/category/bed7.jpg",
                "/images/category/bed8.jpg",
            ],
        },
        {
            name: "Baby Room",
            images: [
                "/images/category/baby1.jpg",
                "/images/category/baby2.jpg",
                "/images/category/baby3.jpg",
                "/images/category/baby4.jpg",
                "/images/category/baby5.jpg",
                "/images/category/baby6.jpg",
                "/images/category/baby7.jpg",
                "/images/category/baby8.jpg",
            ],
        },
        {
            name: "Dining Room",
            images: [
                "/images/category/dining1.jpg",
                "/images/category/dining2.jpg",
                "/images/category/dining3.jpg",
                "/images/category/dining4.jpg",
                "/images/category/dining5.jpg",
                "/images/category/dining6.jpg",
                "/images/category/dining7.jpg",
                "/images/category/dining8.jpg",
            ],
        },
        {
            name: "Outdoor",
            images: [
                "/images/category/outdoor1.jpg",
                "/images/category/outdoor2.jpg",
                "/images/category/outdoor3.jpg",
                "/images/category/outdoor4.jpg",
                "/images/category/outdoor5.jpg",
                "/images/category/outdoor6.jpg",
                "/images/category/outdoor7.jpg",
                "/images/category/outdoor8.jpg",
            ],
        },
        {
            name: "Living Room",
            images: [
                "/images/category/living1.jpg",
                "/images/category/living2.jpg",
                "/images/category/living3.jpg",
                "/images/category/living4.jpg",
                "/images/category/living5.jpg",
                "/images/category/living6.jpg",
                "/images/category/living7.jpg",
                "/images/category/living8.jpg",
            ],
        },
        {
            name: "Workspace",
            images: [
                "/images/category/office1.jpg",
                "/images/category/office2.jpg",
                "/images/category/office3.jpg",
                "/images/category/office4.jpg",
                "/images/category/office5.jpg",
                "/images/category/office6.jpg",
                "/images/category/office7.jpg",
                "/images/category/office8.jpg",
            ],
        },
    ];

    const [selectedCategory, setSelectedCategory] = useState(categoriesData[0]);
    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        setLoading(true);
        setIsExpanded(!isExpanded);
    };

    const handleImageLoad = () => {
        setLoading((prevLoading) => prevLoading - 1);
    };
    useEffect(() => {
        // if (selectedCategory.images.length === 0) return;
        setLoading(selectedCategory.images.length);
    }, [selectedCategory]);

    return (
        <>
            <div
                className="categories-section bg-white p-8 mt-14"
                id="categories"
            >
                <h2 className="sub-heading text-6xl font-bold text-center mb-20 sm_tab:text-[3.6rem]">
                    Explore By Category
                </h2>
                <div className="category-container grid grid-cols-[1fr_4fr] lg_tab:grid-cols-[1.2fr_3.8fr] tab:grid-cols-[1.5fr_3.5fr] sm_tab:grid-cols-[2fr_3fr] sm_tab:flex sm_tab:flex-col-reverse items-start justify-center gap-10 lg_tab:gap-0">
                    <ul className="category-options flex flex-col sm_tab:hidden items-center justify-center text-center p-8 gap-8">
                        {categoriesData.map((category) => {
                            return (
                                <li
                                    key={category.name}
                                    className={`category flex items-center justify-between text-center cursor-pointer p-8 w-full rounded-lg transition-colors duration-300 text-4xl sm_desk:text-3xl ${
                                        selectedCategory.name === category.name
                                            ? "active font-bold bg-[#e8f6e8] text-[#014210] "
                                            : "hover:bg-[#d0f4d0]"
                                    } hover:font-semibold`}
                                    onClick={() =>
                                        handleCategoryFilter(category)
                                    }
                                >
                                    {category.name}
                                </li>
                            );
                        })}

                        <Link
                            to="/store"
                            className="category-btn flex justify-center items-center gap-4 p-8 bg-[#dfd] text-[#014210] font-bold w-full rounded-lg text-4xl sm_desk:text-3xl shadow-[5px_5px_10px_rgba(1,66,16,0.3)] hover:bg-[#f2d3bdc6] hover:text-[#560000] shadow-[5px_5px_10px_rgba(86, 0, 0, 0.3)] duration-300"
                        >
                            <>All Categories</>
                            <East
                                style={{
                                    fontSize: "2.4rem",
                                }}
                            />
                        </Link>
                    </ul>
                    <div className="hidden sm_tab:flex sm_tab:flex-col sm_tab:w-full sm_tab:items-center sm_tab:justify-center sm_tab:gap-12 sm_tab:p-8">
                        <div
                            className={`category relative flex items-center justify-between text-center cursor-pointer p-8 w-full rounded-lg transition-colors duration-300 text-4xl sm_desk:text-3xl ${
                                selectedCategory.name
                                    ? "active font-bold bg-[#e8f6e8] text-[#014210] "
                                    : "hover:bg-[#d0f4d0]"
                            } hover:font-semibold flex justify-center items-center gap-4 p-8`}
                        >
                            <>{selectedCategory.name}</>
                            <button
                                className="hidden sm_tab:block"
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {isExpanded ? (
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
                            {isExpanded && (
                                <ul className="hidden sm_tab:flex sm_tab:flex-col sm_tab:absolute sm_tab:top-32 sm_tab:right-0 sm_tab:bg-[#fff] sm_tab:max-h-[50rem] sm_tab:z-[999] sm_tab:rounded-xl w-full items-center justify-center text-center gap-8">
                                    {categoriesData.map((category) => {
                                        return (
                                            <li
                                                key={category.name}
                                                className={`category flex items-center justify-between text-center cursor-pointer p-8 w-full rounded-lg transition-colors duration-300 text-4xl sm_desk:text-3xl ${
                                                    selectedCategory.name ===
                                                    category.name
                                                        ? "active font-bold bg-[#e8f6e8] text-[#014210] "
                                                        : "hover:bg-[#d0f4d0]"
                                                } hover:font-semibold`}
                                                onClick={() =>
                                                    handleCategoryFilter(
                                                        category
                                                    )
                                                }
                                            >
                                                <>{category.name}</>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                        <Link
                            to="/store"
                            className="category-btn flex justify-center items-center text-center gap-4 p-8 bg-[#dfd] text-[#014210] font-bold w-full rounded-lg text-4xl sm_desk:text-3xl shadow-[5px_5px_10px_rgba(1,66,16,0.3)] hover:bg-[#f2d3bdc6] hover:text-[#560000] shadow-[5px_5px_10px_rgba(86, 0, 0, 0.3)] duration-300"
                        >
                            <>All Categories</>
                            <East
                                style={{
                                    fontSize: "2.4rem",
                                }}
                            />
                        </Link>
                    </div>
                    {loading > 0 && (
                        <div className="category-images scrollbar p-8 m-auto grid grid-cols-1 items-center justify-center gap-y-10 max-h-[38rem]">
                            <Loader />
                        </div>
                    )}
                    <div
                        className={`category-images scrollbar p-8 grid grid-cols-2 tab:grid-cols-1 sm_tab:max-h-[36rem] items-center justify-center max-h-[60rem] overflow-y-scroll ${
                            loading > 0 ? "hidden" : ""
                        }`}
                    >
                        {selectedCategory.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={selectedCategory.name}
                                onLoad={handleImageLoad}
                                className="w-[90%] h-[85%] lg_tab:w-[95%] tab:h-[75%] m-auto rounded-lg transition-all duration-1000 hover:scale-110 shadow-[5px_5px_10px_rgba(86,0,0,0.3)] hover:shadow-[5px_5px_10px_rgba(1,66,16,0.3)]"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Categories;
