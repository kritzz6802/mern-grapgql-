import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <>


      {/* <div className="nav-wrapper #673ab7 deep-purple"> */}
        <div className="header_section_top">
          <div className="row">
                  <div className="container">
            <div className="col-sm-12">
              <div className="custom_menu">
                <Link to="/" className="left"> <h1 className='logo_text'>Product App</h1></Link>
                <ul id="nav-mobile" className="right">
                  {
                    token ?
                      <>
                        <li><Link to="/profile">profile</Link></li>
                        <li><Link to="/create">create</Link></li>
                        <li><button className='red btn' onClick={() => {
                          localStorage.removeItem('token')
                          navigate('/login')
                        }}>Logout</button></li>
                      </> : <>
                        <li><Link to="/login">login</Link></li>
                        <li><Link to="/signup">signUp</Link></li>
                      </>
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* </div> */}

    </>
  )
}
