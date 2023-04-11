import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client'
// import {useEffect} from 'react'
import {SIGNUP_USER} from '../graphqloperations/mutation.js'
function Signup() {
  const [formdata, setFormData] = useState({});

 const [signupUser,{data,loading,error}] = useMutation(SIGNUP_USER)

 if(loading) return <h1>Loading...</h1>

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  const getData = (e) => {
    e.preventDefault();
    console.log(formdata);
    signupUser({
      variables:{userNew: formdata}
    })
    // navigate("/login")
  };

  return (
    <div className="container my-container">
    {error &&
    <div className='red card-panel'>{error.message}</div>
    }
    {
      data && data.user &&
      <div className='green card-panel'>{data.user.fname} is SignedUp, You can Login Now!!</div>

    }
      <h5>Signup!!</h5>

      <form onSubmit={getData}>
        <input type="text" name="fname" placeholder="fname" onChange={handleChange} required />
        <input type="text" name="lname" placeholder="lname" onChange={handleChange} required />
        <input type="email" name="email" placeholder="email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="password" onChange={handleChange} required />
        <Link to="/login"><p>Already have an account ?</p></Link>
        <button type="submit" className="btn #673ab7 deep-purple">SignUp</button>
      </form>
    </div>
  );
}

export default Signup;

