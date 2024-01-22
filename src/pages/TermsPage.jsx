import React from "react";
import { useNavigate } from "react-router-dom";

export default function TermsPage() {
    const navigate = useNavigate();
    return (
        <div className="w-[250px] m-auto h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl font-extrabold my-5 text-blue-800">
                Policy
            </h1>
            <p className="text-md text-justify">
                Talkify is a free chatting platform. Violating the chatting
                environment or sending disturbing messages can result in a
                permanent ban of the account. It is a project website. Kindly
                agree to this policy.
            </p>
            <button
                onClick={() => navigate("/")}
                className="py-2 px-5 bg-green-600 rounded-md my-6"
            >
                Agree
            </button>
        </div>
    );
}
