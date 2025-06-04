import React from "react";
import {
  FaFilter,
  FaHandHoldingWater,
  FaMicroscope,
  FaRecycle,
} from "react-icons/fa";

const Feature = () => {
  return (
    <div className="h-[80vh] bg-[#F2F9F9] flex flex-col gap-8 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="uppercase text-2xl">Our Feature</p>
        <h2 className="text-7xl text-center font-semibold">
          A Trusted Name In Bottled <br /> Water Industry
        </h2>
      </div>
      <div className="flex items-center justify-center gap-8">
        <div className="group h-[350px] w-[300px] flex flex-col items-center justify-between gap-2 p-6 bg-[#FFFFFF] rounded-xl">
          <div className="h-25 w-25 flex items-center justify-center rounded-full bg-[#00D1F9]">
            <i className="transition-transform duration-500 group-hover:rotate-[360deg]">
              <FaHandHoldingWater className="text-[#FFFFFF] text-6xl group-hover-card:text-black" />
            </i>
          </div>
          <h3 className="text-2xl">Quality Check</h3>
          <p className="text-[16px] text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            repellat deleniti necessitatibus
          </p>
          <button className="text-[16px] text-blue-700 hover:text-[#08D2F9] transition-colors duration-300 cursor-pointer">
            Read more &gt;
          </button>
        </div>
        <div className="group h-[350px] w-[300px] flex flex-col items-center justify-between gap-2 p-6 bg-[#FFFFFF] rounded-xl">
          <div className="h-25 w-25 flex items-center justify-center rounded-full bg-[#00D1F9]">
            <i className="transition-transform duration-500 group-hover:rotate-[360deg]">
              <FaFilter className="text-[#FFFFFF] text-6xl group-hover-card:text-black" />
            </i>
          </div>
          <h3 className="text-2xl">5 Steps Filtration</h3>
          <p className="text-[16px] text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            repellat deleniti necessitatibus
          </p>
          <button className="text-[16px] text-blue-700 hover:text-[#08D2F9] transition-colors duration-300 cursor-pointer">
            Read more &gt;
          </button>
        </div>
        <div className="group h-[350px] w-[300px] flex flex-col items-center justify-between gap-2 p-6 bg-[#FFFFFF] rounded-xl">
          <div className="h-25 w-25 flex items-center justify-center rounded-full bg-[#00D1F9]">
            <i className="transition-transform duration-500 group-hover:rotate-[360deg]">
              <FaRecycle className="text-[#FFFFFF] text-6xl group-hover-card:text-black" />
            </i>
          </div>
          <h3 className="text-2xl">Composition</h3>
          <p className="text-[16px] text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            repellat deleniti necessitatibus
          </p>
          <button className="text-[16px] text-blue-700 hover:text-[#08D2F9] transition-colors duration-300 cursor-pointer">
            Read more &gt;
          </button>
        </div>
        <div className="group h-[350px] w-[300px] flex flex-col items-center justify-between gap-2 p-6 bg-[#FFFFFF] rounded-xl">
          <div className="h-25 w-25 flex items-center justify-center rounded-full bg-[#00D1F9]">
            <i className="transition-transform duration-500 group-hover:rotate-[360deg]">
              <FaMicroscope className="text-[#FFFFFF] text-6xl group-hover-card:text-black" />
            </i>
          </div>
          <h3 className="text-2xl">Lab Control</h3>
          <p className="text-[16px] text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            repellat deleniti necessitatibus
          </p>
          <button className="text-[16px] text-blue-700 hover:text-[#08D2F9] transition-colors duration-300 cursor-pointer">
            Read more &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feature;
