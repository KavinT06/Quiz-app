import React from "react";
import Quiz from "../cmp/Quiz";

const page = () => {
    return (

        <div>
            <div className="bg-[#f3f4f6] text-black h-screen">
                <h1 className="text-4xl font-bold text-center">Literature Quiz!</h1>
                <Quiz  jsonFile={"literature.json"}/>
            </div>
        </div>
    );
};

export default page;
