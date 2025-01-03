import React from 'react'
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom'
import { LuMousePointerClick } from "react-icons/lu";

function Logo() {
  return (
    <Link to="/" className="flex gap-2 items-center">
          <img src={logo} className="h-[40px]" alt="logo" />
          <h1 className="text-lg font-bold">ClickMart</h1>
          <LuMousePointerClick className="text-xl text-red-600" />
        </Link>
  )
}

export default Logo
