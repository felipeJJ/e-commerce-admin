import { NextRequest, NextResponse } from "next/server";
import produtoController from "../../databese/controllers/ProdutoController";
import database from "@/databese/lib/mongoose";
import Produto from "@/databese/schemas/produto";

/* export default async function handlerApi(req: any, res: any) {
  await produtoController.postProduto(req.body, res.body)
  
  res.status(200).json({message: 'Produto created successfully'})
}

 */
export default async function handlerApi(req: any, res: any){
  const {method} = req
  await database.connectMongo()
  if (method === 'POST'){
    const {nome, descricao, preco} = req.body
    const produtoDoc = await Produto.create({
      nome,descricao,preco
    })
    res.json(produtoDoc)
  }
}

