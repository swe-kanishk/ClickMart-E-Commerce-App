import { Button } from "@mui/material";
import React from "react";

import TextField from "@mui/material/TextField";
import AccountSidebar from "./AccountSidebar";

function MyAccount() {
  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="left-col w-[20%]">
          <AccountSidebar />
        </div>
        <div className="right-col w-[80%]">
            <div className="card bg-white p-5 shadow-md rounded-md">
                <h2 className="pb-3">My Profile</h2>
                <hr />
                <form className="mt-5">
                    <div className="flex items-center gap-5">
                    <div className="w-[50%]">
                        <TextField label="Full Name" className="w-full" variant="outlined" size="small" />
                    </div>
                    <div className="w-[50%]">
                        <TextField label="Email" type="email" className="w-full" variant="outlined" size="small" />
                    </div>
                    </div>
                    <div className="flex items-center mt-4 gap-5">
                    <div className="w-[50%]">
                        <TextField label="Phone Number" className="w-full" variant="outlined" size="small" />
                    </div>
                    </div>
                    <br />
                    <div className="flex items-center gap-5">
                        <Button className="!capitalize !bg-red-500 !text-white hover:!bg-black">Save</Button>
                        <Button className="!capitalize !text-red-500 hover:!bg-gray-100">Cancel</Button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </section>
  );
}

export default MyAccount;
