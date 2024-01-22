import { collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../constants/firebaseconfig";
import { useNavigate } from "react-router-dom";
import { ClockLoader } from "react-spinners";

export default function HomePage() {
    const [pass, setPass] = useState("");
    const [no, setNo] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);
        const allUsers = await getDocs(collection(db, "users"));
        let flag = false;
        allUsers.forEach((element) => {
            if (element.data().phone == no && element.data().pass == pass) {
                document.cookie = `token=${element.data().id}`;
                flag = true;
            }
        });
        setLoading(false);
        flag ? navigate("/welcome") : alert("Invalid Username or Password");
    };

    const verifyPhone = () => {
        if (no.length != 10) {
            return null;
        }
        if (pass == "") {
            alert("Enter a password");
            return null;
        }
        login();
    };

    return (
        <>
            {!loading ? (
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-6xl py-2 text-center bg-clip-text text-transparent drop-shadow-md bg-gradient-to-r from-[#7B42ED] heading to-[#B836FA] w-fit">
                        Talkify
                    </h1>
                    <div className="flex w-[90%] max-[1000px]:flex-col mt-4 m-auto h-full justify-evenly items-center">
                        <img
                            className="w-[58%] max-[1000px]:w-[70%] mb-10 max-[1150px]:w-[40%] max-[420px]:hidden"
                            src="/hero.png"
                            alt=""
                        />
                        <div className="flex max-[420px]:w-[90%] w-[25%] max-[1000px]:w-[60%] relative justify-center items-center">
                            <img src="/phone.png" alt="" />
                            <div className="absolute top-0 w-full h-full flex flex-col justify-center items-center">
                                <h1 className="text-5xl py-2 heading">Login</h1>
                                <input
                                    className="bg-gray-200 font-serif w-[75%] my-2 px-4 py-3 outline outline-1 outline-gray-400"
                                    type="number"
                                    placeholder="Phone Number"
                                    value={no}
                                    onChange={(e) => {
                                        setNo(e.target.value);
                                    }}
                                />
                                <input
                                    className="bg-gray-200 font-serif w-[75%] my-2 px-4 py-3 outline outline-1 outline-gray-400"
                                    type="password"
                                    placeholder="Password"
                                    value={pass}
                                    onChange={(e) => {
                                        setPass(e.target.value);
                                    }}
                                />
                                <button
                                    onClick={verifyPhone}
                                    className="bg-blue-600 text-white py-2 px-7 rounded-md mt-10"
                                >
                                    Login
                                </button>
                                <h2 className="font-serif text-sm mt-5">
                                    Don't have an account?{" "}
                                    <a
                                        className="font-serif text-blue-600"
                                        href="/signup"
                                    >
                                        SignUp
                                    </a>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full h-screen flex justify-center items-center">
                    <ClockLoader color="black" height={80} width={80} />
                </div>
            )}
        </>
    );
}
