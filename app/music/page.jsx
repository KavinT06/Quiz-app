import React from "react";
import Quiz from "../cmp/Quiz";

const page = () => {
    return (
        <div>
            <div className="bg-[#f3f4f6] text-black h-screen">
                <h1 className="md:text-4xl text-2xl font-bold text-center">Music Quiz!</h1>
                <Quiz jsonFile={"music.json"}/>
            </div>
        </div>
    );
};

export default page;
