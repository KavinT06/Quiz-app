"use client";
import React from "react";
import Quiz from "../cmp/Quiz";

const page = () => {
  return (
    <div>
      <div className="bg-[#f3f4f6] text-black">
        <h1 className="md:text-4xl text-2xl font-bold text-center p-3">Technology Quiz!</h1>
        <Quiz jsonFile={"tech.json"}/>
      </div>
    </div>
  );
};

export default page;
