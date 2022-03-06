import Link from 'next/link'
import { useRouter } from 'next/router'
import {SyntheticEvent, useEffect, useState} from 'react'
import Layout from '../../components/Layout';
import axiosInstance  from '../../helpers/auth-interceptor'
import DefaultErrorPage from 'next/error'

interface IOrders{
    _id?: string,
    cake_name?: string,
    color?: string,
    size?: string,
    receipt?: string,
    status?: string,
    paid?: string,
    user?: IUser,
}


interface IUser{
    _id?: string,
    name?: string,
    profile_picture?: string,
    email?: string,
    role?: string 
}


const Order = () => {
    const [auth, setAuth] = useState(false);
    const router = useRouter();
    const {id} = router.query;
    const [order, setOrder] = useState<IOrders>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        let fetchData = async (oid) : Promise<void> => {
            await axiosInstance.get(`${process.env.API_URL}/orders/${oid}`)
            .then(result => {
                if(result.data == null || result.data == undefined){
                    setError(true)
                    return;
                }
                setError(false);
                setAuth(true);
                setOrder(result.data);
            }).catch(err => {
                if(err){
                    setError(true);
                }
            })
        }


        let componentMounted = true;
        if(id){
            fetchData(id);
            setLoading(false);
        }
        return () => { componentMounted = false }
    }, [id])

    const displayInformation = (e: SyntheticEvent) : void => {
        e.preventDefault();
        window.alert("shown if payment is not PAID");
    }

    return(
        <>
        {!error && <Layout auth={auth}>
           {loading ? (
           <h1 className="min-h-screen">
                Loading!
           </h1>) : (
               <div className="min-h-screen md:px-0 px-5">
               <div className="flex flex-row flex-wrap my-20 px-15 items-center justify-center h-full">
                   <div className="mb-3 xl:w-96 mr-10">
                            <label
                                htmlFor="exampleFormControlInput2"
                                className="form-label inline-block mb-2 text-gray-700 text-xl"
                                >ID</label
                            >
                            <input
                                type="text"
                                className="
                                form-control
                                block
                                w-full
                                px-4
                                py-2
                                text-xl
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
                                id="exampleFormControlInput2"
                                placeholder={order?._id}
                                disabled={true}
                            />
                        </div>
                   <div className="mb-3 xl:w-96 mr-10">
                            <label
                                htmlFor="exampleFormControlInput2"
                                className="form-label inline-block mb-2 text-gray-700 text-xl"
                                >Name on cake</label
                            >
                            <input
                                type="text"
                                className="
                                form-control
                                block
                                w-full
                                px-4
                                py-2
                                text-xl
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
                                id="exampleFormControlInput2"
                                placeholder={order?.cake_name}
                                disabled={true}
                            />
                        </div>
                   <div className="mb-3 xl:w-96 mr-10">
                            <label
                                htmlFor="exampleFormControlInput2"
                                className="form-label inline-block mb-2 text-gray-700 text-xl"
                                >Cake Color</label
                            >
                            <input
                                type="text"
                                className="
                                form-control
                                block
                                w-full
                                px-4
                                py-2
                                text-xl
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
                                id="exampleFormControlInput2"
                                placeholder={order?.color}
                                disabled={true}
                            />
                        </div>
                   <div className="mb-3 xl:w-96 mr-10">
                            <label
                                htmlFor="exampleFormControlInput2"
                                className="form-label inline-block mb-2 text-gray-700 text-xl"
                                >Size</label
                            >
                            <input
                                type="text"
                                className="
                                form-control
                                block
                                w-full
                                px-4
                                py-2
                                text-xl
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
                                id="exampleFormControlInput2"
                                placeholder={order?.size}
                                disabled={true}
                            />
                        </div>
                   <div className="mb-3 xl:w-96 mr-10">
                            <label
                                htmlFor="exampleFormControlInput2"
                                className="form-label inline-block mb-2 text-gray-700 text-xl"
                                >Payment Status</label
                            >
                            <input
                                type="text"
                                className="
                                form-control
                                block
                                w-full
                                px-4
                                py-2
                                text-xl
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
                                id="exampleFormControlInput2"
                                placeholder={order?.paid}
                                disabled={true}
                            />
                        </div>
                   <div className="mb-3 xl:w-96 mr-10">
                            <label
                                htmlFor="exampleFormControlInput2"
                                className="form-label inline-block mb-2 text-gray-700 text-xl"
                                >Delivery Status</label
                            >
                            <input
                                type="text"
                                className="
                                form-control
                                block
                                w-full
                                px-4
                                py-2
                                text-xl
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
                                id="exampleFormControlInput2"
                                placeholder={order?.status}
                                disabled={true}
                            />

                        </div>
                        
                        <div className="md:flex md:flex-col md:w-100  lg:flex lg:flex-row md:justify-between">
                                <Link href="/orders">
                                    <button className="border-2 md:mt-3 border-pink-500 text-pink-500 rounded-full px-6 lg:px-12 py-2 inline-block font-semibold
                                            hover:bg-pink-500 hover:text-white lg:mr-3">Go Back</button>
                                </Link>
                                <button onClick={displayInformation} className="border-2 md:mt-3 border-pink-500 text-pink-500 rounded-full px-6 lg:px-12 py-2 inline-block font-semibold
                                            hover:bg-pink-500 hover:text-white">Edit </button>
                            </div>
               </div>
            </div>          
           )
            }       
        </Layout>}
        {error && <DefaultErrorPage statusCode={404} />}
    </>
    );
}

export default Order;