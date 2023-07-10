import mongoose, {Schema} from "mongoose";
 
const ProdutoSchema = new Schema({
        nome: String,
        descricao: String,
        preco: Number,
    },
    {
        timestamps: true,
    }
)

const Produto = mongoose.models.Produto || mongoose.model("Produto", ProdutoSchema)
export default Produto