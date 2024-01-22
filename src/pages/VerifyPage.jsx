import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OTPInput from "otp-input-react";
// import { auth } from "../constants/firebaseconfig";
// import { RecaptchaVerifier } from "firebase/auth";

export default function VerifyPage() {
    const location = useLocation();
    const [key, setKey] = useState(false);
    const [otp, setOtp] = useState("");

    useEffect(() => {
        try {
            if (location.state.phone) {
                setKey(true);
                onSignUp();
            }
        } catch (err) {
            console.log(err);
            setKey(false);
        }
    });
    return (
        <div>
            {key == true ? (
                <div className="flex flex-col h-screen justify-center items-center">
                    <h1 className="text-6xl py-2 mb-5 text-center bg-clip-text text-transparent drop-shadow-md bg-gradient-to-r from-[#7B42ED] to-[#B836FA] w-fit">
                        Talkify
                    </h1>
                    <div className="bg-gray-200 flex flex-col justify-center items-center rounded-md shadow-md shadow-black p-10">
                        <h1 className="text-lg my-3">Verify OTP</h1>
                        <div className="sign-in-button"></div>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            autoFocus
                            OTPLength={6}
                            otpType="number"
                            disabled={false}
                            secure
                            className="bg-gradient-to-r from-[#7B42ED] to-[#B836FA] py-5 pl-5 rounded-2xl"
                        />
                        <button
                            onClick={verifyOTP}
                            className="px-4 py-2 font-serif text-white rounded-md mt-6 bg-blue-600"
                        >
                            Verify
                        </button>
                    </div>
                </div>
            ) : (
                <div>Page Not Found</div>
            )}
        </div>
    );
}
