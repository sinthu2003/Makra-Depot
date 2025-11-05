import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const slides = [
  { id: 1, imageUrl: "/assets/SliderImgs/Light.jpg", title: "Light Up Your Celebrations",desc:"Discover our exclusive range of professional-grade fireworks for unforgettable moments" },
  { id: 2, imageUrl: "/assets/SliderImgs/Celebration.jpg", title: "New Year Special",desc:"Get ready for the biggest celebration with our special discount offers" },
  { id: 3, imageUrl: "/assets/SliderImgs/Safety.jpg", title: "Safety First",desc:"All our products meet the highest safety standards for your peace of mind" },
];

const Slider = () => {
  return (
    <div className="relative custom-swiper w-full h-[90vh]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        className="mySwiper h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* above */}
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-white gap-4">
              {/* title */}
                <p className="text-4xl font-bold drop-shadow-lg">
                  {slide.title}
                </p>
                <p className="text-xl drop-shadow-lg">{slide.desc}</p>
                 {/* buttons */}
                <div className="flex gap-4">
                    <Link to='/quickbuy' ><button className="px-6 py-2 flex gap-2 items-center text-black bg-[#d5754d] dark:bg-black dark:text-white font-bold text-sm rounded-xl hover:-translate-y-1 transition duration-300 hover:cursor-pointer">
                        <span>Quick Buy</span>
                        <BsArrowRight className="size-4"/></button></Link>
                    <Link to='/products' ><button className="px-6 py-2 flex gap-2 items-center text-white bg-white/20 backdrop-blur-sm font-bold text-sm rounded-xl hover:-translate-y-1 transition duration-300 hover:cursor-pointer">
                        <span>View Products</span>
                        <BsArrowRight className="size-4"/></button></Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
