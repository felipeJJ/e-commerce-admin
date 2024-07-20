/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, ChangeEvent, Key, useEffect} from 'react';
import Spinner from './spinner';
import { ReactSortable } from 'react-sortablejs';
import CurrencyInput from 'react-currency-input-field';
import Swal from 'sweetalert2';

interface FormData {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagens?: any;  
  categoria: string;
}

interface Categoria {
  _id: string;
  nomeCategoria: string;
  categoriaPai?: {
      _id: string;
      nomeCategoria: string;
  }
}

export default function Form({_id, nome:nomeExixtente, descricao: descricaoExixtente, preco: precoExixtente, imagens: imagemExixtente, categoria: categoriaExistente}: FormData) {
  const [imagens, setImages] = useState(imagemExixtente || [])
  const [isUploading, setIsUploading] = useState(false)
  const [goToProducts, setGoToProducts] = useState(false)
  const [categories, setCategories] = useState<Categoria[]>([])
  const router = useRouter()
  const [data, setData] = useState<FormData>({
    _id: '',
    nome: nomeExixtente || "",
    descricao: descricaoExixtente || "",
    preco: precoExixtente || 0,
    categoria: categoriaExistente || "",
  })

  useEffect(() => {
    axios.get("/api/apiCategorias").then((result) => {
      setCategories(result.data)
      })
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const numericPreco = parseFloat(data.preco.toString().replace(/[^0-9.,]/g, '').replace(',', '.'));

    if (_id) {
        try {
            await axios.put('/api/apiProdutos', { ...data, _id, imagens, preco: numericPreco });
            setGoToProducts(true)
        } catch (error) {
            console.error('Erro ao enviar produto:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
        }
    } else {
        try {
            await axios.post('/api/apiProdutos', { ...data, imagens, preco: numericPreco });
            setGoToProducts(true)
        } catch (error) {
            console.error('Erro ao enviar produto:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
        }
    }
  }

  if (goToProducts) {
    router.push('/produtos')
  }
  
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement >) {
    const { id, value } = e.target;

    if (id === 'preco') {
        const numericValue = parseFloat(value.replace(/[^0-9.,]/g, '').replace(',', '.'));
        setData((prevData) => ({
            ...prevData,
            [id]: numericValue,
        }));
    } else {
        setData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    }
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
          <div className="flex">
            <label className='flex flex-col w-3/5 mr-3'>
              <p className='pl-2'> Nome do produto * </p> 
              <input 
                type="text" 
                placeholder="Nome do produto" 
                value={data.nome}
                onChange={handleChange}
                id="nome"
              />
            </label> 
            <label className='flex flex-col w-2/5'>
              <p className='pl-2'>Categoria do produto *</p>
                <select 
                  value={data.categoria} 
                  id='categoria' 
                  onChange={handleChange}
                  >
                  <option value=""> Categoria </option>  
                    {categories.length > 0 && categories.map(cat =>(
                      <option key={cat._id} value={cat._id}>{cat.nomeCategoria}</option>
                    ))}
                </select> 
            </label>
          </div>
          <p className='pl-2 mb-2 text-blue-500'>Imagens do produto </p>
          <div className='mb-2 flex flex-wrap gap-2 items-center bg-white p-8 rounded-lg'>
            <ReactSortable list={imagens} 
              setList={setImagensOrder} 
              className='flex flex-wrap gap-2'>
              {!!imagens?.length && imagens.map((link: any) => (
                <div key={link} className=" flex flex-wrap ml-2">
                  <img src={link} alt="imagens do produto" className="h-32 w-52 rounded-lg"/>
                </div>
                ))}
            </ReactSortable>
            {isUploading && (
              <div className='h-32 p-1 bg-gray-200 flex items-center'>
                <Spinner/>
              </div>
            )}
            <label className=' w-32 h-32 bg-gray-200 cursor-pointer ml-2 flex flex-col text-gray-400 rounded-lg justify-center items-center '> 
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
          <label className='flex flex-col w-2/5'> 
            <p className='pl-2'> Preço do produto *</p>
            <CurrencyInput
              intlConfig={{locale: 'pt-br', currency:'BRL'}}
              id="preco"
              name="preco"
              placeholder="Preço do produto"
              fixedDecimalLength={2}
              value={data.preco}
              decimalSeparator=','
              groupSeparator='.'
              onChange={handleChange}
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
