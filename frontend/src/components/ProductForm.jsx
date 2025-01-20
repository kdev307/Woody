import { Add, Close, Edit } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    createProduct,
    listProducts,
    updateProduct,
} from "../actions/productActions";
import Message from "./Message";

function ProductForm({ method, toggleProductForm, product }) {
    const title = method === "addProduct" ? "Add Product" : "Edit Product";
    const icon =
        method === "addProduct" ? (
            <Add style={{ fontSize: "3.6rem" }} />
        ) : (
            <Edit style={{ fontSize: "3.6rem" }} />
        );

    const [productBrand, setProductBrand] = useState(
        product?.productBrand || ""
    );
    const [productName, setProductName] = useState(product?.productName || "");
    const [productImages, setProductImages] = useState(
        product?.productImages || []
    );
    const [productCategories, setProductCategories] = useState(
        product?.productCategories
            ? Object.fromEntries(
                  product.productCategories.map((category) => [category, true])
              )
            : {
                  Accessories: false,
                  Bedroom: false,
                  "Dining Room": false,
                  Hallway: false,
                  "Kid Room": false,
                  "Living Room": false,
                  Outdoor: false,
                  Storage: false,
                  Workspace: false,
              }
    );
    const [productDescription, setProductDescription] = useState(
        product?.productDescription || ""
    );
    const [productSpecifications, setProductSpecifications] = useState(
        product?.productSpecifications || ""
    );
    const [productPrice, setProductPrice] = useState(
        product?.productPrice || 0
    );
    const [productStockCount, setProductStockCount] = useState(
        product?.productStockCount || 0
    );

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        setProductCategories((prevState) => ({
            ...prevState,
            [id]: checked,
        }));
    };

    const handleImageChange = (event) => {
        const files = event.target.files;
        setProductImages((prevImages) => [...prevImages, ...Array.from(files)]);
    };

    const handleRemoveImage = (index) => {
        setProductImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );
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
        formData.append("productPrice", parseFloat(productPrice).toFixed(2));
        formData.append("productStockCount", parseInt(productStockCount, 10));
        formData.append(
            "productCategories",
            JSON.stringify(selectedCategories)
        );
        // formData.append("productImage", productImage);
        if (productImages.length > 0) {
            productImages.forEach((image) => {
                formData.append("productImages", image);
            });
        }
        if (method === "editProduct") {
            formData.append("productId", product.id);
            dispatch(updateProduct(product.id, formData));
            // setMessage(product.details);
            // setMessageType("success");
            console.log("Editing Product: ", [...formData]);
        } else {
            console.log("Adding Product: ", [...formData]);
            dispatch(createProduct(formData));
            // setMessage(product.details);
            // setMessageType("success");
        }
        toggleProductForm();
        dispatch(listProducts());
        dispatch(listProducts());
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm bg-opacity-75"
            onClick={toggleProductForm}
        >
            <div
                className="relative w-11/12 max-w-4xl bg-[#e4efe4] rounded-lg p-8 overflow-auto border-2 border-[#014210]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="product-form-container p-6">
                    <div className="pt-12 flex items-center justify-end">
                        <Close
                            className="close-btn cursor-pointer text-[#014210] text-4xl absolute top-8 right-20"
                            style={{ fontSize: "3.6rem" }}
                            onClick={toggleProductForm}
                        />
                    </div>
                    <h1 className="product-form-title flex items-center justify-center gap-4 text-7xl text-center text-[#014210] font-bold">
                        {title}
                    </h1>
                    {message && (
                        <Message message={message} messageType={messageType} />
                    )}
                    <form
                        className="form-container flex flex-col p-4 gap-8 items-center justify-center text-left rounded-2xl"
                        onSubmit={handleProductDataSubmit}
                    >
                        <div className="form-inputs max-h-[60rem] overflow-y-scroll scrollbar w-full mx-auto p-8">
                            {/* Product Brand */}
                            <div className="input-group mb-4">
                                <label
                                    htmlFor="productBrand"
                                    className="text-[1.8rem] font-semibold text-[#014210]"
                                >
                                    Product Brand:
                                </label>
                                <input
                                    type="text"
                                    name="productBrand"
                                    id="productBrand"
                                    className="form-input w-full p-6 text-[1.8rem] mt-2 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                    value={productBrand}
                                    onChange={(e) =>
                                        setProductBrand(e.target.value)
                                    }
                                    placeholder="Enter Product Brand"
                                    required
                                />
                            </div>

                            {/* Product Name */}
                            <div className="input-group mb-4">
                                <label
                                    htmlFor="productName"
                                    className="text-[1.8rem] font-semibold text-[#014210]"
                                >
                                    Product Name:
                                </label>
                                <input
                                    type="text"
                                    name="productName"
                                    id="productName"
                                    className="form-input w-full p-6 text-[1.8rem] mt-2 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                    value={productName}
                                    onChange={(e) =>
                                        setProductName(e.target.value)
                                    }
                                    placeholder="Enter Product Name"
                                    required
                                />
                            </div>

                            {/* Categories */}
                            <div className="input-group mb-4">
                                <label className="text-[1.8rem] font-semibold text-[#014210]">
                                    Select Categories:
                                </label>
                                <div className="categories grid grid-cols-3 gap-12 items-center justify-center p-4">
                                    {[
                                        "Accessories",
                                        "Bedroom",
                                        "Dining Room",
                                        "Hallway",
                                        "Kid Room",
                                        "Living Room",
                                        "Outdoor",
                                        "Storage",
                                        "Workspace",
                                    ].map((category) => (
                                        <labesl
                                            key={category}
                                            htmlFor={category}
                                            className="flex items-center space-x-2"
                                        >
                                            <input
                                                type="checkbox"
                                                id={category}
                                                name="categories"
                                                checked={
                                                    productCategories[
                                                        category
                                                    ] || false
                                                }
                                                onChange={handleCheckboxChange}
                                                className="text-[#014210] w-10 h-10 border border-[#014210] rounded-full checked:bg-[#027a1c] checked:border-[#027a1c] focus:ring-2 focus:ring-[#027a1c] appearance-none"
                                            />
                                            <span className="text-2xl capitalize font-bold">
                                                {category.replace(
                                                    /([A-Z])/g,
                                                    " $1"
                                                )}
                                            </span>
                                        </labesl>
                                    ))}
                                </div>
                            </div>

                            {/* Product Description */}
                            <div className="input-group mb-4">
                                <label
                                    htmlFor="productDescription"
                                    className="text-[1.8rem] font-semibold text-[#014210]"
                                >
                                    Product Description:
                                </label>
                                <textarea
                                    name="productDescription"
                                    id="productDescription"
                                    className="form-input w-full p-6 text-[1.8rem] mt-2 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                    value={productDescription}
                                    onChange={(e) =>
                                        setProductDescription(e.target.value)
                                    }
                                    placeholder="Enter detailed product description"
                                    required
                                ></textarea>
                            </div>

                            {/* Product Specifications */}
                            <div className="input-group mb-4">
                                <label
                                    htmlFor="productSpecifications"
                                    className="text-[1.8rem] font-semibold text-[#014210]"
                                >
                                    Product Specifications:
                                </label>
                                <textarea
                                    name="productSpecifications"
                                    id="productSpecifications"
                                    className="form-input w-full p-6 text-[1.8rem] mt-2 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                    value={productSpecifications}
                                    onChange={(e) =>
                                        setProductSpecifications(e.target.value)
                                    }
                                    placeholder="List key specifications of the product"
                                    required
                                ></textarea>
                            </div>

                            {/* Product Price*/}
                            <div className="input-group mb-4">
                                <label
                                    htmlFor="productPrice"
                                    className="text-[1.8rem] font-semibold text-[#014210]"
                                >
                                    Product Price:
                                </label>
                                <input
                                    type="number"
                                    name="productPrice"
                                    id="productPrice"
                                    className="form-input w-full p-6 text-[1.8rem] mt-2 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                    value={
                                        productPrice === 0 ? "" : productPrice
                                    }
                                    onChange={(e) =>
                                        setProductPrice(
                                            parseInt(e.target.value)
                                        )
                                    }
                                    placeholder=" (in ₹)"
                                    required
                                />
                            </div>

                            {/* Product Stock Count */}

                            <div className="input-group mb-4">
                                <label
                                    htmlFor="productStockCount"
                                    className="text-[1.8rem] font-semibold text-[#014210]"
                                >
                                    Product Stock Count:
                                </label>
                                <input
                                    type="number"
                                    name="productStockCount"
                                    id="productStockCount"
                                    className="form-input w-full p-6 text-[1.8rem] mt-2 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                    value={
                                        productStockCount === 0
                                            ? ""
                                            : productStockCount
                                    }
                                    onChange={(e) =>
                                        setProductStockCount(
                                            parseInt(e.target.value)
                                        )
                                    }
                                    placeholder="50"
                                    required
                                />
                            </div>

                            {/* Product Image */}
                            <div className="mt-2">
                                {productImages && (
                                    <div className="grid grid-cols-2 gap-4">
                                        {productImages.map((image, index) => (
                                            <div
                                                key={index}
                                                className="relative group w-full"
                                            >
                                                <img
                                                    src={
                                                        typeof image.image ===
                                                        "string"
                                                            ? image.image
                                                            : URL.createObjectURL(
                                                                  image
                                                              ).image
                                                    }
                                                    alt={`${productName} Preview`}
                                                    className="w-full"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemoveImage(index)
                                                    }
                                                    className="absolute top-0 right-0 bg-black p-1 rounded-full"
                                                >
                                                    <Close
                                                        style={{
                                                            fontSize: "2.4rem",
                                                            color: "#fff",
                                                        }}
                                                    />
                                                </button>
                                                <h3 className="text-3xl font-medium absolute bottom-0 left-0 h-[35%] p-4 text-center right-0 text-white bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 hover:backdrop-blur-sm transition-opacity">
                                                    {productName} Image
                                                </h3>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <label
                                    htmlFor="productImages"
                                    className="w-full p-6 -mb-2 mt-2 text-[1.8rem] text-[#014210] bg-[#f8f6f6] border border-[#ccc] rounded-md cursor-pointer block text-center"
                                >
                                    {method === "editProduct"
                                        ? "Update Images"
                                        : "Upload Images"}
                                    <input
                                        type="file"
                                        accept="images/*"
                                        multiple
                                        id="productImages"
                                        name="productImages"
                                        className="opacity-0 w-0 h-0"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
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
            </div>
        </div>
    );
}

export default ProductForm;
