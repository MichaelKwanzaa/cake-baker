import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Image from 'next/image'
import DefaultErrorPage from 'next/error'
import { NextPage } from "next";
import axiosInstance from "../helpers/auth-interceptor";

interface IUser{
    id?: string,
    name?: string,
    profile_picture?: string,
    email?: string,
    role?: string 
}

const Profile: NextPage = () => {
    const PF = "http://localhost:3000/static/images/"

    const [auth, setAuth] = useState(false);  
    const [user, setUser] = useState<IUser>({});
    const [imgSrc, setImgSrc] = useState(PF + "default-user-image.png");
    const [error, setError] = useState(false);

    
    
    useEffect(() => {
      const getCurrentUser = async (): Promise<void> => {
        await axiosInstance.get(`${process.env.API_URL}/users`)
        .then(result => {
          if(result.data){
            setError(false)
            setAuth(true);
            setUser(result.data)
            if(result.data.profile_picture.length > 1){
                setImgSrc(PF + result.data.profile_picture)
            } 
        }
        }).catch(err => {
          if(err){
            setError(false)
        }
        })
      }
        
      getCurrentUser();    
    }, [])


    return(
      <>
    {error && <DefaultErrorPage statusCode={401} />}

    {!error && <Layout auth={auth}>
        <div className="md:grid md:grid-cols-12 md:gap-6 my-20 md:px-20 px-5 flex flex-col">
            <div className="col-span-3">
                <div className="flex items-center justify-center">
                    <div className="bg-white w-full mt-10 rounded-lg">
                        <div className="flex items-center justify-center pt-10 flex-col">
                        <Image loader={() => imgSrc} src={imgSrc}
                            alt="user-profile-picture" width={50} 
                            height={50} className="rounded-full m-32"
                        />
                            <h1 className="text-gray-800 font-semibold lg:text-xl
                             lg:mt-5 md:text-base md:mt-3 text-sm">{user.name}</h1>
                            <h2 className="text-gray-400 text-xs p-4">Abuja, Nigeria</h2>

                        </div>
                        <div className="flex justify-between flex-wrap md:p-4">
                            <h1 className="text-xs md:uppercase text-gray-500">Current Role:</h1>
                            <h1 className="text-xs md:uppercase text-pink-500">{user.role}</h1>
                        </div>
                    </div>
                   
                </div>
            </div>
            <div className="md:col-span-9 ">
                <div className="flex items-center justify-center">
                    <div className="bg-white-400 w-full mt-10">
                    <div className="mb-3 xl:w-96 w-50">
    <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700"
      >Email Address</label
    >
    <input
      type="text"
      className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      id="exampleFormControlInput1"
      placeholder={user.email}
      disabled
    />
  </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>}
    </>
    )
}

export default Profile;