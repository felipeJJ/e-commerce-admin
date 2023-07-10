import database from "@/databese/lib/mongoose";
import Produto from "@/databese/schemas/produto";


export default async function handlerApi(req: any, res:any){

  const {method} = req
  await database.connectMongo()

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Produto.findOne({_id:req.query.id}));
    } else {
      res.json(await Produto.find());
    }
  }

  else if (method === 'POST'){
    const {nome, descricao, preco} = req.body
    const produtoDoc = await Produto.create({
      nome,descricao,preco
    })
    res.json(produtoDoc)
  }
}

