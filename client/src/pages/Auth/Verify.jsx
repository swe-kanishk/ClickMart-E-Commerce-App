import React from 'react'
import verifyPng from "../../../src/components/assets/verify.png"

function Verify() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="card shadow-md w-[450px] m-auto rounded-lg bg-white p-5 px-8">
            <div className="text-center">
                <img src={verifyPng} alt="" width={'80'} />
            </div>
          <h3 className="text-center text-[20px] font-[500] text-black">
            Verify OTP
          </h3>
          
        </div>
      </div>
    </section>
  )
}

export default Verify
