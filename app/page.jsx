import React from "react";
import { Lato } from "next/font/google";
import Image from "next/image";
import Card1 from "./assets/cmp/cards/Card1";
import Card2 from "./assets/cmp/cards/Card2";
import Card3 from "./assets/cmp/cards/Card3";
import Card4 from "./assets/cmp/cards/Card4";
import Card5 from "./assets/cmp/cards/Card5";
import Card6 from "./assets/cmp/cards/Card6";
import Card7 from "./assets/cmp/cards/Card7";
import Card8 from "./assets/cmp/cards/Card8";
import Card9 from "./assets/cmp/cards/Card9";

const latofont = Lato({
    weight: ["400", "700"],
    subsets: ["latin"],
});

const page = () => {
    return (
        <div>
            <div className="bg-white text-black">
                <div className="mx-auto max-w-7xl py-16 p-6 lg:px-8">
                    <h1 className="text-blue-500 font-bold text-4xl text-center py-8">
                        Welcome to the Quiz App
                    </h1>
                    <h3 className="text-2xl text-center py-4 mb-10">
                        Select a subject to get started and test your knowledge!
                    </h3>
                    <div className="grid grid-cols-3">
                        <Card1 />
                        <Card2 />
                        <Card3 />
                        <Card4 />
                        <Card5 />
                        <Card6 />
                        <Card7 />
                        <Card8 />
                        <Card9 />
                    </div>
                </div>
            </div>
                <footer className="footer footer-center bg-base-300 text-base-content p-8">
                    <aside>
                        <p>
                            Copyright © {new Date().getFullYear()} - All right
                            reserved by ACME Industries Ltd
                        </p>
                    </aside>
                </footer>
        </div>
    );
};

export default page;
