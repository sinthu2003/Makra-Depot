// import React from 'react'

import { MdLocationPin, MdOutlineLocalPhone, MdWorkspacePremium } from "react-icons/md";
import Map from "./Map";
import { FaInstagram, FaShippingFast } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { LuFacebook } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCompany } from "../../api";
import { IoLocationOutline } from "react-icons/io5";
import { GoMail } from "react-icons/go";
import { GiFireworkRocket } from "react-icons/gi";
import { BiShieldAlt2 } from "react-icons/bi";

const Footer = () => {

  const [company,setCompany] = useState()

  useEffect(() => {
    getDetails()
  },[])

  const getDetails = async() => {
      const res= await getCompany()
      if(res?.status == 200 || res?.status == 201){
          setCompany(res.data.data[0])
      }
  }

  const nav = useNavigate()
  const goTo = async() => {
    nav('/contact',{state:{details:company}})
  }

  return (
    <footer className="bg-gray-900 dark:bg-black text-white font-inter flex py-5 flex-col overflow-x-hidden">
  {/* showcase */}
  <div className="flex flex-col sm:flex-row items-center justify-center lg:gap-30 lg:p-10 md:gap-10 md:p-5 gap-4 sm:gap-6 p-4">
    <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
      <p className="p-2 rounded-lg bg-[#d5754d]"><FaShippingFast className="size-4 sm:size-6 md:size-8 text-black"/></p>
      <p className="font-semibold text-xs sm:text-sm md:text-md flex flex-col gap-1 whitespace-nowrap">
        Fast Shipping
        <span className="font-medium text-white/80 text-xs">Quick delivery across India</span>
      </p>
    </div>
    <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
      <p className="p-2 rounded-lg bg-[#d5754d]"><BiShieldAlt2 className="size-4 sm:size-6 md:size-8 text-black"/></p>
      <p className="font-semibold text-xs sm:text-sm md:text-md flex flex-col gap-1 whitespace-nowrap">
        Secure Payment
        <span className="font-medium text-white/80 text-xs">100% secure transactions</span>
      </p>
    </div>
    <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
      <p className="p-2 rounded-lg bg-[#d5754d]"><MdWorkspacePremium className="size-4 sm:size-6 md:size-8 text-black"/></p>
      <p className="font-semibold text-xs sm:text-sm md:text-md flex flex-col gap-1 whitespace-nowrap">
        Premium Quality
        <span className="font-medium text-white/80 text-xs">Certified products only</span>
      </p>
    </div>
  </div>

  <div className="h-[1px] border border-white/20 mx-4"></div>

  {/* contact - link */}
  <div className="flex py-8 sm:py-10 justify-center gap-6 lg:gap-10 lg:px-30 md:px-15 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 px-4 sm:px-6 md:px-10 gap-y-8">
    {/* desc  */}
    <div className="flex flex-col gap-3 w-full col-span-1 xs:col-span-2 md:col-span-1">
      <p className="flex gap-2 items-center">
        <GiFireworkRocket className="p-1 sm:p-2 rounded-lg bg-[#d5754d] size-6 sm:size-8"/>
        <span className="font-bold text-white text-sm sm:text-md lg:text-lg">{company?.companyName}</span>
      </p>

      <p className="font-medium text-white/60 text-xs sm:text-sm word-break">
        Your trusted source for premium fireworks and celebration supplies. Making every occasion memorable with quality products.
      </p>

      {/* social media icons */}
      <div className="flex gap-2 sm:gap-3">
        <a href={company?.socialMedia?.facebook} className="p-2 bg-white/10 rounded-lg hover:bg-[#d5754d] transition duration-300">
          <LuFacebook className="size-4 sm:size-5 lg:size-6"/>
        </a>
        <a href={company?.socialMedia?.instagram} className="p-2 bg-white/10 rounded-lg hover:bg-[#d5754d] transition duration-300">
          <FaXTwitter className="size-4 sm:size-5 lg:size-6"/>
        </a>
        <a href={company?.socialMedia?.twitter} className="p-2 bg-white/10 rounded-lg hover:bg-[#d5754d] transition duration-300">
          <FaInstagram className="size-4 sm:size-5 lg:size-6"/>
        </a>
        <a href={company?.socialMedia?.youtube} className="p-2 bg-white/10 rounded-lg hover:bg-[#d5754d] transition duration-300">
          <AiOutlineYoutube className="size-4 sm:size-5 lg:size-6"/>
        </a>
      </div>
    </div>

    {/* links */}
    <div className="flex flex-col gap-2 w-full text-xs sm:text-sm">
      <p className="font-bold text-sm sm:text-md">Quick Links</p>
      <Link to="/products"><p className="text-white/60 hover:text-white cursor-pointer transition duration-300">All Products</p></Link>
      <Link to="/categories"><p className="text-white/60 hover:text-white cursor-pointer transition duration-300">Categories</p></Link>
      <Link to="/brands"><p className="text-white/60 hover:text-white cursor-pointer transition duration-300">Brands</p></Link>
      <Link to="/quickbuy"><p className="text-white/60 hover:text-white cursor-pointer transition duration-300">Quick Buy</p></Link>
    </div>

    {/* Service */}
    <div className="flex flex-col gap-2 w-full text-xs sm:text-sm">
      <p className="font-bold text-sm sm:text-md">Customer Service</p>
      <p className="text-white/60 hover:text-white cursor-pointer transition duration-300" onClick={()=>goTo()}>Contact Us</p>
      {/* <p className="text-white/60 hover:text-white cursor-pointer transition duration-300">Shipping Info</p>
      <p className="text-white/60 hover:text-white cursor-pointer transition duration-300">Track Order</p> */}
    </div>

    {/* mail */}
    <div className="flex flex-col gap-2 w-full text-xs sm:text-sm col-span-1 xs:col-span-2 md:col-span-1">
      <p className="font-bold text-sm sm:text-md">Get in Touch</p>
      <p className="text-white/60 flex gap-2 items-start">
        <IoLocationOutline className="size-4 sm:size-5 mt-0.5 flex-shrink-0"/>
        <span>{company?.address?.street}, {company?.address?.city}, {company?.address?.state}, {company?.address?.zipCode}, {company?.address?.country}</span>
      </p>
      <p className="text-white/60 flex gap-2 items-center">
        <MdOutlineLocalPhone className="size-4 sm:size-5"/>
        {company?.phone}
      </p>
      <p className="text-white/60 flex gap-2 items-center">
        <GoMail className="size-4 sm:size-5"/>
        {company?.email}
      </p>
    </div>
  </div>

  <div className="h-[1px] border border-white/20 mx-4"></div>

  {/* terms */}
  <div className="text-xs flex justify-center p-4 text-white/60 text-center">
    © 2025 Firecrackers. All rights reserved.
  </div>
</footer>
  );
};

export default Footer;  


{/* map */}
        {/* <div className="flex flex-row justify-between items-center gap-2 mt-6">
          <p className="flex items-center font-bold text-lg gap-2">
            Find us here
            <MdLocationPin className="text-[#d5754d] size-6" />
          </p>
          <p className="font-bold text-blue-500 underline text-xs">
            <a href="https://maps.app.goo.gl/VdV14BnpEVExSR8Z7">Open in Google Map</a>
          </p>
        </div> */}

        {/* <Map /> */}

      // {/* Bottom */}
      // <div className="text-center text-sm text-gray-500 border-t border-gray-300 pt-4">
      //   © Firecrackers. All rights reserved.
      // </div>