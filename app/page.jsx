import React from "react";
import { Lato } from "next/font/google";
import Card from "./assets/cmp/Card";

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
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
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
