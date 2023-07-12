import mongoose, {Schema} from "mongoose";
 
const ProdutoSchema = new Schema({
        nome: {type: String, required: true},
        descricao: String,
        preco: {type: Number, required: true},
        imagens: [{type:String}],
    },
    {
        timestamps: true,
    }
)

const Produto = mongoose.models.Produto || mongoose.model("Produto", ProdutoSchema)
export default Produto