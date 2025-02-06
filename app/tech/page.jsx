import React from "react";
import Quiz from "../cmp/Quiz";

const page = () => {
  return (
    <div>
      <div className="bg-white text-black h-screen">
        <h1 className="text-3xl font-bold">Technology Quiz!</h1>
        <Quiz />
      </div>
    </div>
  );
};

export default page;
