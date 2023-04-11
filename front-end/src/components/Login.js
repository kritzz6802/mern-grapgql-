import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../graphqloperations/mutation';

function Login() {
    const navigate = useNavigate();
  const [formdata, setFormData] = useState({});
const [signinUser,{data,loading,error}]= useMutation(LOGIN_USER)

if(loading) return <h1>Loading...</h1>
console.log(data);
if(data){
  localStorage.setItem("token",data.user.token)
      navigate("/");
}
const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  const getData = (e) => {
    e.preventDefault();
    console.log(formdata);
    signinUser({
      variables:{userSignin: formdata}
    })
  };

  return (
    <div className="container my-container">
        {error &&
    <div className='red card-panel'>{error.message}</div>
    }
      <h3>Login!!</h3>

      <form onSubmit={getData}>
        <input type="email" name="email" placeholder="email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="password" onChange={handleChange} required />
        <Link to="/signup"><p>Don't have an account ?</p></Link>
        <button type="submit" className="btn #673ab7 deep-purple">Login</button>
      </form>
    </div>
  );
}

export default Login;

