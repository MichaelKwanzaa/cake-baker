import { useState, useEffect } from "react"
import Layout from "../components/Layout";
import axiosInstance from "../helpers/auth-interceptor";
import DefaultErrorPage from 'next/error'
import { NextPage } from "next";


interface IUser{
    _id?: string,
    name?: string,
    profile_picture?: string,
    email?: string,
    role?: string 
}

interface IReceipt{
    _id?: string,
    color_cost?: number,
    size_cost?: number,
    name_cost?: number,
    delivery_date: string,
    order_id: string,
    user_id: IUser
}

const Receipts: NextPage = () => {
        const [auth, setAuth] = useState(false);  
        const [user, setUser] = useState<IUser>({});
        const [receipts, setReceipts] = useState<IReceipt[]>([]);
        const [loadingElements, setLoadingElements] = useState(false);
        const [error, setError] = useState(false);


        useEffect(() => {
            const getCurrentUser = async (): Promise<void> => {
            await axiosInstance.get(`${process.env.API_URL}/users`)
            .then(result => {
              if(result.data){
                setError(false)
                setLoadingElements(true);
                setUser(result.data);
                setAuth(true);
                getReceipts(result.data);
            }
            }).catch(err => {
              if(err){
                setError(false)
            }
            })
        }

        const getReceipts = async (currentUser): Promise<void> => {
            if(currentUser.role === "CUSTOMER"){
                await axiosInstance.get("http://localhost:8080/api/receipts/user")
                .then(result => {
                    setReceipts(result.data)
                    setLoadingElements(false);
                })
            } else if(currentUser.role === "ADMIN"){
                await axiosInstance.get("http://localhost:8080/api/receipts")
                .then(result => {
                    setReceipts(result.data)
                    setLoadingElements(false);
                })
            }
        }

        getCurrentUser();

      }, [])

      const addValues = (n: number, n2: number, n3: number) : number => {
        return n + n2 + n3
    }


    return(
        <>
        {error && <DefaultErrorPage statusCode={401} />}
        {!error && <Layout auth={auth}>
        <div className="min-h-screen my-20 px-10">
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-center">
                        <thead className="border-b bg-gray-800">
                            <tr>
                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                ID
                            </th>
                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                Color Price
                            </th>
                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                Size Price
                            </th>
                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                Name Price
                            </th>
                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                Total Price
                            </th>
                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                Delivery Date
                            </th>
                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                Order ID
                            </th>
                            {user.role === "ADMIN" && <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                User
                            </th>}                            
                            </tr>
                        </thead>
                        <tbody> 
                            { !loadingElements &&
                                (receipts.map((r) => (
                                    <tr className="bg-white border-b" key={r._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{r._id}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                     {r.color_cost}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                     {r.size_cost}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                     {r.name_cost}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                     {addValues(r.color_cost, r.name_cost, r.size_cost)}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {r.delivery_date.slice(0, 10)}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {r.order_id}
                                    </td>
                                    {user.role === "ADMIN" && <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {r.user_id.name}
                                    </td>}
                                    </tr>
                                ))
                                )}       
                                {
                                    loadingElements && (<svg role="status" className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>)
                                }                    
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
        </div>
    </Layout>}
    </>
    )

}

export default Receipts;