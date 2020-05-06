import React, {useState} from 'react';
import AddItemModal from "./AddItemModal";
import Button from 'react-bootstrap/Button';
function AddItem(props){
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return <>
    <Button className="btn btn-lg btn-outline-primary add-remove-btn" variant="primary" onClick={handleShow}>Add Item </Button>
    <AddItemModal show={show} onHide={handleClose} refreshItemDates={props.refreshItemDates} getBalance={props.getBalance}/>
  </>
}

export default AddItem;
