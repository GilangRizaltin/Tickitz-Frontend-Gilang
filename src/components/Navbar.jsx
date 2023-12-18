/* eslint-disable react/prop-types */
// import React from "react";
import { Link } from "react-router-dom";
import getImageUrl from "../utils/imageGetter";
import { useSelector } from 'react-redux';

function Navbar(props) {
  const userAvailable = useSelector(state => state.user.isUserAvailable);
  return (
    <nav className="w-full flex justify-between py-4 px-5 items-center font-montserrat bg-light md:px-11 lg:px-11 xl:px-[130px] border-b border-[#E8E8E8] font-mulish">
      <div className="nav-start">
        <div className="flex gap-x-4 items-center">
          <div>
            <img
              src={getImageUrl("Tickitz", "svg")}
              alt="logo"
              className="w-20 h-10 md:w-28 md:h-14 lg:w-[130px] lg:h-[51px]"
            />
          </div>
        </div>
      </div>
      <div className="nav-mid text-[#0F172A] hidden lg:flex lg:gap-x-[60px]">
        <Link to="/" className="text-sm">
          Home
        </Link>
        <a href="#movies" className="text-sm">
          Movie
        </a>
      </div>
      {!userAvailable ? 
      (<div className="nav-end hidden lg:flex lg:gap-x-4 lg:items-center">
        <Link
          to="/login"
          className="border-2 border-primary py-3 px-4 rounded-md text-primary focus:ring-2 text-sm"
        >
          SignIn
        </Link>
        <Link
          to="/register"
          className="border-2 border-primary py-3 px-4 rounded-md text-[#F8FAFC] bg-primary focus:ring-2 text-sm"
        >
          Sign Up
        </Link>
      </div>) : 
      (<div className="nav-end hidden lg:flex lg:gap-x-4 lg:items-center">
        <div className="hidden lg:flex lg:gap-x-4 lg:items-center cursor-pointer">
          <p>Location</p>
          <ion-icon name="chevron-down-outline"></ion-icon>
        </div>
        <div className="cursor-pointer flex items-center">
          <ion-icon name="search-outline"></ion-icon>
        </div>
        <img src={getImageUrl("spiderman", "png")} alt="" height="56px" width="56px" className="rounded-full w-[56px] h-[56px] cursor-pointer"/>
      </div>)}
      <button className="lg:hidden" onClick={() => props.isClick()}>
        <img
          src={getImageUrl("burger-menu", "svg")}
          alt="burger-menu"
          className="w-6 h-6 md:w-8 md:h-8"
        />
      </button>
    </nav>
  );
}

export default Navbar;
