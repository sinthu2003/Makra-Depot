// import React from 'react'

import { MdLocationPin, MdOutlineLocalPhone } from "react-icons/md";
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
    <footer className="bg-gray-900 dark:bg-black text-white font-inter flex py-5 flex-col">
      {/* showcase */}
        <div className="flex items-center justify-center gap-30 p-10">
            <div className="flex items-center gap-2">
                <p className="p-2 rounded-lg bg-[#d5754d]"><FaShippingFast className="size-8 text-black"/></p>
                <p className="font-semibold text-md flex flex-col gap-1">Fast Shipping<span className="font-medium text-white/80 text-xs">Quick delivery across India</span></p>
            </div>
            <div className="flex items-center gap-2">
                <p className="p-2 rounded-lg bg-[#d5754d]"><FaShippingFast className="size-8 text-black"/></p>
                <p className="font-semibold text-md flex flex-col gap-1">Secure Payment<span className="font-medium text-white/80 text-xs">100% secure transactions</span></p>
            </div>
            <div className="flex items-center gap-2">
                <p className="p-2 rounded-lg bg-[#d5754d]"><FaShippingFast className="size-8 text-black"/></p>
                <p className="font-semibold text-md flex flex-col gap-1">Premium Quality<span className="font-medium text-white/80 text-xs">Certified products only</span></p>
            </div>
        </div>

        <div className="h-[1px] border border-white/20"></div>

        {/* contact - link */}
        <div className="flex py-10 justify-center gap-10 px-30">
            {/* desc  */}
            <div className="flex flex-col gap-3 w-full">
                <p className="flex gap-1 items-center"><GiFireworkRocket  className="p-2 rounded-lg bg-[#d5754d] size-8 text-lg" />
                <span className="font-bold text-white text-lg">{company?.companyName}</span></p>

                <p className="font-medium text-white/60 text-sm word-break">Your trusted source for premium fireworks and celebration supplies. Making every occasion memorable with quality products.</p>

                {/* social media icons */}
                <p className="flex gap-2">
                    <a href={company?.socialMedia?.facebook} className="p-2 bg-white/10 rounded-lg"><LuFacebook /></a>
                    <a href={company?.socialMedia?.instagram} className="p-2 bg-white/10 rounded-lg"><FaXTwitter /></a>
                    <a href={company?.socialMedia?.twitter} className="p-2 bg-white/10 rounded-lg"><FaInstagram /></a>
                    <a href={company?.socialMedia?.youtube} className="p-2 bg-white/10 rounded-lg"><AiOutlineYoutube /></a>
                </p>
            </div>

            {/* links */}
            <div className="flex flex-col gap-2 w-full text-sm">
                <p className="font-bold ">Quick Links</p>
                <Link to="/products"><p className=" text-white/60 hover:text-white cursor-pointer">All Products</p></Link>
                <Link to="/categories"><p className=" text-white/60 hover:text-white cursor-pointer">Categories</p></Link>
                <Link to="/brands"><p className=" text-white/60 hover:text-white cursor-pointer">Brands</p></Link>
                <p className=" text-white/60 hover:text-white cursor-pointer">About Us</p>
            </div>

            {/* Service */}
            <div className="flex flex-col gap-2 w-full text-sm">
                <p className="font-bold">Customer Service</p>
                <p className="text-white/60 hover:text-white cursor-pointer" onClick={()=>goTo()}>Contact Us</p>
                <p className="text-white/60 hover:text-white cursor-pointer">Shipping Info</p>
                <p className="text-white/60 hover:text-white cursor-pointer">Track Order</p>
            </div>

            {/* mail */}
            <div className="flex flex-col gap-2 w-full text-sm">
                <p className="font-bold text-md">Get in Touch</p>
                <p className="text-white/60 flex gap-2"><IoLocationOutline className="size-8"/> {company?.address?.street}, {company?.address?.city}, {company?.address?.state}, {company?.address?.zipCode}, {company?.address?.country}</p>
                <p className="text-white/60 flex gap-2 items-center"><MdOutlineLocalPhone/> {company?.phone}</p>
                <p className="text-white/60 flex gap-2 items-center"><GoMail/> {company?.email}</p>
            </div>
        </div>

        <div className="h-[1px] border border-white/20"></div>

        {/* terms */}
        <div className="text-xs flex justify-center p-5 text-white/60">© 2025 Firecrackers. All rights reserved.</div>
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