import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from './Footer';
import Navbar from './Navbar';
import { useRouter } from 'next/router'


const Layout = ({children, auth}: any) => {

    //always checks if auth token is stored and validated in server. shows blank page if auth is not true suggesting to
    //the user to go back to the login or register page.
    if (!auth) return null

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Head>
                <title>Cake Baker</title>
                <link rel="icon" href="/favicon.ico" />
                </Head>
                {auth && <Navbar />}
                {auth && <main className="flex flex-col flex-1 w-full">
                    {children}
                </main>}
                {auth && <Footer />}
            </div>
        </>
       
    )
}

export default Layout