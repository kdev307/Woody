import React from "react";
import PopularProductCard from "./PopularProductCard";
import ImageLayout from "./ImageLayout";
import "../styles/common.css";
import "../styles/popularProduct.css";

function PopularProduct() {
    const slides = [
        {
            content: (
                <div className="slide-container slide1">
                    {/* <div className="pl-box"> */}
                    <ImageLayout
                        imgPath={`/images/popular-products/bed1.png`}
                        imgAlt={`Medium Brown Bed Frame with 2 Storage Boxes`}
                        imgPrice={13500}
                        height="12rem"
                        width="25rem"
                        className="bed1"
                        backgroundColor=""
                        color=""
                    />
                    <ImageLayout
                        imgPath={`/images/popular-products/table.png`}
                        imgAlt={`Black-Brown Desk`}
                        imgPrice={3200}
                        height="12rem"
                        width="12rem"
                        className="table"
                        backgroundColor=""
                        color=""
                    />
                    <ImageLayout
                        imgPath={`/images/popular-products/chair3.png`}
                        imgAlt={`Brown-Black Chair`}
                        imgPrice={2500}
                        height="12rem"
                        width="12rem"
                        className="chair3"
                        backgroundColor=""
                        color=""
                    />
                    {/* </div> */}
                    {/* <div className="pl-box"> */}
                    <ImageLayout
                        imgPath={`/images/popular-products/chair2.png`}
                        imgAlt={`Gunnared Light Green Armchair`}
                        imgPrice={9500}
                        height="12rem"
                        width="12rem"
                        className="chair2"
                        backgroundColor=""
                        color=""
                    />
                    <ImageLayout
                        imgPath={`/images/popular-products/nursery.png`}
                        imgAlt={`White Baby Cot Baby Bed`}
                        imgPrice={8000}
                        height="12rem"
                        width="12rem"
                        className="nursery"
                        backgroundColor=""
                        color=""
                    />
                    <ImageLayout
                        imgPath={`/images/popular-products/sofa2.png`}
                        imgAlt={`Grey 3-seater Sofa`}
                        imgPrice={18500}
                        height="12rem"
                        width="25rem"
                        className="sofa1"
                        backgroundColor=""
                        color=""
                    />
                    {/* </div> */}
                </div>
            ),
        },
        {
            content: (
                <div className="slide-container slide2">
                    <ImageLayout
                        imgPath={`/images/popular-products/wardrobe.png`}
                        imgAlt={`White Stained Oak Wardrobe`}
                        imgPrice={18000}
                        height="30rem"
                        width="12rem"
                        className="wardrobe"
                        backgroundColor=""
                        color=""
                    />
                    <ImageLayout
                        imgPath={`/images/popular-products/dining2.png`}
                        imgAlt={`Gunnared Brown-Grey 8-seater Dining Set`}
                        imgPrice={100000}
                        height="12rem"
                        width="25rem"
                        className="dining2"
                        backgroundColor=""
                        color=""
                    />
                    {/* <ImageLayout
                        imgPath={`/images/popular-products/chair1.png`}
                        imgAlt={``}
                        imgPrice={}
                        height="12rem"
                        width="12rem"
                        className="chair1"
                        backgroundColor=""
                        color=""
                    />
                    <ImageLayout
                        imgPath={`/images/popular-products/drawer.png`}
                        imgAlt={``}
                        imgPrice={}
                        height="12rem"
                        width="12rem"
                        className="drawer"
                        backgroundColor=""
                        color=""
                    /> */}
                    <ImageLayout
                        imgPath={`/images/popular-products/sofa4.png`}
                        imgAlt={`6-seat Modular Sofa with Side Table`}
                        imgPrice={95000}
                        height="12rem"
                        width="25rem"
                        className="sofa2"
                        backgroundColor=""
                        color=""
                    />
                    <ImageLayout
                        imgPath={`/images/popular-products/workstation.png`}
                        imgAlt={`Black-Brown Corner Workstation`}
                        imgPrice={12000}
                        height="30rem"
                        width="12rem"
                        className="workstation"
                        backgroundColor=""
                        color=""
                    />
                </div>
            ),
        },
        {
            content: (
                <div className="slide-container slide3">
                    <ImageLayout
                        imgPath={`/images/popular-products/cabinet.png`}
                        imgAlt={`Brown Walnut Bookcase with Glass Door`}
                        imgPrice={8000}
                        height="30rem"
                        width="12rem"
                        className="cabinet"
                        backgroundColor=""
                        color=""
                    />
                    <ImageLayout
                        imgPath={`/images/popular-products/kidTable.png`}
                        imgAlt={`White Children's Table`}
                        imgPrice={2500}
                        height="12rem"
                        width="12rem"
                        className="kidTable"
                        backgroundColor=""
                        color=""
                    />
                    <ImageLayout
                        imgPath={`/images/popular-products/tvUnit.png`}
                        imgAlt={`Black-Brown Oak TV Bench with Storage`}
                        imgPrice={19000}
                        height="12rem"
                        width="25rem"
                        className="tvUnit"
                        backgroundColor=""
                        color=""
                    />
                    <ImageLayout
                        imgPath={`/images/popular-products/kidChair.png`}
                        imgAlt={`White Children's Chair`}
                        imgPrice={1300}
                        height="12rem"
                        width="12rem"
                        className="kidChair"
                        backgroundColor=""
                        color=""
                    />
                    <ImageLayout
                        imgPath={`/images/popular-products/bed2.png`}
                        imgAlt={`Tallmyra Black-Blue Bed Frame`}
                        imgPrice={49000}
                        height="12rem"
                        width="25rem"
                        className="bed2"
                        backgroundColor=""
                        color=""
                    />
                </div>
            ),
        },
        {
            content: (
                <div className="slide-container slide4">
                    {/* <ImageLayout
                        imgPath={`/images/popular-products/sofa3.png`}
                        imgAlt={``}
                        imgPrice={}
                        height="12rem"
                        width="25rem"
                        className="sofa3"
                        backgroundColor=""
                        color=""
                    />
                    <ImageLayout
                        imgPath={`/images/popular-products/sofa4.png`}
                        imgAlt={``}
                        imgPrice={}
                        height="12rem"
                        width="25rem"
                        className="sofa4"
                        backgroundColor=""
                        color=""
                    /> */}
                    <ImageLayout
                        imgPath={`/images/popular-products/dining1.png`}
                        imgAlt={`Brown/Orista Light Grey 4-seater Dining Set`}
                        imgPrice={43000}
                        height="12rem"
                        width="25rem"
                        className="dining1"
                        backgroundColor=""
                        color=""
                    />
                    <ImageLayout
                        imgPath={`/images/popular-products/outdoorDining.png`}
                        imgAlt={`Stained Brown Outdoor Dining Set`}
                        imgPrice={27000}
                        height="12rem"
                        width="25rem"
                        className="outdoorDining"
                        backgroundColor=""
                        color=""
                    />
                    <ImageLayout
                        imgPath={`/images/popular-products/chair1.png`}
                        imgAlt={`Gunnared Black-Grey Wing Chair`}
                        imgPrice={25000}
                        height="12rem"
                        width="12rem"
                        className="chair1"
                        backgroundColor=""
                        color=""
                    />
                    <ImageLayout
                        imgPath={`/images/popular-products/drawer.png`}
                        imgAlt={`Black-Brown Chest of 6-drawers`}
                        imgPrice={12000}
                        height="12rem"
                        width="12rem"
                        className="drawer"
                        backgroundColor=""
                        color=""
                    />
                    <ImageLayout
                        imgPath={`/images/popular-products/outdoorChair.png`}
                        imgAlt={`Brown Beige Sun Lounger`}
                        imgPrice={15000}
                        height="12rem"
                        width="25rem"
                        className="outdoorChair"
                        backgroundColor=""
                        color=""
                    />
                </div>
            ),
        },
    ];
    return (
        <>
            <div className="popular-products">
                <h2 className="sub-heading">Popular Products</h2>
                <div className="product-carousel-container">
                    {/* <PopularProductCard countImages={6} />
                    <PopularProductCard countImages={4} />
                    <PopularProductCard countImages={5} /> */}
                    <PopularProductCard slides={slides} />
                </div>
                <button className="popular-btn">Go to Store</button>
            </div>
        </>
    );
}

export default PopularProduct;
