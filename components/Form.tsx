import axios from 'axios';
import { redirect } from 'next/dist/server/api-utils';
import { useState, ChangeEvent } from 'react';

interface FormData {
  nome: string;
  descricao: string;
  preco: number;
}

export default function From() {
  const [goToProducts, setgoToProducts] = useState(false)
  const [data, setData] = useState<FormData>({
    nome: "",
    descricao: "",
    preco: 0,
  }); 

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await axios.post('/api/apiProdutos', data);
      setgoToProducts(true) 
    } catch (error) {
      console.error('Erro ao enviar produto:', error);
    }
  }

  if (goToProducts) {
    return redirect('/produtos': string)
  }
      

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  return (
      <form onSubmit={handleSubmit}>
          <h1 className="">Crie ou edite produtos!</h1>  
          <div className=" flex flex-col">
            <label className='flex flex-col'>
              <p className='pl-2'> Nome do produto </p> 
              <input 
                type="text" 
                placeholder="Nome do produto" 
                value={data.nome}
                onChange={handleChange}
                id="nome"
                />
            </label> 

            <label className='flex flex-col'>
              <p className='pl-2'> Descrição do produto </p>
              <textarea
                placeholder="Descrição do produto"
                value={data.descricao}
                onChange={handleChange}
                id="descricao"
                /> 
            </label> 

            <label className='flex flex-col'> 
              <p className='pl-2'> Preço do produto</p>
              <input
                type="number"  
                placeholder="Preço do produto" 
                value={data.preco === 0 ? "" : data.preco}
                onChange={handleChange}
                id="preco"
                />
            </label> 

            <button 
              type="submit"
              className="btn-primary">
              Salvar
            </button>  
          </div> 
      </form>   
  )
}
