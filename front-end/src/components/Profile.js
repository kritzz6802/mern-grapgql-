import { useMutation, useQuery } from "@apollo/client";
import {React,useState} from "react";
import { GET_MY_PROFILE } from "../graphqloperations/queries";
import { useNavigate } from "react-router-dom";
import { DELETE_PRODUCT } from "../graphqloperations/mutation";

export default function Profile() {
  const [deleteData, setDeleteData] = useState({});


  const navigate = useNavigate();
  const { loading, error, data,refetch  } = useQuery(GET_MY_PROFILE);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  if (!localStorage.getItem("token")) {
    navigate("/login");
    return <h1>unauthorized</h1>;
  }
// console.log(data.user.products)
const handleDelete = (productId) => {
  deleteProduct({
    variables: { id: productId },
  }).then(() => {
    const updatedProducts = data.user.products.filter(
      (product) => product.id !== productId
    );
    setDeleteData({
      ...deleteData,
      products: updatedProducts,
    });
    // navigate("/");
    console.log(productId);
  }).catch((error) => {
    console.log(error);
  })
  .finally(() => {
    refetch(); // Refetch the data after deletion
  });
};



  if (loading) return <h1>Profile is loading</h1>;
  if (error) {
    console.log(error);
  }

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
      <h3>Your quotes</h3>
      <div className="p-maindiv">
        {data?.user?.products.map((product) => {
          return (
            <div className="product" key={product.id}>
              <div className="center">
                <img src={`${product.url}`} alt="pic" />
              </div>
              <h5 style={{ marginTop: "20px" }}>{product.name}</h5>
              <div>
                Price: <strong>$ {product.price}</strong>
              </div>
              <p>{product.discription}</p>
              <button
                type="button"
                className="btn #673ab7 deep-purple right"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
