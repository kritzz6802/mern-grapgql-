import { useMutation } from '@apollo/client';
import React,{useState} from 'react'
import { CREATE_QUOTE } from '../graphqloperations/mutation';

export default function CreateQuote() {
  const [name, setname] = useState('');
  const [discription, setdiscription] = useState('');
  const [price, setprice] = useState('');
  const [url, seturl] = useState('');
  const [createQuote,{loading,data,error}]=useMutation(CREATE_QUOTE,{
    refetchQueries:[
      'getAllQuotes',
      'getprofile'
    ]
  })
  const submit = (e) => {
    e.preventDefault();

    createQuote({
      variables: {
        addproduct: {
          name,
          discription,
          price,
          url,
        },
      },
    }).then(() => {
      // reset state values to their initial values after successful submission
      setname('');
      setdiscription('');
      setprice('');
      seturl('');
    });
  };



if(loading) return <h1>Loading</h1>
  if(error){
    console.log(error.message)
  }
  if(data){
    console.log(data);
  }
    return (
      <div>
      {loading && <h1>Loading</h1>}
{error && <h6 className='red card-panel'>{error?.message}</h6>}
{data && <h6 className='green card-panel'>{data?.createQuote} Create quote successfully</h6>}

    <form onSubmit={submit}>
        <input type="text" name="name" placeholder="write your name here... " value={name} onChange={e=>setname(e.target.value)} required />
        <input type="text" name="discription" placeholder="write your discription here... " value={discription} onChange={e=>setdiscription(e.target.value)} required />
        <input type="text" name="price" placeholder="write your price here... " value={price} onChange={e=>setprice(e.target.value)} required />
        <input type="text" name="url" placeholder="write your url here... " value={url} onChange={e=>seturl(e.target.value)} required />
        <button type="submit" className="btn #673ab7 deep-purple">Create</button>
        </form>
    </div>
  )
}
