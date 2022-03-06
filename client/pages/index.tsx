import type { NextPage } from 'next'
import { useEffect, useState, SyntheticEvent } from 'react'
import Layout from '../components/Layout'
import {useRouter} from 'next/router';
import axiosInstance  from '../helpers/auth-interceptor'
import DefaultErrorPage from 'next/error'


import {
  default as axios,
} from 'axios';

interface IBody{
  cake_name: string,
  size: string
  color: string
}

const Home: NextPage = () => {
  const [auth, setAuth] = useState(false);  
  const [cakeName, setCakeName] = useState('');
  const [cakeColor, setCakeColor] = useState('WHITE');
  const [cakeSize, setCakeSize] = useState('SMALL');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [apiError, setApiError] = useState(false);
  const router = useRouter();
  const Image = "http://localhost:3000/static/images/hero-image.jpg"
  
  useEffect(() => {
    
    const getCurrentUser = async (): Promise<void> => {
        await axiosInstance.get(`${process.env.API_URL}/users`)
        .then(result => {
          if(result.data === null || result.data === undefined){
            setApiError(true)
          }else if(result.data){
            setApiError(false);
            setAuth(true);
          }
        }).catch(err => {
          if(err){
            setApiError(true)
            console.log(err)
          }
        })
    }
    getCurrentUser();    
  }, [])

  const orderCake = async (e: SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();
    let data = localStorage.getItem('auth-token');

    const config ={
      headers: {
        'Content-Type': "application/json",
        'x-access-token': data
      }
    }
    const body: IBody = {
      cake_name: cakeName,
      size: cakeSize,
      color: cakeColor
    }

    try{
      
      await axiosInstance.post(`${process.env.API_URL}/orders/order`, body)
      .then(async (result: any) => {
        if(result.status === 200){
          setLoading(false);
          router.push({pathname: '/payment', query: {
              oid: result.data.id,
              price: result.data.price
          }})
        }
      })
    }catch(error){  
      setLoading(false)
      setError(true);
      setErrorMessage(error.message)
    }

  }

  return (
    <>
    {apiError && <DefaultErrorPage statusCode={401} /> }
    {!apiError && <Layout auth={auth}>
        <div className="flex flex-col min-h-screen m-10">
            <div className="flex flex-col items-center justify-center flex-1 w-full md:px-20 text-center">
                <div className="bg-white rounded-3xl shadow-2xl flex flex-col lg:flex lg:flex-row lg:w-4/5 items-center w-95  md:max-w-4xl">
                  <div className="lg:w-3/5 w-100">
                      <div className="lg:text-left font-bold text-2xl pt-10 pl-5">
                        <span className="text-pink-200">Order</span> your cake now!
                      </div>
                      {error && (<div className="flex flex-col items-center justify-center flex-1 w-full text-center">
                            <div className="w-3/5 p-15 bg-red-700">
                                <h1 className="text-white text-sm">{errorMessage}</h1>
                            </div>
                        </div>)}
                      <div className="md:p-20 p-3">
                          <form onSubmit={orderCake}>
                          <h3>What text would you like on your cake? <p>(Leave empty if none)</p></h3>
                            <div className="bg-gray-100 md:w-85 p-2 flex items-center mb-10">
                            <input type="text" name="name_on_cake" placeholder="Example: Happy Birthday Michael!" onChange={(e) => setCakeName(e.target.value)}
                            className="bg-gray-100 outline-none text-sm flex-1" required />
                            </div>

                            <h3>What color would you like your cake to be?</h3>
                            <div className='inline-block-relative w-85'>
                            <select onChange={(e) => setCakeColor(e.target.value)} className="form-select form-select-lg mb-3 
                              appearance-none
                              block
                              w-full
                              px-4
                              py-2
                              text-xl
                              font-normal
                              text-gray-700
                              bg-white bg-clip-padding bg-no-repeat
                              border border-solid border-gray-300
                              rounded
                              transition
                              mb-10
                              ease-in-out
                              m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label=".form-select-lg example">
                              <option value="WHITE">White</option>
                              <option value="GREEN">Green</option>
                              <option value="YELLOW">Yellow</option>
                              <option value="PURPLE">Purple</option>
                              <option value="BLUE">Blue</option>
                              <option value="BLACK">Black</option>
                              <option value="ORANGE">Orange</option>
                              <option value="RED">Red</option>
                            </select>
                            </div>

                            <h3>What size would you like your cake to be?</h3>
                            <div className='inline-block-relative w-85'>
                            <select onChange={(e) => setCakeSize(e.target.value)} className="form-select form-select-lg mb-3
                              appearance-none
                              block
                              w-full
                              px-4
                              py-2
                              text-xl
                              font-normal
                              text-gray-700
                              bg-white bg-clip-padding bg-no-repeat
                              border border-solid border-gray-300
                              rounded
                              transition
                              ease-in-out
                              mb-10
                              m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label=".form-select-lg example">
                              <option value="SMALL">Small</option>
                              <option value="MEDIUM">Medium</option>
                              <option value="LARGE">Large</option>
                            </select>

                            <button
                            className="border-2 border-pink-500 text-pink-500 rounded-full px-6 lg:px-12 py-2 inline-block font-semibold
                            hover:bg-pink-500 hover:text-white"
                            >{!loading && "Place Order"} {loading && <svg role="status" className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>}</button>
                            </div>
                          
                          </form>
                      </div>
                  </div>
                  <div className="md:w-2/5 w-full relative">
                      <div className="h-screen w-full"
                      style={{
                        backgroundSize: "cover",
                        backgroundImage: `url(${Image})`,
                        zIndex: '-1'
                      }}></div>
                  </div>
                </div>
            </div>
        </div>
    </Layout>}
    </>
  )
}


export default Home
