import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout';
import axiosInstance from '../helpers/auth-interceptor';


interface IUser{
    _id?: string,
    name?: string,
    profile_picture?: string,
    email?: string,
    role?: string 
}

const Payment = () => {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState<IUser>(null);
    const router = useRouter();
    const {oid, price} = router.query;


    useEffect(() => {
    
        const getCurrentUser = async () => {
            await axiosInstance.get(`${process.env.API_URL}/users`)
            .then(result => {
              if(result.data){
                setAuth(true);
                setUser(result.data);
            }console.log
            }).catch(err => {
              if(err){
                console.log(err)
              }
            })
        }

        getCurrentUser();
    }, [])

    return(
        <Layout auth={auth}>
            <div className="flex flex-col min-h-screen">
                <div className="flex flex-col items-center justify-center flex-1 w-full text-center min-h-full">
                    <div className="bg-white rounded-2xl flex justify-center flex-col items-center shadow-2xl flex flex-col lg:flex lg:flex-row lg:w-2/3 items-center w-95 max-w-4xl">
                        <form method="POST" action="https://checkout.flutterwave.com/v3/hosted/pay">
                            <div className="w-full p-5 ">

                                <div>
                                    <h1 className="text-sm md:text-base uppercase text-gray-500">You have successfully placed your order!</h1>
                                    <h1 className="text-sm md:text-base uppercase text-gray-500">Please click the button to pay!</h1>
                                    <h2 className="text-sm md:text-base uppercase text-gray-500">Your order is <span className="text-sm uppercase text-green-400">₦{price}</span></h2>
                                </div>
                                <input type="hidden" name="public_key" value="FLWPUBK_TEST-e35ab0036230a0ce1de1fe00c2adaa74-X" />
                                <input type="hidden" name="customer[email]" value={user?.email}/>
                                <input type="hidden" name="customer[name]" value={user?.name}/>
                                <input type="hidden" name="tx_ref" value={oid} />
                                <input type="hidden" name="amount" value={price} />
                                <input type="hidden" name="currency" value="NGN" />
                                <input type="hidden" name="meta[token]" value="54" />
                                <input type="hidden" name="redirect_url" value="http://localhost:3000/payment-status" />
                                <button type="submit" id="start-payment-button" className="border-2 border-white rounded-full px-12 py-2 inline-block bg-pink-400 text-white
                                        font-semibold hover:bg-white hover:text-pink-400">Pay Now</button>
                        </div>
                        </form>
            </div>
        </div>
        </div>

        </Layout>
    )
}

export default Payment;