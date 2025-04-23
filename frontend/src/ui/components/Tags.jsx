import React from "react";

function Tags({ tagData, tagColor, tagBackgroundColor }) {
    return (
        <p
            className="font-semibold text-[1.5rem] leading-10 rounded-lg py-1 px-2 absolute uppercase mt-3 ml-3 opacity-100"
            style={{ backgroundColor: tagBackgroundColor, color: tagColor }}
        >
            {tagData}
        </p>
    );
}

export default Tags;
