import axios from 'axios';
import { useState, ChangeEvent } from 'react';

interface FormData {
  nome: string;
  descricao: string;
  preco: number;
}

export default function From() {
  const [data, setData] = useState<FormData>({
    nome: "",
    descricao: "",
    preco: 0,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await axios.post('/api/produtos', data);
      console.log('Produto enviado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar produto:', error);
    }
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
              <label>Nome do produto</label> 
              <input 
                type="text" 
                placeholder="Nome do produto" 
                value={data.nome}
                onChange={handleChange}
                id="nome"
              />

              <label>Descrição do produto</label> 
              <textarea 
                placeholder="Descrição do produto"
                value={data.descricao}
                onChange={handleChange}
                id="descricao"
              /> 

              <label>Preço do produto</label> 
              <input
                type="number"  
                placeholder="Preço do produto" 
                value={data.preco === 0 ? "" : data.preco}
                onChange={handleChange}
                id="preco"
              />

              <button 
                  type="submit"
                  className="btn-primary">
                  Salvar
              </button>  
          </div> 
      </form>   
  )
}
