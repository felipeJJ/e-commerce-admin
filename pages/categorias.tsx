import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal, SweetAlert2Props } from 'react-sweetalert2';

interface Categoria {
    _id: string;
    nomeCategoria: string;
    categoriaPai?: {
        _id: string;
        nomeCategoria: string;
    };
}

interface CategoriaForm {
    nome: string;
    pai: string;
}

interface CategoriasProps extends SweetAlert2Props {
    swal: any;
}

function Categorias({ swal }: CategoriasProps) {
    const [categoriaEditada, setCategoriaEditada] = useState<Categoria | null>(null);
    const [categoria, setCategoria] = useState<CategoriaForm>({
        nome: '',
        pai: '',
    });

    const [categoriasTabela, setCategoriasTabela] = useState<Categoria[]>([]);
    
    useEffect(() => {
        fetchCategorias();
    }, []);

    function fetchCategorias() {
        axios.get<Categoria[]>("/api/apiCategorias").then((result) => {
            setCategoriasTabela(result.data);
        });
    } 

    async function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const categoriaPaiId = categoria.pai ? categoria.pai : undefined;
        const requestData = {
            nomeCategoria: categoria.nome,
            categoriaPai: categoriaPaiId,
        };
        
        if (categoriaEditada) {
            try {
                await axios.put("/api/apiCategorias", { ...requestData, _id: categoriaEditada._id });
                setCategoriaEditada(null);
            } catch (error) {
                console.error('Erro ao editar categoria:', error);
            }
        } else {
            try {
                await axios.post("/api/apiCategorias", requestData);
            } catch (error) {
                console.error('Erro ao criar categoria:', error);
            }
        }
        
        setCategoria({ nome: '', pai: '' });
        fetchCategorias();
    }

    function editarCategoria(categoriaSelecionada: Categoria) {
        setCategoriaEditada(categoriaSelecionada);
        setCategoria({ nome: categoriaSelecionada.nomeCategoria, pai: categoriaSelecionada?.categoriaPai?._id || '' });
        fetchCategorias();
    }

    async function excluirCategoria(categoriaSelecionada: Categoria) {
        const result = await swal.fire({
            title: 'Deletar Categoria',
            text: `Tem certeza que deseja deletar a categoria "${categoriaSelecionada.nomeCategoria}"`,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Deletar',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            const { _id } = categoriaSelecionada;
            try {
                await axios.delete("/api/apiCategorias?_id=" + _id);
                fetchCategorias();
            } catch (error) {
                console.error('Erro ao excluir categoria:', error);
            }
        }
    }

    return (
        <Layout>
            <h1>Categorias de produtos</h1>
            <label className="ml-1" > 
                {categoriaEditada 
                    ? `Editar categoria "${categoriaEditada.nomeCategoria}"` 
                    : 'Nova categoria'} 
            </label>
            <form onSubmit={handleSave} className="flex gap-1">
                <input
                    type="text"
                    placeholder="Nome da categorias de produtos"
                    className="mb-0 w-2/4 mr-2"
                    onChange={(e) => setCategoria({ ...categoria, nome: e.target.value })}
                    value={categoria.nome}
                    >
                </input>
                <select
                    className="mb-0 w-2/4 mr-2"
                    value={categoria.pai}
                    onChange={(e) =>
                        setCategoria((prevCategoria) => ({
                        ...prevCategoria,
                        pai: e.target.value === '0' ? '' : e.target.value
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

export default withSwal(({ swal }: CategoriasProps) => (
    <Categorias swal={swal} />
));
