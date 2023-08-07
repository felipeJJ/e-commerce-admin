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
        const { nomeCategoria, categoriaPai, _id } = req.body
        const updateData: any = { nomeCategoria }

        if (categoriaPai === '') {
            updateData.categoriaPai = null
        } else if (categoriaPai) {
            updateData.categoriaPai = categoriaPai
        } else {
            updateData.$unset = { categoriaPai: 1 }
        }

        const categoriaDoc = await Categoria.updateOne({ _id }, updateData)
        res.json(categoriaDoc)
    } 
    else if (method === 'DELETE'){
        const {_id} = req.query
        await Categoria.deleteOne({_id})
        res.json('categoria deleteada')
    }
    
}
