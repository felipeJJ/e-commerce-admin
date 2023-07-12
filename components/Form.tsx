/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, ChangeEvent, Key} from 'react';
import Spinner from './spinner';
import { ReactSortable } from 'react-sortablejs';

interface FormData {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagens?: any;  
}

export default function Form({_id, nome:nomeExixtente, descricao: descricaoExixtente, preco: precoExixtente, imagens: imagemExixtente}: FormData) {
  const [imagens, setImages] = useState(imagemExixtente || [])
  const [isUploading, setIsUploading] = useState(false)
  const [goToProducts, setgoToProducts] = useState(false)
  const router = useRouter()
  const [data, setData] = useState<FormData>({
    _id: '',
    nome: nomeExixtente || "",
    descricao: descricaoExixtente || "",
    preco: precoExixtente || 0,
  }); 

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if(_id){
      try {
        await axios.put('/api/apiProdutos', {...data, _id, imagens})
      } catch (error) {
        console.error('Erro ao enviar produto:', error);
      }
    } else{
      try {
        await axios.post('/api/apiProdutos', {...data, imagens});
      } catch (error) {
        console.error('Erro ao enviar produto:', error);
      }
      }
    
    setgoToProducts(true) 
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

  async function uploadImagens(ev: any) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true)
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/upload', data);
      setImages((oldImages: any) => {
        return [...oldImages, ...res.data.links];
      })
      setIsUploading(false)
    }
  }

  function setImagensOrder(imagens: any){
    setImages(imagens)
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

          <p className='pl-2 mb-2 text-blue-500'>Imagens do produto </p>
          <div className='mb-2 flex flex-wrap gap-2 items-center'>
          <ReactSortable list={imagens} setList={setImagensOrder} className='flex flex-wrap gap-2'>
            {!!imagens?.length && imagens.map((link: any) => (
              <div key={link} className=" flex flex-wrap ml-2">
                <img src={link} alt="imagens do produto" className="h-32 rounded-lg"/>
              </div>
              ))}
          </ReactSortable>
              {isUploading && (
                <div className=' h-32 p-1 bg-gray-200 flex items-center'>
                  <Spinner/>
                </div>
              )}
            <label className=' w-32 h-32 bg-gray-100 cursor-pointer ml-2 flex flex-col text-gray-400 rounded-lg justify-center items-center '> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
              </svg>
              Upload 
              <input type="file" onChange={uploadImagens} className='hidden'/>
            </label>
          </div>

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
