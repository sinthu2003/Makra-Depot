// import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#fff9e6] text-gray-800 mt-10 px-10 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold italic text-[#d5754d]">Eshop</h2>
          <p className="mt-2 font-bold">Shop smarter, live better.</p>
        </div>

        {/* Contact */}
        <div className="md:text-right text-center">
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">Email: eshop@gmail.com</p>
          <p className="text-sm mt-1">Phone:123-4567</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-300 pt-4">
        © Eshop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;