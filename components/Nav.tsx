import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "./Logo";

export default function Nav({show}: any) {

    const inactiveLink = 'flex gap-2 p-4'
    const activeLink = inactiveLink+" relative bg-gray-100  text-black rounded-l-full before:content-[''] before:absolute before:w-12 before:h-12 before:transparent before:right-0 before:top-14 before:rounded-full before:shadow-[32px_-32px_1px_12px_rgba(243,244,246,1)] after:content-[''] after:absolute after:w-12 after:h-12 after:transparent after:right-0 after:-top-12 after:rounded-full after:shadow-[32px_32px_1px_10px_rgba(243,244,246,1)]"
    const router = useRouter()
    const {pathname} =  router

    return (
        <div className={(show? 'left-0' : '-left-full')+" bg-gray-300 text-white top-0 fixed w-full h-screen md:bg-gray-300 md:static md:w-auto transition-all"}>
            <div className="h-full pl-6 p-5 pr-0">
                <Logo/>
                <nav className="flex flex-col gap-2 ml-1">
                    <Link href="/" className={pathname === '/' ? activeLink : inactiveLink}> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        Pedidos
                    </Link>
                    <Link href="/categorias" className={pathname === '/categorias' ? activeLink : inactiveLink}> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        Categorias
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
