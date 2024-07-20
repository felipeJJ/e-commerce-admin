import Form from "@/components/Form";
import Layout from "@/components/Layout";

export default function NovoProduto() {
  return (
    <Layout>
      <h1>Crie novos produtos!</h1>  
      <Form _id={""} nome={""} descricao={""} preco={0} categoria="" />
    </Layout>
  )
} 
