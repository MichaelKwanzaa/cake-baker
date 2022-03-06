import axiosInstance from "../helpers/auth-interceptor";
import { useRouter } from 'next/router'
import React, {useState, useEffect} from "react"

const PaymentStatus = () => {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const {status, tx_ref} = router.query;

    useEffect(() => {

        const getCurrentUser = async () => {
            await axiosInstance.get(`${process.env.API_URL}/users`)
            .then(result => {
              if(result.data){
                setAuth(true);
            }
            }).catch(err => {
              if(err){
                console.log(err)
              }
            })
        }

        const paymentCallBack = async () => {
            await axiosInstance.post(`${process.env.API_URL}/receipts`, {
                status: status,
                order_id: tx_ref
            })
        }

        const doThings = async () => {
            await getCurrentUser();
            await paymentCallBack() 
            setLoading(false)
        }
        
        doThings();
        
        if(status === "successful"){
            redirectToReceiptsPage();
        } else {
            redirectToHomepage();
        }
        

    }, [])

    const redirectToHomepage = () => {
        setTimeout(() => {
            router.push("/orders")
        }, 300)
    }

    const redirectToReceiptsPage = () => {
        setTimeout(() => {
            router.push("/receipts")
        }, 300)
    }

    return(
        <div className="flex flex-col min-h-screen">
            {
                loading ? (
                    <div>
                            Loading
                    </div>
                ) : (
                    <div className="my-20 px-50 h-80">
                        {status === "successful" && (
                            <div className="bg-white rounded-2xl shadow-2xl flex flex-col items-center w-full max-w-4xl">
                                <div className="w-full p-5">
                                    <h1>Status: Successful!</h1>
                                    <h2>Your order will be delivered in 2 days!</h2>
                                    <h2>Redirecting you back to receipts page!</h2>
                                </div>
                            </div>
                        )
                        }
                        {
                            status === "cancelled" && (
                            <div className="bg-white rounded-2xl shadow-2xl flex flex-col items-center w-full max-w-4xl">
                                <div className="w-full p-5">
                                        <h1>Status: Cancelled!</h1>
                                        <h4>Your order is still processing. You can call us at +2348025748960 for more information!</h4>
                                        <h2>Redirecting you back to orders page!</h2>
                                    </div>
                                </div>  
                            )
                        }
                        {
                            status === "failed" && (
                                <div className="bg-white rounded-2xl shadow-2xl flex flex-col items-center w-full max-w-4xl">
                                <div className="w-full p-5">
                                        <h1>Status: Failed!</h1>
                                        <h4>Your order is still processing. You can call us at +2348025748960 for more information</h4>
                                        <h2>Redirecting you back to orders page!</h2>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
            
        </div>
    )
}

export default PaymentStatus