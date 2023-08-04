import mongoose, { Schema } from "mongoose";

const CategoriaSchema = new Schema({
    nomeCategoria: {type: String, required:true},
    categoriaPai: {type: mongoose.Types.ObjectId, ref: 'Categoria'}
},
{
    timestamps: true
})

const Categoria = mongoose.models.Categoria || mongoose.model("Categoria", CategoriaSchema)
export default Categoria