import React, {useState, SyntheticEvent} from "react"
import axios from "axios";
import { FaRegEnvelope } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'
import { BsFillPersonLinesFill } from 'react-icons/bs'
import Link from 'next/link'
import {useRouter} from 'next/router';


interface IBody{
    name: string,
    email: string,
    password: string
}

const Register = () => {
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [rPassword, setRPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        if(password !== rPassword){
            setLoading(false);
            setError(true);
            setErrorMessage("Your passwords do not match!");
            setTimeout(() => {
                setError(false);
                setErrorMessage('');
            }, 2000)
        }

        const body: IBody = {
            name,
            email,
            password
        }

        try{
            const rawResponse = await fetch(`${process.env.API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  
             body:JSON.stringify(body)})
                
             const content = await rawResponse.json();

             if(content.auth){
                setLoading(false);
                localStorage.setItem('auth-token', content.token)
                await router.push('/')
             } else {
                setError(true);
                setErrorMessage(content.error)
             }

          
        }catch(error){
            console.log(error);
        }

    }

    return (
        <div className="flex flex-col min-h-screen">
        <div className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col lg:flex lg:flex-row lg:w-2/3 items-center w-95  max-w-4xl">
                <div className="w-3/5 p-5">
                <div className="lg:text-left font-bold">
                    <span className="text-pink-500">Cake</span>Shop
                </div>
                <div className="py-10">
                <h2 className="text-2xl font-bold text-pink-500 mb-2">
                        Create A New Account
                        </h2>
                        {error && (<div className="flex flex-col items-center justify-center flex-1 w-full text-center">
                            <div className="w-3/5 p-15 bg-red-700">
                                <h1 className="text-white text-sm">{errorMessage}</h1>
                            </div>
                        </div>)}
                        <div className="border-2 w-10 border-pink-500 inline-block mb-2"></div>
                        <div className="flex flex-col items-center my-10">
                        <form onSubmit={submit}>
                        <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                            <BsFillPersonLinesFill className="text-gray-400 m-2" />
                            <input type="text" name="name" onChange={e => setName(e.target.value)} placeholder="Full Name" className="bg-gray-100 outline-none text-sm flex-1" />
                        </div>
                        <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                            <FaRegEnvelope className="text-gray-400 m-2" />
                            <input type="email" name="email" onChange={e => setEmail(e.target.value)} placeholder="Email" className="bg-gray-100 outline-none text-sm flex-1" />
                        </div>
                        <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                            <MdLockOutline className="text-gray-400 m-2" />
                            <input type="password" name="password" onChange={e => setPassword(e.target.value)} placeholder="Password" className="bg-gray-100 outline-none text-sm flex-1" />
                        </div>
                        <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                            <MdLockOutline className="text-gray-400 m-2" />
                            <input type="password" name="repeat-password" onChange={e => setRPassword(e.target.value)} placeholder="Repeat Password" className="bg-gray-100 outline-none text-sm flex-1" />
                        </div>
                        <button 
                        className="border-2 border-pink-500 text-pink-500 rounded-full px-12 py-2 inline-block font-semibold
                        hover:bg-pink-500 hover:text-white"
                        >{!loading && "Create Account"} {loading && <svg role="status" className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>}</button>
                        </form>

                    </div>
                </div>

                </div>
                <div className="w-100 lg:w-2/5 bg-pink-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
                    <h2 className="text-3xl font-bold mb-2">Already Registered?</h2>
                    <div className="border-2 w-20 border-white inline-block mb-2"></div>
                    <p className="mb-2">Sign back in and order more cakes!</p>
                    <Link href="/login"><a className="border-2 border-white rounded-full px-12 py-2 inline-block
                    font-semibold hover:bg-white hover:text-pink-400">Sign In</a></Link>
                </div>
        
            </div>
        </div>
    </div>
    )
}

export default Register; 