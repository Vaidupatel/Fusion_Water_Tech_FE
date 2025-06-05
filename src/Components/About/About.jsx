import React from "react";
import about from "/Images/about.jpg";
import { MdWaterDrop } from "react-icons/md";
import { FaFaucet } from "react-icons/fa";
const About = () => {
  return (
    <div className="h-[90vh] bg-[#FFFFFF] flex gap-6 items-center justify-center">
      <div className="h-[700px] w-[650px]">
        <div className="relative h-full border-blue-800 border-l-8 border-t-8 pt-6 pl-6 rounded-2xl">
          <img src={about} alt="" className="h-full w-full rounded-xl" />
          <div className="absolute top-0 left-0 p-8 rounded-br-md bg-blue-800">
            <p className="text-3xl text-[#FFFFFF] font-bold">
              20 Years Experiance
            </p>
          </div>
        </div>
      </div>
      <div className="h-[700px] w-[650px] flex flex-col gap-4">
        <h3 className="uppercase text-2xl">About Us</h3>
        <h1 className="text-7xl">
          We Deliver The <br />
          Quality Water.
        </h1>
        <p className="text-[16px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum quidem
          quas totam nostrum! Maxime rerum voluptatem sed, facilis unde a
          aperiam nulla voluptatibus excepturi ipsam iusto consequuntur
        </p>
        <div className="p-8 flex gap-6 bg-[#F2F9F9] rounded-xl">
          <div className="">
            <i className="h-25 w-25 flex items-center justify-center rounded-full bg-[#00D1F9]">
              <MdWaterDrop className="text-[#FFFFFF] text-4xl" />
            </i>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-2xl">Satisfied Customer</h3>
            <p className="text-[16px] text-start">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas
              provident maiores quisquam.
            </p>
          </div>
        </div>
        <div className="p-8 flex gap-6 bg-[#F2F9F9] rounded-xl">
          <div className="">
            <i className="h-25 w-25 flex items-center justify-center rounded-full bg-[#00D1F9]">
              <FaFaucet className="text-[#FFFFFF] text-4xl" />
            </i>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-2xl">Standard Product</h3>
            <p className="text-[16px] text-start">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas
              provident maiores quisquam.
            </p>
          </div>
        </div>
        <div>
          <button className="py-4 px-10 text-[#FFFFFF] bg-blue-800 hover:bg-[#00D1F9] rounded-4xl text-[16px] cursor-pointer transition-colors duration-300">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
