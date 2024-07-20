import Form from "@/components/Form";
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ProdutoInfo {
    _id: string;
    nome: string;
    descricao: string;
    preco: number;
  }

export default function EditorDeProduto() {
    const [produtoInfo, setProdutoInfo] = useState<ProdutoInfo | undefined>();
    const router = useRouter()
    const {id} = router.query

    useEffect(() =>{
        if(!id){
            return
        }

        axios.get('/api/apiProdutos?id='+id).then(response => {
            setProdutoInfo(response.data)
        })
    }, [id])

    return (
        <Layout>
        <h1>Edite o produto!</h1>
        {produtoInfo && (
            <Form categoria={undefined} {...produtoInfo}/>
        )}
        </Layout>
    );
}