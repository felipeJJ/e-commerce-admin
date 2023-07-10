import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, ChangeEvent } from 'react';

interface FormData {
  nome: string;
  descricao: string;
  preco: number;
}

export default function Form() {

  const [goToProducts, setgoToProducts] = useState(false)
  const router = useRouter()

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
    router.push('/produtos')
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
