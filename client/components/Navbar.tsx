import type { NextPage } from 'next'
import React, { useState } from "react"
import Link from "next/link"
import {GiHamburgerMenu} from "react-icons/gi" 
import {AiOutlineClose} from "react-icons/ai"
import { useRouter } from 'next/router';
import { FiLogOut } from 'react-icons/fi'

const Navbar: NextPage = () => {
    const [isOpen, setIsOpen] = useState(false); //for mobile view
    const router = useRouter();
    
    //removes current token from storage and pushes user to login page
    const userLogOut = async () => {
        localStorage.removeItem('auth-token');
        await router.push("/login");
    }

    let links = [
            {name: "Home", link: "/"},
            {name: "Orders", link: "/orders"},
            {name: "Receipts", link: "/receipts"},
            {name: "Profile", link: "/profile"}
        ];

    return (
        <div className="shadow-md w-full fixed top-0 left-0 z-50">
            <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
                <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800"> 
                    Cake<span className="text-pink-500">Shop</span>
                </div>
                <div onClick={() => setIsOpen(!isOpen)}  className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
                    {isOpen ? <AiOutlineClose /> : <GiHamburgerMenu /> }
                </div>
                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute 
                md:static bg-white md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9 
                transition-all duration-500 ease-in ${isOpen ? 'top-20' : 'top-[-490px]'} opacity-100 `}>
                    {
                        links.map((link) => (
                        <Link href={link.link} key={link.name}>
                            <li className="md:ml-8 text-base md:my-0 my-7 cursor-pointer">
                                <a className="text-gray-800 hover:text-pink-300 duration-500">
                                    {link.name}
                                </a>
                            </li>
                        </Link>
                        ))
                    }
                <li className="md:ml-8 text-base md:my-0 my-7 cursor-pointer">
                    <a className="text-gray-800 hover:text-pink-300 duration-500" onClick={userLogOut}>
                        <FiLogOut />
                    </a>
                </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar