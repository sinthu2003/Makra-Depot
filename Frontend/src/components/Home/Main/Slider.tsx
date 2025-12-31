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
    <div className="relative custom-swiper w-full h-[70vh] sm:h-[80vh] lg:h-[90vh]">
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
    navigation={{
      enabled: true,
    }}
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
          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-white gap-2 sm:gap-3 lg:gap-4 px-4">
            {/* Title */}
            <p className="text-xl sm:text-2xl lg:text-4xl font-bold drop-shadow-lg text-center">
              {slide.title}
            </p>
            {/* Description */}
            <p className="text-sm sm:text-base lg:text-xl drop-shadow-lg text-center max-w-2xl">
              {slide.desc}
            </p>
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 mt-2 sm:mt-0">
              <Link to='/quickbuy'>
                <button className="px-4 py-2 sm:px-5 sm:py-2 lg:px-6 lg:py-2 flex gap-2 items-center text-black bg-[#d5754d] dark:bg-black dark:text-white font-bold text-xs sm:text-sm rounded-xl hover:-translate-y-1 transition duration-300 hover:cursor-pointer w-full sm:w-auto justify-center">
                  <span>Quick Buy</span>
                  <BsArrowRight className="size-3 sm:size-4"/>
                </button>
              </Link>
              <Link to='/products'>
                <button className="px-4 py-2 sm:px-5 sm:py-2 lg:px-6 lg:py-2 flex gap-2 items-center text-white bg-white/20 backdrop-blur-sm font-bold text-xs sm:text-sm rounded-xl hover:-translate-y-1 transition duration-300 hover:cursor-pointer w-full sm:w-auto justify-center">
                  <span>View Products</span>
                  <BsArrowRight className="size-3 sm:size-4"/>
                </button>
              </Link>
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
