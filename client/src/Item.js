import React from "react";
import EditItemModal from "./EditItemModal";

function Item(props){
  return <tr>
    <td>{props.itemName}</td>
    <td>{props.itemAmount}</td>
    <td>
      <input type="image" alt="editIcon" src='https://image.flaticon.com/icons/svg/1159/1159633.svg' className="edit" data-toggle="modal" data-target={"#editItemModal"+props.id} />
    </td>
    <EditItemModal id={props.id} itemName={props.itemName} itemAmount={props.itemAmount} itemDate={props.itemDate} refreshItemDates={props.refreshItemDates}/>
    </tr>;
}

export default Item;
