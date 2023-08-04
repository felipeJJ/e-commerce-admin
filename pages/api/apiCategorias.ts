import database from "@/databese/lib/mongoose"
import Categoria from "@/databese/schemas/categoria"

export default async function handle(req: any, res: any){
    const {method} = req
    await database.connectMongo()

    if (method === 'GET'){
        res.json(await Categoria.find().populate('categoriaPai'))
    }

    else if (method === 'POST'){
        const {nomeCategoria, categoriaPai} = req.body
        const categoriaDoc = await Categoria.create({nomeCategoria, categoriaPai})
        res.json(categoriaDoc)
    } 
    else if (method === 'PUT') {
        const {nomeCategoria, categoriaPai, _id} = req.body;
        const categoriaDoc = await Categoria.updateOne({_id}, {nomeCategoria, categoriaPai})
        res.json(categoriaDoc);
      }
    
}
