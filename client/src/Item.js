import React, {useState} from "react";
import EditItemModal from "./EditItemModal";

function Item(props){
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return <tr>
    <td>{props.itemName}</td>
    <td>{props.itemAmount}</td>
    <td>
      <input type="image" alt="editIcon" src='https://image.flaticon.com/icons/svg/1159/1159633.svg' className="edit" onClick={handleShow}/>
    </td>
    <EditItemModal show={show} onHide={handleClose} id={props.id} itemName={props.itemName} itemAmount={props.itemAmount} itemDate={props.itemDate} refreshItemDates={props.refreshItemDates} getBalance={props.getBalance}/>
    </tr>;
}

export default Item;
