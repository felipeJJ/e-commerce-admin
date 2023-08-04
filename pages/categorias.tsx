import Layout from "@/components/Layout"
import axios from "axios"
import { useEffect, useState } from "react"

interface Categoria {
    _id: string;
    nomeCategoria: string;
    categoriaPai?: {
        _id: string;
        nomeCategoria: string;
    }
}

export default function Categorias() {
    const [categoriaEditada, setCategoriaEditada] = useState<Categoria>({
        _id: '',
        nomeCategoria: '',
        categoriaPai: {
            _id: '',
            nomeCategoria: '',
        }   
    })
    const [categoria, setCategoria] = useState<{
        nome: string;
        pai: string;
      }>({
        nome: '',
        pai: '',
    })
    

    const [categoriasTabela, setCategoriasTabela] = useState<Categoria[]>([])
    useEffect(() => {
        fetchCategorias()
    }, [])

    function fetchCategorias() {
        axios.get("/api/apiCategorias").then((result) => {
        setCategoriasTabela(result.data)
        })
    } 

    async function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const categoriaPaiId = categoria.pai ? categoria.pai : undefined;
                const requestData = {
                    nomeCategoria: categoria.nome,
                    categoriaPai: categoriaPaiId,
                }
        if(categoriaEditada){
            try {
                axios.put("/api/apiCategorias", {...requestData, _id: categoriaEditada._id})
            } catch (error) {
                
            }

        } else {
            try {
                await axios.post("/api/apiCategorias", requestData);
            } catch (error) {
            }
        }
        setCategoria({ nome: '', pai: '' });
        fetchCategorias();
    }
  
  
    function editarCategoria(categoriaSelecionada: Categoria){
        setCategoriaEditada(categoriaSelecionada)
        setCategoria({nome: categoriaSelecionada.nomeCategoria, pai: categoriaSelecionada?.categoriaPai?._id || ''})
        console.log(categoriaSelecionada)
    }

    function excluirCategoria(categoria: Categoria){
    
    }


  return (
    <Layout>
        <h1>Categorias de produtos</h1>
        <label className="ml-1" > 
            {categoriaEditada 
                ? `Editar categoria ${categoriaEditada.nomeCategoria}` 
                : 'Nova categoria'} 
        </label>
        <form onSubmit={handleSave} className="flex gap-1">
            <input
            type="text"
            placeholder="cire novas categorias de produtos"
            className="mb-0 w-full"
            onChange={(e) => setCategoria({ ...categoria, nome: e.target.value })}
            value={categoria.nome}
            ></input>
            <select
                className="mb-0"
                value={categoria.pai}
                onChange={(e) =>
                    setCategoria((prevCategoria) => ({
                    ...prevCategoria,
                    pai: e.target.value,
                    }))
                }
                name="filiacao de categorias"
            >
            <option value="0">Sem filiação</option>
            {categoriasTabela.length > 0 &&
                categoriasTabela.map((cat) => (
                <option key={cat._id} value={cat._id}>
                    {cat.nomeCategoria}
                </option>
                ))}
            </select>
            <button type="submit" className="btn-primary">
            salvar
            </button>
        </form>
        <table className="basic mt-4">
            <thead>
            <tr>
                <td> Nome da categoria </td>
                <td> Categoria pai</td>
                <td></td>
            </tr>
            </thead>
            <tbody>
            {categoriasTabela.length > 0 &&
                categoriasTabela.map((cat) => (
                <tr key={cat._id}>
                    <td>{cat.nomeCategoria}</td>
                    <td>{cat?.categoriaPai?.nomeCategoria}</td>
                    <td>
                    <div className=" flex flex-wrap justify-center content-center  ">
                        <button
                            onClick={() => editarCategoria(cat)}
                            className="btn-secondary m-1"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => excluirCategoria(cat)}
                            className="btn-secondary m-1"
                        >
                            excluir
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </Layout>
  );
}
