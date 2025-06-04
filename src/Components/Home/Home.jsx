import { motion } from "motion/react";
import Img1 from "/Images/Img1.jpg";
const Home = () => {
  return (
    <div className="relative h-screen w-full">
      <img src={Img1} className="absolute top-0 left-0 h-full w-full" />
      <div className="absolute top-0 left-0 h-full w-full bg-[#00000077] p-4">
        <div className="relative top-[40%] left-[5%] w-1/2 flex flex-col gap-6 text-[#FFFFFF]">
          <motion.h2
            initial={{
              translateX: 500,
              opacity: 0,
            }}
            animate={{
              translateX: 0,
              opacity: 100,
            }}
            transition={{
              duration: 1,
            }}
            className="text-3xl text-[#FFFFFF]"
          >
            Importance life
          </motion.h2>
          <motion.h3
            initial={{
              translateX: 500,
              opacity: 0,
            }}
            animate={{
              translateX: 0,
              opacity: 100,
            }}
            transition={{
              duration: 1.2,
              delay: 0.3,
            }}
            className="text-7xl text-[#FFFFFF] font-bold"
          >
            Always Want Safe Water <br />
            <span>For Healthy Life</span>
          </motion.h3>
          <motion.p
            initial={{
              translateX: 500,
              opacity: 0,
            }}
            animate={{
              translateX: 0,
              opacity: 100,
            }}
            transition={{
              duration: 1.3,
              delay: 0.4,
            }}
            className="text-xl"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </motion.p>
          <motion.div
            initial={{
              translateX: 500,
              opacity: 0,
            }}
            animate={{
              translateX: 0,
              opacity: 100,
            }}
            transition={{
              duration: 1.3,
              delay: 0.6,
            }}
            className="flex gap-4"
          >
            <button
              type="button"
              className="z-2 bg-[#00D0F8] hover:bg-[#18459D] rounded-full p-4 cursor-pointer transition-colors duration-600"
            >
              Order Now
            </button>
            <button
              type="button"
              className="z-2 bg-[#18459D] hover:bg-[#00D0F8] rounded-full p-4 cursor-pointer transition-colors duration-600"
            >
              Free Estimate
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
