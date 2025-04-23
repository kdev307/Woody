import React from "react";

function ShimmerOrderDispatch() {
    return (
        <div className="order-dispatch-container w-full min-h-[50rem] p-8">
            <div className="orders-container w-full flex flex-col items-center justify-center">
                <div className="w-full overflow-auto py-12">
                    <table className="table-auto shadow-md border-collapse mx-auto w-full">
                        <thead className="bg-[#014210] text-white text-4xl font-semibold">
                            <tr className="p-8">
                                <th className="p-8">
                                    <div className="bg-gray-300 h-10 w-32 animate-pulse rounded-md"></div>
                                </th>
                                <th className="p-8">
                                    <div className="bg-gray-300 h-10 w-44 animate-pulse rounded-md"></div>
                                </th>
                                <th className="p-8">
                                    <div className="bg-gray-300 h-10 w-72 animate-pulse rounded-md"></div>
                                </th>
                                <th className="p-8">
                                    <div className="bg-gray-300 h-10 w-96 animate-pulse rounded-md"></div>
                                </th>
                                <th className="p-8">
                                    <div className="bg-gray-300 h-10 w-40 animate-pulse rounded-md"></div>
                                </th>
                                <th className="p-8">
                                    <div className="bg-gray-300 h-10 w-36 animate-pulse rounded-md"></div>
                                </th>
                                <th className="p-8">
                                    <div className="bg-gray-300 h-10 w-32 animate-pulse rounded-md"></div>
                                </th>
                                <th className="p-8">
                                    <div className="bg-gray-300 h-10 w-40 animate-pulse rounded-md"></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-3xl font-medium bg-[#edf2ed]">
                            {[...Array(5)].map((_, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-[#ddd] p-8"
                                >
                                    <td className="p-8 text-center">
                                        <div className="bg-gray-300 h-10 w-32 animate-pulse rounded-md"></div>
                                    </td>
                                    <td className="p-8 text-center">
                                        <div className="bg-gray-300 h-10 w-44 animate-pulse rounded-md"></div>
                                    </td>
                                    <td className="p-8 text-center">
                                        <div className="bg-gray-300 h-10 w-72 animate-pulse rounded-md"></div>
                                    </td>
                                    <td className="p-8 text-center">
                                        <div className="bg-gray-300 h-10 w-96 animate-pulse rounded-md"></div>
                                    </td>
                                    <td className="p-8 text-center">
                                        <div className="bg-gray-300 h-10 w-40 animate-pulse rounded-md"></div>
                                    </td>
                                    <td className="p-8 text-center">
                                        <div className="bg-gray-300 h-10 w-36 animate-pulse rounded-md"></div>
                                    </td>
                                    <td className="p-8 text-center">
                                        <div className="bg-gray-300 h-10 w-32 animate-pulse rounded-md"></div>
                                    </td>
                                    <td className="p-8 text-center">
                                        <div className="bg-gray-300 h-10 w-40 animate-pulse rounded-md"></div>
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
