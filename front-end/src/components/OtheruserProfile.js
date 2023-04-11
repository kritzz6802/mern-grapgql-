import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_USER_BY_ID } from '../graphqloperations/queries'
import { useParams } from 'react-router-dom'

export default function OtheruserProfile() {
  const { userid } = useParams();

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: {userId: userid },
  });

  if (loading) return <h1>Profile is loading</h1>;

  if (error) {
    console.log(error);
    return <div>Error: {error.message}</div>;
  }

  console.log(data);

  return (
   <div className="container my-container">
         <div className="center">
        <img
          className="circle profile-img"
          src={`https://robohash.org/${data?.user?.fname}.png?size=200x200`}
          alt="pic"
        />
        <h5>
          {data?.user?.fname} {data?.user?.lname}
        </h5>
        <h6>Email:- {data?.user?.email}</h6>
      </div>
      <h1>My Products</h1>
     <div className="p-maindiv">
       {data?.user?.products.map((product) => {
         return (
           <div className="product">
             <div className="center">
               <img src={`${product.url}`} alt="pic" />
             </div>
             <h5 style={{marginTop: "20px"}}>{product.name}</h5>
             <div>
               Price: <strong>$ {product.price}</strong>
             </div>
             <p>{product.discription}</p>
           </div>
         );
       })}
     </div>
   </div>
 );
}
