import Form from "@/components/Form";
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditorDeProduto() {
    
    const router = useRouter()
    const {id} = router.query

    useEffect(() =>{
        if(!id){
            return
        }

        axios.get('/api/apiProdutos?id='+id).then(response => {
            console.log(response.data)
        })
    }, [id])

    return (
        <Layout>
        <h1>Edite o produto!</h1>
            <Form />
        </Layout>
    );
}