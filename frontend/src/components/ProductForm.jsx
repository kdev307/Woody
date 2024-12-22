import { Add, Close, Edit } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct, listProducts } from "../actions/productActions";

function ProductForm({ method, handleProductFormToggle }) {
    const title = method === "addProduct" ? "Add Product" : "Edit Product";
    const icon =
        method === "addProduct" ? (
            <Add style={{ fontSize: "3.6rem" }} />
        ) : (
            <Edit style={{ fontSize: "3.6rem" }} />
        );

    const [productBrand, setProductBrand] = useState("");
    const [productName, setProductName] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [productCategories, setProductCategories] = useState({
        Accessories: false,
        Bedroom: false,
        "Dining Room": false,
        Hallway: false,
        "Kid Room": false,
        "Living Room": false,
        Outdoor: false,
        Storage: false,
        Workspace: false,
    });
    const [productDescription, setProductDescription] = useState("");
    const [productSpecifications, setProductSpecifications] = useState("");
    const [productReviews, setProductReviews] = useState("");
    const [productRating, setProductRating] = useState(0.0);
    const [productNumReviews, setProductNumReviews] = useState(0);
    const [productPrice, setProductPrice] = useState(0);
    const [productStockCount, setProductStockCount] = useState(0);

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        setProductCategories((prevState) => ({
            ...prevState,
            [id]: checked,
        }));
    };

    const handleImageChange = (event) => {
        setProductImage(event.target.files[0]);
    };
    const dispatch = useDispatch();
    async function handleProductDataSubmit(e) {
        e.preventDefault();
        const selectedCategories = Object.keys(productCategories).filter(
            (category) => productCategories[category] === true
        );

        const formData = new FormData();
        formData.append("productBrand", productBrand);
        formData.append("productName", productName);
        formData.append("productDescription", productDescription);
        formData.append("productSpecifications", productSpecifications);
        formData.append("productReviews", productReviews);
        formData.append("productRating", parseFloat(productRating).toFixed(1));
        formData.append("productNumReviews", parseInt(productNumReviews, 10));
        formData.append("productPrice", parseFloat(productPrice).toFixed(2));
        formData.append("productStockCount", parseInt(productStockCount, 10));
        formData.append(
            "productCategories",
            JSON.stringify(selectedCategories)
        );
        formData.append("productImage", productImage);
        console.log("Form Inputs: " + [...formData]);
        dispatch(createProduct(formData));
        handleProductFormToggle();
        dispatch(listProducts());
    }

    return (
        <div className="product-form-container p-6 ">
            <div className="pt-12 flex items-center justify-end">
                <Close
                    className="cart-close-btn cursor-pointer text-[#014210] text-4xl absolute top-8 right-20"
                    style={{ fontSize: "3.6rem" }}
                    onClick={() => {
                        handleProductFormToggle();
                    }}
                />
            </div>
            <h1 className="product-form-title flex items-center justify-center gap-4 text-7xl text-center text-[#014210] font-bold">
                {title}
            </h1>
            <form
                className="form-container flex flex-col p-4 gap-8 items-center justify-center text-left rounded-2xl"
                onSubmit={handleProductDataSubmit}
            >
                <div className="form-inputs max-h-[60rem] overflow-y-scroll scrollbar w-full mx-auto p-8">
                    <input
                        type="text"
                        name="productBrand"
                        id="productBrand"
                        className="form-input w-full p-6 text-[1.8rem] my-8 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                        value={productBrand}
                        onChange={(e) => setProductBrand(e.target.value)}
                        placeholder="Enter Product Brand"
                        required
                    />
                    <input
                        type="text"
                        name="productName"
                        id="productName"
                        className="form-input w-full p-6 text-[1.8rem] my-8 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter Product Name"
                        required
                    />
                    <div className="categories grid grid-cols-3 gap-12 items-center justify-center p-4">
                        {Object.keys(productCategories).map((category) => (
                            <label
                                key={category}
                                htmlFor={category}
                                className="flex items-center space-x-2"
                            >
                                <input
                                    type="checkbox"
                                    id={category}
                                    name="categories"
                                    checked={productCategories[category]}
                                    onChange={handleCheckboxChange}
                                    className="form-checkbox w-8 h-8 text-[#014210] checked:bg-[#014210] border-[#ccc] checked:border-[#014210]"
                                />
                                <span className="text-[1.5rem] capitalize">
                                    {category.replace(/([A-Z])/g, " $1")}
                                </span>
                            </label>
                        ))}
                    </div>
                    <textarea
                        name="productDescription"
                        id="productDescription"
                        className="form-input w-full p-6 text-[1.8rem] my-8 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        placeholder="Enter Product Description"
                        required
                    ></textarea>
                    <textarea
                        name="productSpecifications"
                        id="productSpecifications"
                        className="form-input w-full p-6 text-[1.8rem] my-8 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                        value={productSpecifications}
                        onChange={(e) =>
                            setProductSpecifications(e.target.value)
                        }
                        placeholder="Enter Product Specifications"
                        required
                    ></textarea>
                    <textarea
                        name="productReviews"
                        id="productReviews"
                        className="form-input w-full p-6 text-[1.8rem] my-8 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                        value={productReviews}
                        onChange={(e) => setProductReviews(e.target.value)}
                        placeholder="Enter Product Reviews"
                        required
                    ></textarea>
                    <div className="flex items-center justify-center gap-2">
                        <input
                            type="number"
                            name="productPrice"
                            id="productPrice"
                            className="form-input w-full p-6 text-[1.8rem] my-8 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                            value={productPrice}
                            onChange={(e) =>
                                setProductPrice(parseInt(e.target.value))
                            }
                            placeholder="Enter Product Price (in ₹)"
                            required
                        />
                        <input
                            type="number"
                            name="productRating"
                            id="productRating"
                            className="form-input w-full p-6 text-[1.8rem] my-8 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                            value={productRating}
                            onChange={(e) =>
                                setProductRating(parseFloat(e.target.value))
                            }
                            placeholder="Enter Product Rating"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <input
                            type="number"
                            name="productNumReviews"
                            id="productNumReviews"
                            className="form-input w-full p-6 text-[1.8rem] my-8 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                            value={productNumReviews}
                            onChange={(e) =>
                                setProductNumReviews(parseInt(e.target.value))
                            }
                            placeholder="Enter Product Number of Reviews"
                            required
                        />
                        <input
                            type="number"
                            name="productStockCount"
                            id="productStockCount"
                            className="form-input w-full p-6 text-[1.8rem] my-8 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                            value={productStockCount}
                            onChange={(e) =>
                                setProductStockCount(parseInt(e.target.value))
                            }
                            placeholder="Enter Product Stock Count"
                            required
                        />
                    </div>
                    <input
                        type="file"
                        alt="productImage"
                        id="productImage"
                        className="form-input w-full p-6 text-[1.8rem] my-8 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                        onChange={handleImageChange}
                    />
                </div>
                <button
                    className="form-btn flex items-center justify-center gap-4 w-full p-3 border-[3px] border-[#014210] rounded-md text-[#014210] text-[2.4rem] font-semibold hover:bg-[#014210] hover:text-white transition-all ease-linear duration-1000"
                    type="submit"
                >
                    <>{title}</>
                    <>{icon}</>
                </button>
            </form>
        </div>
    );
}

export default ProductForm;
