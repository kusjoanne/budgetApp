import React from "react";

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
        {items.map( item => {
          return <tr>
            <td>{item.name}</td>
            <td>{item.amount.toFixed(2)}</td>
            <td>
              <input type="image" alt="editIcon" src='https://image.flaticon.com/icons/svg/1159/1159633.svg' className="edit" data-toggle="modal" data-target="#editItemModal" />
            </td>
            </tr>;
        })}
      </tbody>
    </table>
    <br />
  </div>
}

export default ItemDate;
