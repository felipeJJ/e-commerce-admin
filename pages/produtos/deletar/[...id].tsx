import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ProdutoInfo {
  nome: string;
}

export default function DeletaProduto(){
    const router = useRouter();
    const [produtoInfo,setProdutoInfo] = useState<ProdutoInfo | undefined>();
    const {id} = router.query;
    useEffect(() => {
      if (!id) {
        return;
      }
      axios.get('/api/apiProdutos?id='+id).then(response => {
        setProdutoInfo(response.data);
      });
    }, [id]);
    function voltaPagina() {
      router.push('/produtos');
    }
    async function deletaProduto() {
      await axios.delete('/api/apiProdutos?id='+id);
      voltaPagina();
    }
    return (
      <Layout>
        <h1 className="text-center">Tem certeza de que quer deletar
        &nbsp;&quot;{produtoInfo?.nome}&quot;?
        </h1>
        <div className="flex gap-2 justify-center">
          <button
            onClick={deletaProduto}
            className="btn-red">Yes</button>
          <button
            className="btn-default"
            onClick={voltaPagina}>
            NO
          </button>
        </div>
      </Layout>
    );
  }