import React from "react";
import { FaTruckFast } from "react-icons/fa6";
import { PiWallet } from "react-icons/pi";
import { PiGiftLight } from "react-icons/pi";
import { RiCustomerServiceLine } from "react-icons/ri";
import { FiRepeat } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoChatbubblesOutline } from "react-icons/io5";
import { Button } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";

function Footer() {
  return (
    <>
    <footer className="py-6 bg-white border-t border-gray-300">
      <div className="container">
        <div className="flex items-center gap-5 border-gray-300 pb-6 justify-evenly">
          <div className="col flex flex-col items-center justify-center border px-3 py-2 pt-3 border-gray-300 rounded-lg group cursor-pointer">
            <FaTruckFast className="text-[50px] mb-2 text-gray-500 group-hover:translate-y-[-12px] group-hover:text-primary transition-all duration-500" />
            <h3 className="text-black font-semibold text-center">
              Free Shipping
            </h3>
            <p className="text-center text-gray-400 text-[14px] font-medium">
              For All Orders Over $100
            </p>
          </div>
          <div className="col flex flex-col items-center justify-center border px-3 py-2 pt-[15px] border-gray-300 rounded-lg group cursor-pointer">
            <FiRepeat className="text-[40px] mb-[15px] text-gray-500 group-hover:translate-y-[-12px] group-hover:text-primary transition-all duration-500" />
            <h3 className="text-black font-semibold text-center">
              30 Days Return
            </h3>
            <p className="text-center text-gray-400 text-[14px] font-medium">
              For an Exchange Product
            </p>
          </div>
          <div className="col flex flex-col items-center justify-center border px-3 py-2 pt-3 border-gray-300 rounded-lg group cursor-pointer">
            <PiWallet className="text-[50px] mb-2 text-gray-500 group-hover:translate-y-[-12px] group-hover:text-primary transition-all duration-500" />
            <h3 className="text-black font-semibold text-center">
              Secured Payment
            </h3>
            <p className="text-center text-gray-400 text-[14px] font-medium">
              Payment Cards Accepted
            </p>
          </div>
          <div className="col flex flex-col items-center justify-center border px-3 py-2 pt-3 border-gray-300 rounded-lg group cursor-pointer">
            <PiGiftLight className="text-[50px] mb-2 text-gray-500 group-hover:translate-y-[-12px] group-hover:text-primary transition-all duration-500" />
            <h3 className="text-black font-semibold text-center">
              Special Gifts
            </h3>
            <p className="text-center text-gray-400 text-[14px] font-medium">
              Our First Product Order
            </p>
          </div>
          <div className="col flex flex-col items-center justify-center border px-3 py-2 pt-3 border-gray-300 rounded-lg group cursor-pointer">
            <RiCustomerServiceLine className="text-[50px] mb-2 text-gray-500 group-hover:translate-y-[-12px] group-hover:text-primary transition-all duration-500" />
            <h3 className="text-black font-semibold text-center">
              Support 24/7
            </h3>
            <p className="text-center text-gray-400 text-[14px] font-medium">
              Contact us Anytime
            </p>
          </div>
        </div>
        <hr />
        <div className="footer flex py-8">
          <div className="part-1 w-1/4 border-r-2">
            <h2 className="text-xl font-semibold mb-6">Contact us</h2>
            <p className="text-[14px] pb-3 text-gray-500 font-medium">
              ClickMart - Mega Super Store <br /> Sector-63, Near Metro Station
              Noida
            </p>
            <Link
              className="link text-gray-600"
              to="mailto:cse.kanishkk@gmail.com"
            >
              shop@clickMart.com
            </Link>
            <span className="block text-primary font-medium text-lg my-3">
              (+91) - 800 555 0199
            </span>
            <div className="flex items-center gap-3 mt-5">
              <IoChatbubblesOutline className="text-4xl text-red-500" />
              <h3 className="font-medium leading-5">
                Online Chat <br /> Get Expert Help
              </h3>
            </div>
          </div>
          <div className="part-2 w-3/4 flex justify-evenly">
            <div className="col-1 w-1/5">
              <h2 className="text-xl font-semibold mb-6">Products</h2>
              <ul>
                <li className="list-none text-[14px] text-gray-500 font-medium mb-2 w-full">
                  <Link to="/" className="link">
                    New Products
                  </Link>
                </li>
                <li className="list-none text-[14px] text-gray-500 font-medium mb-2 w-full">
                  <Link to="/" className="link">
                    Best Sales
                  </Link>
                </li>
                <li className="list-none text-[14px] text-gray-500 font-medium mb-2 w-full">
                  <Link to="/" className="link">
                    Price Drop
                  </Link>
                </li>
                <li className="list-none text-[14px] text-gray-500 font-medium mb-2 w-full">
                  <Link to="/" className="link">
                    Contact us
                  </Link>
                </li>
                <li className="list-none text-[14px] text-gray-500 font-medium mb-2 w-full">
                  <Link to="/" className="link">
                    Sitemap
                  </Link>
                </li>
                <li className="list-none text-[14px] text-gray-500 font-medium mb-2 w-full">
                  <Link to="/" className="link">
                    Stores
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-2 w-1/5">
              <h2 className="text-xl font-semibold mb-6">Our Company</h2>
              <ul>
                <li className="list-none text-[14px] text-gray-500 font-medium mb-2 w-full">
                  <Link to="/" className="link">
                    About us
                  </Link>
                </li>
                <li className="list-none text-[14px] text-gray-500 font-medium mb-2 w-full">
                  <Link to="/" className="link">
                    Secure Payment
                  </Link>
                </li>
                <li className="list-none text-[14px] text-gray-500 font-medium mb-2 w-full">
                  <Link to="/" className="link">
                    Jobs
                  </Link>
                </li>
                <li className="list-none text-[14px] text-gray-500 font-medium mb-2 w-full">
                  <Link to="/" className="link">
                    Become Affilate
                  </Link>
                </li>
                <li className="list-none text-[14px] text-gray-500 font-medium mb-2 w-full">
                  <Link to="/" className="link">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-3 w-2/5">
              <h2 className="text-xl font-semibold mb-6">
                Connect with Developer
              </h2>
              <p className="text-[14px] pb-3 text-gray-500 font-medium">
                Connect with the developer to share feedback, report bugs, or
                explore collaboration opportunities—hire, innovate, and stay
                connected effortlessly!
              </p>
              <form className="mt-5 flex flex-col">
                <input
                  type="text"
                  className="py-2 bg-white px-3 focus:outline-none focus:border-purple-600 border-1 border border-gray-300 rounded-md w-full"
                  placeholder="Your Email Address"
                />
                <Button className="!bg-red-500 !w-fit hover:!bg-red-600 !text-white !my-2">
                  Submit
                </Button>
                <FormControlLabel required control={<Checkbox />} className="!text-[12px] mt-3 text-gray-500" label="By submitting this form, I agree to Clickmart's Terms and Policies." />
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <div className="bottom-strip border-t bg-white border-gray-300 py-3">
        <div className="container">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                <Link to="/" className="link p-[6px] border border-gray-400 rounded-full">
                    <FaFacebookF />
                </Link>
                <Link to="/" className="link p-[6px] border border-gray-400 rounded-full">
                    <FaYoutube />
                </Link>
                <Link to="/" className="link p-[6px] border border-gray-400 rounded-full">
                    <FaInstagram />
                </Link>
                <Link to="/" className="link p-[6px] border border-gray-400 rounded-full">
                    <FaPinterestP />
                </Link>
                <Link to="/" className="link p-[6px] border border-gray-400 rounded-full">
                    <FaXTwitter />
                </Link>
                </div>
                <p className="text-gray-800 text-[14px] font-medium">
                &copy; 2025 ClickMart. All Rights Reserved.
                </p>
                <div className="flex items-center">
                    <img className="h-[20px]" src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_blockpaymentlogo/views/img/master_card.png" alt="" />
                    <img className="h-[20px]" src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_blockpaymentlogo/views/img/paypal.png" alt="" />
                    <img className="h-[20px]" src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_blockpaymentlogo/views/img/carte_bleue.png" alt="" />
                    <img className="h-[20px]" src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_blockpaymentlogo/views/img/visa.png" alt="" />
                    <img className="h-[20px]" src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_blockpaymentlogo/views/img/american_express.png" alt="" />
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default Footer;
