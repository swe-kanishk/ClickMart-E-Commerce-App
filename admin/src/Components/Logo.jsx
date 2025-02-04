import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link className="logo border-gray-300 flex items-center gap-2 justify-start pl-2 py-2 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={"40px"}
          fill="none"
          viewBox="0 0 48 26"
        >
          <rect
            width="10.16"
            height="19.93"
            fill="currentColor"
            rx="5.08"
            transform="rotate(29.49 -5.18 20.77) skewX(.85)"
          ></rect>
          <rect
            width="10.16"
            height="25.62"
            fill="currentColor"
            rx="5.08"
            transform="matrix(.87 .492 -.48 .878 27.17 0)"
          ></rect>
          <rect
            width="10.16"
            height="10.25"
            fill="currentColor"
            opacity=".5"
            rx="5.08"
            transform="rotate(29.49 -8.24 75.34) skewX(.85)"
          ></rect>
        </svg>
        <h2 className="font-[600]">ClickMart Admin</h2>
      </Link>
  )
}

export default Logo
