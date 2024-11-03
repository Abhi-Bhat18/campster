import React from "react";

const Unauthorized = () => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-center items-center">
        <p className="text-3xl">Unauthorized</p>
        <p>You are not authorized to access the feature</p>
      </div>
    </div>
  );
};

export default Unauthorized;
