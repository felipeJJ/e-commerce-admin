
import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

interface FormData {
  map: any;
}

export default function Products() {
  const [produtos, setProdutos] = useState<FormData>([])
  useEffect(() => {
    axios.get('/api/apiProdutos').then(response => {
      setProdutos(response.data);
    })
  }, [])

  return (
    <Layout>   
        <Link href={'/produtos/novo'} className=" bg-blue-500 P-10 flex max-w-max p-1 rounded-md text-white"> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Adicionar produto
        </Link>
        <table className="basic mt-3">
          <thead>
            <tr>
              <td>Nome do produto</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto: {_id: string; nome: string }) => (
              <tr key={produto._id}>
                <td>{produto.nome}</td>
                <td>
                  <Link href={'/produtos/editar/'+produto._id}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                  Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </Layout>
  )
}
