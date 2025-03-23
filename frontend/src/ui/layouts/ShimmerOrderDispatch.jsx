import React from "react";

function ShimmerOrderDispatch() {
    return (
        <div className="order-dispatch-container min-h-[35rem] p-8">
            <div className="sub-heading text-7xl font-bold p-8 flex items-center justify-center gap-8">
                <div className="bg-gray-300 h-12 w-3/4 mb-4 animate-pulse"></div>
            </div>
            <div className="orders-container flex flex-col items-center justify-center">
                <div className="px-12 py-0 sort-btns flex lg_tab:hidden justify-start items-center gap-8 w-full">
                    <div className="bg-gray-300 h-8 w-1/4 mb-4 animate-pulse"></div>
                    <div className="bg-gray-300 h-8 w-1/4 mb-4 animate-pulse"></div>
                    <div className="bg-gray-300 h-8 w-1/4 mb-4 animate-pulse"></div>
                    <div className="bg-gray-300 h-8 w-1/4 mb-4 animate-pulse"></div>
                </div>
                <div className="w-full overflow-auto p-12">
                    <table className="table-auto shadow-md border-collapse mx-auto">
                        <thead className="bg-[#014210] text-white text-4xl font-semibold">
                            <tr className="p-8">
                                <th className="p-8">
                                    <div className="bg-gray-300 h-8 w-full animate-pulse"></div>
                                </th>
                                <th className="p-8">
                                    <div className="bg-gray-300 h-8 w-full animate-pulse"></div>
                                </th>
                                <th className="p-8">
                                    <div className="bg-gray-300 h-8 w-full animate-pulse"></div>
                                </th>
                                <th className="p-8">
                                    <div className="bg-gray-300 h-8 w-full animate-pulse"></div>
                                </th>
                                <th className="p-8">
                                    <div className="bg-gray-300 h-8 w-full animate-pulse"></div>
                                </th>
                                <th className="p-8">
                                    <div className="bg-gray-300 h-8 w-full animate-pulse"></div>
                                </th>
                                <th className="p-8">
                                    <div className="bg-gray-300 h-8 w-full animate-pulse"></div>
                                </th>
                                <th className="p-8">
                                    <div className="bg-gray-300 h-8 w-full animate-pulse"></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-3xl font-medium bg-[#edf2ed]">
                            {[...Array(3)].map((_, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-[#ddd] p-8"
                                >
                                    <td className="p-8 text-center">
                                        <div className="bg-gray-300 h-8 w-full animate-pulse"></div>
                                    </td>
                                    <td className="p-8 text-center">
                                        <div className="bg-gray-300 h-8 w-full animate-pulse"></div>
                                    </td>
                                    <td className="p-8 text-center">
                                        <div className="bg-gray-300 h-8 w-full animate-pulse"></div>
                                    </td>
                                    <td className="p-8 text-center">
                                        <div className="bg-gray-300 h-8 w-full animate-pulse"></div>
                                    </td>
                                    <td className="p-8 text-center">
                                        <div className="bg-gray-300 h-8 w-full animate-pulse"></div>
                                    </td>
                                    <td className="p-8 text-center">
                                        <div className="bg-gray-300 h-8 w-full animate-pulse"></div>
                                    </td>
                                    <td className="p-8 text-center">
                                        <div className="bg-gray-300 h-8 w-full animate-pulse"></div>
                                    </td>
                                    <td className="p-8 text-center">
                                        <div className="bg-gray-300 h-8 w-full animate-pulse"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ShimmerOrderDispatch;
