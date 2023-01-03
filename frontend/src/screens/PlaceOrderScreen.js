import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";
import Header from "./../components/Header";
import Message from "./../components/LoadingError/Error";
import { createOrder } from "../Redux/Actions/OrderActions";
const PlaceOrderScreen = ({history}) => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const cart =useSelector((state) => state.cart);
  const userLogin =useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;
  // CALCULATE PRICE



  const orderCreate =useSelector ((state)=>state.orderCreate);
  const {order,success,error}=orderCreate;

  useEffect(()=>{
    if (success) {
      history.push(`/`);
      dispatch({type:ORDER_CREATE_RESET})
    }
  },[history,dispatch,success,order]);
  
  const placeOrderHandler = (e) => {
    dispatch(
    createOrder({
      orderItems:cart.cartItems,
      shippingAddress:cart.shippingAddress,
      id_no:cart.shippingAddress.address,
      department:cart.shippingAddress.country,
      takedate:cart.shippingAddress.city,
      returndate:cart.shippingAddress.postalCode

    })
    )
    e.preventDefault();

  };


  return (
    <>
      <Header />
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Student Info</strong>
                </h5>
                <p>name :   {userInfo.name}</p>
                <p>email:    {userInfo.email}</p>
                <p>ID number:   {cart.shippingAddress.address}</p>
                <p>department:   {cart.shippingAddress.country}</p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Reservation Schedule</strong>
                </h5>
                <p>
                  From the date: {cart.shippingAddress.city},{""} 
                  
                </p>
                <p>to the date : {cart.shippingAddress.postalCode}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {
              cart.cartItems.lenght ===0 ? (
                <Message variant="alert-info mt-5">Your cart is empty</Message>
              )
              :
              (
                <>
                {
                  cart.cartItems.map((item,index)=>(
              <div className="order-product row" key={index}>
              <div className="col-md-3 col-6">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="col-md-5 col-6 d-flex align-items-center">
                <Link to={`/products/${item.product}`}>
                  <h6>{item.name}</h6>
                </Link>
              </div>
              <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                <h4>QUANTITY</h4>
                <h6>1</h6>
              </div>
            </div> 
                  ))
                }
                </>
              )
            }


          </div>
          {/* total */}
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            {
              cart.cartItems.lenght ===0 ? null:(
              <button type="submit" onClick={placeOrderHandler}>
                PLACE ORDER
            </button>  
              )
              
            }
{
  error && (
    <div className="my-3 col-12">
    <Message variant="alert-danger">{error}</Message>
  </div>
  )
}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
