import React, { useEffect } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromcart } from "../Redux/Actions/cartActions";

const CartScreen = ({match , location,history}) => {
  window.scrollTo(0, 0);
  const productId =  match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]):1;
  const cart = useSelector((state) => state.cart);
  const { cartItems} =cart;
  const dispatch = useDispatch()
  useEffect(()=>{
    if (productId){
      dispatch(addToCart(productId,qty))
    }
  },[dispatch,productId,qty]);

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");

  }

  const removeFromCartHandle = (id) => {
dispatch(removeFromcart(id))
  }

  
  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container">
        {
          cartItems.length === 0 ? (
<div className=" alert alert-info text-center mt-3">
          Your have not selected book to reserve
          <Link
            className="btn btn-success mx-5 px-5 py-3"
            to="/"
            style={{
              fontSize: "12px",
            }}
          >
            reserve now
          </Link>
        </div>
          )
            :
            (
              <>
                      <div className=" alert alert-info text-center mt-3">
          Book
          <Link className="text-success mx-2" to="/cart">
            ({cartItems.length})
          </Link>
        </div>
        {/* cartiterm */}
        {
          cartItems.map((item)=>(
        <div className="cart-iterm row">
          <div 
          onClick={() => removeFromCartHandle(item.product)}
          className="remove-button d-flex justify-content-center align-items-center">
            <i className="fas fa-times"></i>
          </div>
          <div className="cart-image col-md-3">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="cart-text col-md-5 d-flex align-items-center">
            <Link to={`/products/${item.product}`}> 
              <h4>{item.name}</h4>
            </Link>
          </div>
          <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
            <h6>QUANTITY</h6>
            <h6>1</h6>
          </div>
        </div>


          ))
        }


        <hr />
        <div className="cart-buttons d-flex align-items-center row">
          
               <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
            <button onClick={checkOutHandler}>
              book
            </button>
          </div>
            
          
         
        </div>
              </>
            )

        }

      </div>
    </>
  );
};

export default CartScreen;
