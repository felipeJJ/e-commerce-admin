import Layout from "@/components/Layout";
import Link from "next/link";

export default function products() {
  return (
    <Layout>   
        <Link href={'/produtos/novo'} className=" bg-blue-500 P-10 flex max-w-max p-1 rounded-md text-white"> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Adicionar produto
        </Link>
    </Layout>
  )
}
