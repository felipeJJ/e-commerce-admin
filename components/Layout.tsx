import Nav from "@/components/Nav";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({children}: any) {

  const [showNav, setShowNav] = useState(false)

  return (
    <div className="md:bg-gray-300 bg-gray-200 min-h-screen ">
      <div className="md:hidden p-2">
        <button onClick={()=> setShowNav(true)} className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <Logo />
      </div>
      <div className="flex ">
        <Nav show={showNav}/>
        <div className="w-full bg-gray-100 rounded-md p-12 md:mr-2 md:my-2"> 
            {children}
        </div>    
      </div>
    </div>
    
  )
}
