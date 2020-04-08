import React, { useState, useEffect } from "react";
import Header from "./Header";
// SERVICES
// import productService from './services/productService';
import balanceService from './services/balanceService';
// import dateService from './services/dateService';
// import itemService from './services/itemService';

function App() {
  // const [products, setproducts] = useState(null);
  //const [items, setItems] = useState(null);
  // const [balance, setBalance] = useState(null);
  // useEffect(() => {
  //   if(!products) {
  //     getProducts();
  //   }
  // })

  // useEffect(() => {
  //   if(!items) {
  //     getItems();
  //   }
  // })

  // useEffect(() => {
  //   if(!balance) {
  //     getBalance();
  //   }
  // })
  // const getBalance = async () => {
  //   console.log("getBalance called")
  //   let res = await balanceService.getAll();
  //   console.log(res.balance);
  //   setBalance(res.balance);
  // }

  // const getItems = async () => {
  //   let res = await itemService.getAll();
  //   console.log(res);
  //   setItems(res);
  // }

  // const getProducts = async () => {
  //   let res = await itemService.getAll();
  //   console.log(res);
  //   setproducts(res);
  // }

  // const renderItems = item => {
  //   return( <li key={item._id} className="list__item product">
  //     <h3 className="item__name">{item.name}</h3>
  //     <p className="item__amount">{item.amount}</p>
  //   </li> );
  // }

  // const renderProduct = product => {
  //   return (
  //     <li key={product._id} className="list__item product">
  //       <h3 className="product__name">{product.name}</h3>
  //       <p className="product__description">{product.description}</p>
  //     </li>
  //   );
  // };

  return (
    <div className="App">
      <Header />
    </div>

  );
}

export default App;
