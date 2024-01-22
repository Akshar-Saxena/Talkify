import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../constants/firebaseconfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { ClockLoader } from "react-spinners";

export default function SignUpPage() {
    const [no, setNo] = useState("");
    const navigate = useNavigate();
    const [pass, setPass] = useState("");
    const [username, setUsername] = useState("");
    const [color, setColor] = useState("#9CA3AF");
    const [loading, setLoading] = useState(false);

    const signup = async () => {
        setLoading(true);
        const token = uuidv4();
        await addDoc(collection(db, "users"), {
            id: token,
            phone: no,
            name: username,
            pass: pass,
        });
        document.cookie = `token="${token}"`;
        setLoading(false);
        navigate("/");
    };

    const verifyPhone = async () => {
        if (no.length != 10) {
            setColor("red");
            return null;
        }
        if (username == "" || pass == "") {
            alert("Fill each field");
            return null;
        }
        const getUsers = await getDocs(collection(db, "users"));
        let flag = true;
        getUsers.forEach((element) => {
            if (element.data().phone == no) {
                alert("Only 1 account per phone number");
                flag = false;
                return null;
            }
            if (element.data().name == username) {
                alert("User name already taken!");
                flag = false;
                return null;
            }
        });
        flag ? signup() : null;
    };

    return (
        <>
            {!loading ? (
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-6xl py-2 text-center bg-clip-text text-transparent drop-shadow-md bg-gradient-to-r from-[#7B42ED] to-[#B836FA] w-fit heading">
                        Talkify
                    </h1>
                    <div className="flex w-[90%] mt-4 m-auto max-[1000px]:flex-col h-full justify-evenly items-center">
                        <img
                            className="w-[58%] max-[1000px]:w-[70%] mb-10 max-[1150px]:w-[40%] max-[420px]:hidden"
                            src="/hero.png"
                            alt=""
                        />
                        <div className="flex max-[420px]:w-[90%] w-[25%] max-[1000px]:w-[60%] relative justify-center items-center">
                            <img src="/phone.png" alt="" />
                            <div className="absolute top-0 w-full h-full flex flex-col justify-center items-center">
                                <h1 className="text-5xl py-2 heading">
                                    Sign Up
                                </h1>
                                <input
                                    className="bg-gray-200 font-serif text-sm w-[75%] my-2 px-4 py-3 outline outline-1 outline-gray-400"
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                />
                                <input
                                    className="bg-gray-200 font-serif text-sm w-[75%] my-2 px-4 py-3 outline outline-1 outline-gray-400"
                                    type="number"
                                    style={{ outline: `1px solid ${color}` }}
                                    placeholder="Phone Number"
                                    value={no}
                                    onChange={(e) => {
                                        setNo(e.target.value);
                                        if (no.length != 9) {
                                            setColor("red");
                                        } else {
                                            setColor("green");
                                        }
                                    }}
                                />
                                <input
                                    className="bg-gray-200 font-serif text-sm w-[75%] my-2 px-4 py-3 outline outline-1 outline-gray-400"
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
                                    SignUp
                                </button>
                                <h2 className="font-serif text-sm mt-5">
                                    Already have an account?{" "}
                                    <a
                                        className="font-serif text-blue-600"
                                        href="/"
                                    >
                                        Login
                                    </a>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full h-screen flex justify-center items-center">
                    <ClockLoader color="black" height={100} width={100} />
                </div>
            )}
        </>
    );
}
