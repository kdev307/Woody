import React from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import Tags from "./Tags";

function PopularProduct() {
    const products = [
        {
            imgPath: "/images/popular-products/tvUnit.png",
            imgBrandName: "BESTÅ",
            imgName: "Black-Brown Oak TV Bench with Storage",
            price: 19000,
            bestseller: false,
            sale: false,
            newArrivals: false,
            limited: false,
            exclusive: false,
            trending: false,
        },
        {
            imgPath: "/images/popular-products/dining2.png",
            imgBrandName: "STRANDTORP / BERGMUND",
            imgName: "Gunnared Brown-Grey 8-seater Dining Set",
            price: 100000,
            bestseller: false,
            sale: false,
            newArrivals: false,
            limited: true,
            exclusive: false,
            trending: false,
        },

        {
            imgPath: "/images/popular-products/wardrobe.png",
            imgBrandName: "PAX / FORSAND",
            imgName: "White Stained Oak Wardrobe",
            price: 18000,
            bestseller: false,
            sale: true,
            newArrivals: false,
            limited: false,
            exclusive: false,
            trending: false,
        },
        {
            imgPath: "/images/popular-products/outdoorDining.png",
            imgBrandName: "NÄMMARÖ",
            imgName: "Stained Brown Outdoor Dining Set",
            price: 27000,
            bestseller: false,
            sale: false,
            newArrivals: false,
            limited: false,
            exclusive: false,
            trending: false,
        },
        {
            imgPath: "/images/popular-products/nursery.png",
            imgBrandName: "SMÅGÖRA",
            imgName: "White Baby Cot Baby Bed",
            price: 8000,
            bestseller: false,
            sale: false,
            newArrivals: false,
            limited: false,
            exclusive: false,
            trending: false,
        },
        {
            imgPath: "/images/popular-products/bed.png",
            imgBrandName: "TUFJORD",
            imgName: "Tallmyra Black-Blue Bed Frame",
            price: 49000,
            bestseller: true,
            sale: false,
            newArrivals: false,
            limited: false,
            exclusive: false,
            trending: false,
        },
        {
            imgPath: "/images/popular-products/sofa2.png",
            imgBrandName: "GAMMALBYN",
            imgName: "Gunarred Grey 3-seater Sofa",
            price: 18500,
            bestseller: false,
            sale: true,
            newArrivals: false,
            limited: false,
            exclusive: false,
            trending: false,
        },
        {
            imgPath: "/images/popular-products/workstation.png",
            imgBrandName: "MICKE",
            imgName: "Black-Brown Corner Workstation",
            price: 12000,
            bestseller: false,
            sale: false,
            newArrivals: true,
            limited: false,
            exclusive: false,
            trending: false,
        },
        {
            imgPath: "/images/popular-products/cabinet.png",
            imgBrandName: "BILLY / OXBERG",
            imgName: "Brown Walnut Bookcase with Glass Door",
            price: 8000,
            bestseller: false,
            sale: false,
            newArrivals: false,
            limited: false,
            exclusive: false,
            trending: false,
        },
        {
            imgPath: "/images/popular-products/kid.png",
            imgBrandName: "SUNDVIK",
            imgName: "Children's White Table and Chair",
            price: 4000,
            bestseller: false,
            sale: false,
            newArrivals: false,
            limited: false,
            exclusive: false,
            trending: false,
        },
        {
            imgPath: "/images/popular-products/sofa1.png",
            imgBrandName: "LILLEHEM",
            imgName: "6-seat Modular Sofa with Side Table",
            price: 95000,
            bestseller: false,
            sale: false,
            newArrivals: false,
            limited: false,
            exclusive: true,
            trending: false,
        },
        {
            imgPath: "/images/popular-products/chair1.png",
            imgBrandName: "POÄNG",
            imgName: "Gunnared Light Green Armchair",
            price: 15000,
            bestseller: false,
            sale: false,
            newArrivals: false,
            limited: false,
            exclusive: false,
            trending: false,
        },

        {
            imgPath: "/images/popular-products/chair2.png",
            imgBrandName: "OSKARSHAMN",
            imgName: "Gunnared Black-Grey Wing Chair",
            price: 25000,
            bestseller: false,
            sale: false,
            newArrivals: false,
            limited: false,
            exclusive: false,
            trending: false,
        },
        {
            imgPath: "/images/popular-products/drawer.png",
            imgBrandName: "MALM",
            imgName: "Black-Brown Chest of 6-drawers",
            price: 12000,
            bestseller: true,
            sale: false,
            newArrivals: false,
            limited: false,
            exclusive: false,
            trending: false,
        },
        {
            imgPath: "/images/popular-products/dining1.png",
            imgBrandName: "EKEDALEN",
            imgName: "Brown/Orista Light Grey 4-seater Dining Set",
            price: 43000,
            bestseller: true,
            sale: false,
            newArrivals: false,
            limited: false,
            exclusive: false,
            trending: false,
        },

        {
            imgPath: "/images/popular-products/outdoorChair.png",
            imgBrandName: "NÄMMARÖ",
            imgName: "Brown Beige Sun Lounger",
            price: 15000,
            bestseller: false,
            sale: false,
            newArrivals: false,
            limited: false,
            exclusive: false,
            trending: false,
        },
    ];

    return (
        <>
            <div className="popular-products-section m-auto bg-custom-gradient p-8 mt-12 flex flex-col items-center justify-center">
                <h2 className="sub-heading text-2xl font-semibold text-center mb-6 py-6">
                    Popular Products
                </h2>
                <div className="overflow-hidden w-5/6 mx-auto relative ">
                    <Marquee
                        speed={120}
                        pauseOnHover={true}
                        gradient={false}
                        direction="right"
                        autoFill={true}
                    >
                        <div className="flex items-center whitespace-nowrap gap-6 p-2">
                            {products
                                .filter((_, index) => index % 2 === 1)
                                .map((product, index) => (
                                    <PopularProductCard
                                        key={index}
                                        imgPath={product.imgPath}
                                        imgBrandName={product.imgBrandName}
                                        imgName={product.imgName}
                                        imgPrice={product.price}
                                        isBestSeller={product.bestseller}
                                        isOnSale={product.sale}
                                        isTrending={product.trending}
                                        isNew={product.newArrivals}
                                        isExclusive={product.exclusive}
                                        isLimited={product.limited}
                                        bgColor="#560000"
                                    />
                                ))}
                        </div>
                    </Marquee>
                    <br />
                    <Marquee
                        speed={120}
                        pauseOnHover={true}
                        gradient={false}
                        direction="left"
                        autoFill={true}
                    >
                        <div className="flex items-center whitespace-nowrap gap-6 p-2">
                            {products
                                .filter((_, index) => index % 2 === 0)
                                .map((product, index) => (
                                    <PopularProductCard
                                        key={index}
                                        imgPath={product.imgPath}
                                        imgBrandName={product.imgBrandName}
                                        imgName={product.imgName}
                                        imgPrice={product.price}
                                        isBestSeller={product.bestseller}
                                        isOnSale={product.sale}
                                        isTrending={product.trending}
                                        isNew={product.newArrivals}
                                        isExclusive={product.exclusive}
                                        isLimited={product.limited}
                                        bgColor="#014210"
                                    />
                                ))}
                        </div>
                    </Marquee>
                </div>
                <Link
                    to="/store"
                    className="popular-btn mt-12 text-center text-xl rounded-full px-auto border-2 font-bold text-[#014210] border-[#014210] shadow-[5px_5px_10px_rgba(1,66,16,0.3)] hover:text-[#560000] hover:border-[#560000] hover:shadow-[5px_5px_10px_rgba(86,0,0,0.3)] p-2 transition-all-ease duration-300"
                >
                    Go to Store
                </Link>
            </div>
        </>
    );
}

function PopularProductCard({
    imgPath,
    imgBrandName,
    imgName,
    imgPrice,
    isBestSeller,
    isExclusive,
    isLimited,
    isNew,
    isOnSale,
    isTrending,
    bgColor,
}) {
    return (
        <div className="image-layout-card w-96 h-96 border-[#560000] rounded-xl shadow-[5px_5px_10px_rgba(0,0,0,0.3)] flex-shrink-0 relative group overflow-hidden">
            {isBestSeller && (
                <Tags
                    tagData="BestSeller"
                    tagColor="#000"
                    tagBackgroundColor="#ffd700"
                />
            )}
            {isExclusive && (
                <Tags
                    tagData="Exclusive"
                    tagColor="#fff"
                    tagBackgroundColor="#036"
                />
            )}
            {isLimited && (
                <Tags
                    tagData="Limited"
                    tagColor="#fff"
                    tagBackgroundColor="#f00"
                />
            )}
            {isNew && (
                <Tags
                    tagData="New Arrivals"
                    tagColor="#2f4f4f"
                    tagBackgroundColor="#add8e6"
                />
            )}
            {isOnSale && (
                <Tags
                    tagData="Sale"
                    tagColor="#fff"
                    tagBackgroundColor="#28a745"
                />
            )}
            {isTrending && (
                <Tags
                    tagData="Trending"
                    tagColor="#000"
                    tagBackgroundColor="#ff1493"
                />
            )}
            <img
                src={imgPath}
                alt={imgName}
                className="rounded-xl object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
            <div
                className={`absolute bottom-0 left-0 w-full bg-[#014210] bg-opacity-50 text-white p-4 transform translate-y-full transition-transform duration-500 group-hover:translate-y-0 bg-[${bgColor}]`}
            >
                <h4 className="text-lg font-extrabold text-[#e8e7e7]">
                    {imgBrandName}
                </h4>
                <h3 className="img-title m-0 p-2 font-semibold text-2xl break-words whitespace-normal">
                    {imgName}
                </h3>
                <h2 className="img-price m-0 p-2 text-3xl font-extrabold text-white">
                    ₹ {imgPrice}
                </h2>
            </div>
        </div>
    );
}

export default PopularProduct;
