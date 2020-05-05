import React from "react";
import Item from "./Item";

function ItemDate(props){
  const items = props.items;
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let date = new Date(props.date);
  date = date.toLocaleDateString('en-US',options);

  return<div>
    <h2>{date}</h2>
    <br />
    <table className="table table-striped">
      <thead className="table-head">
        <tr>
          <th>Item</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map( (item,index) => {
          return <Item key={index} id={item._id} itemName={item.name} itemAmount={item.amount.toFixed(2)} itemDate={props.date} refreshItemDates={props.refreshItemDates} getBalance={props.getBalance}/>
        })}
      </tbody>
    </table>
    <br />
  </div>
}

export default ItemDate;
