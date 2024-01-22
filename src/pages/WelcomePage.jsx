import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../constants/firebaseconfig";
import "../App.css";

export default function WelcomePage() {
    const navigate = useNavigate();
    const [sideOpen, setSideOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [msg, setMsg] = useState("");
    const [user, setUser] = useState("");
    const [userToken, setUserToken] = useState("");
    const [userName, setUserName] = useState("");
    const [chat, setChat] = useState([]);
    const [disable, setDisable] = useState(false);
    const logoutHandler = () => {
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        navigate("/");
    };

    const toggleSideBar = () => {
        setSideOpen(!sideOpen);
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        return formattedDateTime;
    };

    const getUsers = async () => {
        const users = await getDocs(collection(db, "users"));
        users.forEach((element) => {
            if (element.data().id != document.cookie.slice(6)) {
                setUsers((prev) => [...prev, element.data()]);
            }
        });
    };

    const loadChats = async (user) => {
        setDisable(true);
        setChat([]);
        const chats = await getDocs(collection(db, "chats"));
        chats.forEach((element) => {
            if (
                (element.data().sender == document.cookie.slice(6) ||
                    element.data().receiver == document.cookie.slice(6)) &&
                (element.data().sender == user ||
                    element.data().receiver == user)
            ) {
                console.log("Found");
                setChat((prev) => [...prev, element.data()]);
            }
        });
    };

    const sendMessage = async () => {
        if (msg != "") {
            // console.log(document.cookie.slice(6), userToken);
            const time = getCurrentDateTime();
            await addDoc(collection(db, "chats"), {
                sender: document.cookie.slice(6),
                receiver: userToken,
                message: msg,
                time: time,
            });
            // console.log("Sent");
            setMsg("");
            loadChats(userToken);
        } else {
            alert("Write something");
        }
    };

    useEffect(() => {
        getUsers();
    }, []);
    return (
        <div>
            {document.cookie != "" ? (
                <div className="flex justify-between">
                    <div className="min-[725px]:hidden">
                        {sideOpen && (
                            <div className="bg-gray-300 overflow-y-scroll w-[50%] absolute top-16 left-0 h-[97vh] mt-2 ml-2 rounded-lg flex flex-col items-center">
                                <h1 className="text-6xl py-2 heading text-center bg-clip-text text-transparent drop-shadow-md bg-gradient-to-r from-[#7B42ED] to-[#B836FA] w-fit">
                                    Talkify
                                </h1>
                                <button onClick={logoutHandler}>Logout</button>
                                <ul className="w-[92%]">
                                    {users.map((element, id) => (
                                        <li
                                            className="rounded-lg cursor-pointer my-1 px-4 py-3 bg-white"
                                            key={id}
                                            onClick={(e) => {
                                                setUser(e.target.innerHTML);
                                                setUserToken(element.id);
                                                loadChats(element.id);
                                                setSideOpen(false);
                                            }}
                                        >
                                            {element.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="bg-gray-300 overflow-y-scroll w-[25%] max-[725px]:hidden h-[97vh] mt-2 ml-2  rounded-lg flex flex-col items-center">
                        <h1 className="text-6xl py-2 heading text-center bg-clip-text text-transparent drop-shadow-md bg-gradient-to-r from-[#7B42ED] to-[#B836FA] w-fit">
                            Talkify
                        </h1>
                        <button onClick={logoutHandler}>Logout</button>
                        <ul className="w-[92%]">
                            {users.map((element, id) => (
                                <li
                                    className="rounded-lg cursor-pointer my-1 px-4 py-3 bg-white"
                                    key={id}
                                    onClick={(e) => {
                                        setUser(e.target.innerHTML);
                                        setUserToken(element.id);
                                        loadChats(element.id);
                                    }}
                                >
                                    {element.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-[73.5%] max-[725px]:w-full">
                        <div className="h-[9vh] text-xl flex items-center px-3 w-[99%] mt-2 max-[725px]:mt-0 bg-gray-200">
                            <button
                                onClick={toggleSideBar}
                                className="w-[40px] min-[725px]:hidden text-4xl mr-10"
                            >
                                &#x2630;
                            </button>
                            {user}
                        </div>
                        <div className="h-[82vh] px-1 max-[500px]:h-[75vh] font-[Alef] flex flex-col-reverse pt-5 mr-2 overflow-y-scroll">
                            {chat.length != 0 ? (
                                chat
                                    .sort((a, b) => {
                                        const timeA = new Date(a.time);
                                        const timeB = new Date(b.time);

                                        return timeB - timeA;
                                    })
                                    .map((element, id) => (
                                        <div
                                            key={id}
                                            className={`flex w-[97%] m-auto`}
                                            style={{
                                                justifyContent:
                                                    element.receiver ==
                                                    document.cookie.slice(6)
                                                        ? "start"
                                                        : "end",
                                            }}
                                        >
                                            <h1
                                                className={`my-1 w-fit max-w-[270px] text-white px-5 py-3 rounded-xl bg-gradient-to-b 
                                                from-[#7B42ED] to-[#B836FA]`}
                                            >
                                                {" "}
                                                {element.sender == userToken ? (
                                                    <span className="text-xs text-black">
                                                        {user + " : "}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-black">
                                                        {"Me : "}
                                                    </span>
                                                )}
                                                {/* <br /> */}
                                                {element.message}
                                                <br />
                                                <span className="text-black text-xs">
                                                    {element.time}
                                                </span>
                                            </h1>
                                        </div>
                                    ))
                            ) : (
                                <h1>Start a conversation</h1>
                            )}
                        </div>
                        <div className="flex justify-evenly mt-1 px-2">
                            <input
                                type="text"
                                placeholder="Type your message"
                                value={msg}
                                onChange={(e) => {
                                    setMsg(e.target.value);
                                }}
                                disabled={!disable}
                                className="outline outline-1 max-[370px]:w-[78%] px-4 rounded-md outline-black py-3 w-[88%]"
                            />
                            <button
                                className="bg-gradient-to-b w-[10%] max-[370px]:w-[20%] rounded-md from-[#7B42ED] to-[#B836FA] flex justify-center items-center"
                                onClick={sendMessage}
                                disabled={!disable}
                            >
                                <img
                                    className="w-[20px]"
                                    src="/send.png"
                                    alt=""
                                />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                "Page not found"
            )}
        </div>
    );
}
