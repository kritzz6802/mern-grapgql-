import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
// import {useEffect} from 'react'
import { GET_ALL_QUOTES } from "../graphqloperations/queries.js";
// import logo from '../images/logo.png'
// import toggle from '../images/toggle.png'
import footer from '../images/footer-logo.png'
export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);
  console.log(data);
  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(error.message);
  }
  if (data.products.length === 0) {
    return <h2>No products available</h2>;
  }
  return (
    <div className="container my-container">
      {/* <!-- banner bg main start --> */}
      <div className="banner_bg_main">
        {/* <!-- header top section start --> */}
        {/* <div className="container">
          <div className="header_section_top">
            <div className="row">
              <div className="col-sm-12">
                <div className="custom_menu">
                  <ul>
                    <li><a href="/">Best Sellers</a></li>
                    <li><a href="/">Gift Ideas</a></li>
                    <li><a href="/">New Releases</a></li>
                    <li><a href="/">Today's Deals</a></li>
                    <li><a href="/">Customer Service</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <!-- header top section start --> */}
        {/* <!-- logo section start --> */}
        {/* <!-- logo section end --> */}
        {/* <!-- header section start --> */}
        <div className="header_section">
          <div className="container">
            <div className="containt_main">

              <div className="main">
                {/* <!-- Another variation with a button --> */}
                <div className="input-group">
                  <input type="text" className="form-control inp" placeholder="Search this blog" />
                  <div className="input-group-append">
                    <button className="btn search_btn btn-secondary" type="button" style={{ backgroundColor: "#f26522", borderColor: "#f26522" }}>
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>

                <h1 className="head_text center">wellcome at our page  </h1>
                <h1 className="head_text center">wellcome at our page  </h1>
                <br />
                <br />
                <br />
                <Link to={`/create`}>
                  <h1 className="center buynow_bt">create now  </h1>
                </Link>

              </div>
              {/* <div className="header_box">
                <div className="login_menu">
                  <ul>
                    <li><a href="/">
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                      <span className="padding_10">Login</span></a>
                    </li>
                    <li><a href="/">
                      <i className="fa fa-user" aria-hidden="true"></i>
                      <span className="padding_10">Signup</span></a>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {/* <!-- header section end --> */}
        {/* <!-- banner section start --> */}
        <br/>
        <br/>
        <br/>
        <h1 className="center">Our Products</h1>
        <div className="p-maindiv">
          {data.products.map((product) => {
            return (
              <div className="product box_main">
                <div className="center tshirt_img">
                  <img src={`${product.url}`} alt="pic" />
                </div>
                <h5 className="shirt_text" style={{ marginTop: "20px" }}>{product.name}</h5>
                <div className="price_text">
                  Price: <strong>$ {product.price}</strong>
                </div>
                <p className="center">{product.discription}</p>
                <Link to={`/profile/${product.by._id}`}>
                  <p className="right-align seemore_bt">~ {product.by.fname}</p>
                </Link>
              </div>
            );
          })}
        </div>

        {/* <!-- banner section end --> */}
      </div>
      {/* <!-- banner bg main end --> */}
      {/* <!-- fashion section start --> */}

      {/* <!-- fashion section end --> */}
      {/* <!-- footer section start --> */}
      <div className="footer_section layout_padding">
        <div className="container">
          <div className="footer_logo"><a href="/"><img src={footer} alt="footer" /></a></div>
          <div className="input_bt">
            <input type="text" className="mail_bt" placeholder="Your Email" name="Your Email" />
            <span className="subscribe_bt" id="basic-addon2"><a href="/">Subscribe</a></span>
          </div>
          <div className="footer_menu">
            <ul>
              <li><a href="/">Best Sellers</a></li>
              <li><a href="/">Gift Ideas</a></li>
              <li><a href="/">New Releases</a></li>
              <li><a href="/">Today's Deals</a></li>
              <li><a href="/">Customer Service</a></li>
            </ul>
          </div>
          <div className="location_main">Help Line  Number : <a href="/">+1 1800 1200 1200</a></div>
        </div>
      </div>
      {/* <!-- footer section end --> */}
      {/* <!-- copyright section start --> */}
      <div className="copyright_section">
        <div className="container">
          <p className="copyright_text">© 2020 All Rights Reserved. Design by <a href="https://html.design">Free html  Templates</a></p>
        </div>
      </div>
      {/* <!-- copyright section end --> */}

    </div>
  );
}



// useEffect(() => {
//   fetch('https://mevn-product-selling.onrender.com/',{
//     method:"post",
//     headers:{
//       "Content-Type":"application/json"
//     },
//     body:JSON.stringify({
//       query:`
//       query getAllQuotes{
//         quotes{
//           name
//           by{
//             fname
//           }
//         }}`
//       })
//   }).then(res=>res.json())
//   .then(data=>console.log(data))

// }, []);
