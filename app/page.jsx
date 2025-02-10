"use client";
import React from "react";
import { Lato } from "next/font/google";
import Image from "next/image";
import Card1 from "./cmp/cards/Card1";
import Card2 from "./cmp/cards/Card2";
import Card3 from "./cmp/cards/Card3";
import Card4 from "./cmp/cards/Card4";
import Card5 from "./cmp/cards/Card5";
import Card6 from "./cmp/cards/Card6";
import Card7 from "./cmp/cards/Card7";
import Card8 from "./cmp/cards/Card8";
import Card9 from "./cmp/cards/Card9";
import Link from "next/link";
import Footer from "./cmp/Footer";

const latofont = Lato({
    weight: ["400", "700"],
    subsets: ["latin"],
});

const page = () => {
    return (
        <div>
            <div className="bg-white text-black">
                <div className="mx-auto max-w-7xl md:py-12 p-4 md:px-8">
                    <h1 className="text-blue-500 font-bold lg:text-4xl text-center md:py-4 text-2xl">
                        Welcome to the Quiz App
                    </h1>
                    <h3 className="lg:text-2xl text-center py-4 md:mb-10 text-lg">
                        Select a subject to get started and test your knowledge!
                    </h3>
                    <div className="grid gap-3 md:grid-cols-3 grid-cols-2 md:ml-5 lg:ml-2 xl:ml-16">
                        <Link href="/tech">
                            <Card1 />
                        </Link>
                        <Link href="/sports">
                            <Card2 />
                        </Link>
                        <Link href="/math">
                            <Card3 />
                        </Link>
                        <Link href="/art">
                            <Card4 />
                        </Link>
                        <Link href="/science">
                            <Card5 />
                        </Link>
                        <Link href="/geography">
                            <Card6 />
                        </Link>
                        <Link href="/history">
                            <Card7 />
                        </Link>
                        <Link href="/music">
                            <Card8 />
                        </Link>
                        <Link href="/literature">
                            <Card9 />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
