import React from "react";

export default function ChatCard(props) {
    return (
        <div className="bg-gray-300 py-3 px-4 text-black rounded-md">
            <h1>{props.msg}</h1>
        </div>
    );
}
