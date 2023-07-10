import Produto from "../schemas/produto";
import database from "../lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

const postProduto = async (req: NextRequest, res: NextResponse) => {

    const {nome, descricao, preco} = new Produto(req)
    await database.connectMongo()
    await Produto.create({nome, descricao, preco})

    database.disconnectMongo()

   

    /* if(!database.connectMongo()) return false

    const newProduto = new Produto(queryProduto)
    return await newProduto.save()

    database.disconnectMongo() */
}

const produtoController = {
    postProduto
}
export default produtoController