import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav() {

    const inactiveLink = 'flex gap-2 p-5'
    const activeLink = inactiveLink+" relative bg-gray-100 text-blue-500 rounded-l-full before:content-[''] before:absolute before:w-12 before:h-12 before:transparent before:left-40 before:top-16 before:rounded-full before:filter-none before:shadow-[32px_-32px_1px_10px_rgba(243,244,246,1)] after:content-[''] after:absolute after:w-12 after:h-12 after:transparent after:left-40 after:-top-12 after:rounded-full after:shadow-[32px_32px_1px_10px_rgba(243,244,246,1)]"
    const router = useRouter()
    const {pathname} =  router

    return (
        <div className=" text-white w-1/5 overflow-hidden">
            <div className="border-l-8 border-solid h-full border-blue-500 p-5 pr-0">
                <a className="flex gap-1 mb-20 mt-5 ml-5 mr-10 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                    </svg>
                    <span>
                        Jorgim Store
                    </span>
                </a>
                <nav className="flex flex-col gap-2 ml-1">
                    <Link href="/" className={pathname === '/' ? activeLink : inactiveLink}> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        Pedidos
                    </Link>
                    <Link href="/produtos" className={pathname.includes('/produtos')? activeLink : inactiveLink}> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                        Produtos 
                    </Link>
                </nav>
            </div>
        </div>
    )
}
