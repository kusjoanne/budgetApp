import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateService from "./services/dateService";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function EditItemModal(props) {
  const [itemName, setItemName] = useState(props.itemName);
  const [itemAmount, setItemAmount] = useState(props.itemAmount);
  const [itemDate, setItemDate] = useState(new Date(props.itemDate));

  const handleEdit = (event) => {
    event.preventDefault();
    let myForm = {
      id: props.id,
      originalDate: props.itemDate,
      originalAmount: props.itemAmount
    };
    let formData = new FormData(event.target);
    formData.forEach(function(value, key) {
      myForm[key] = value;
    });
    const editItem = async () => {
      await dateService.edit(myForm);
      props.refreshItemDates();
    }
    editItem();
  }

  const handleDelete = (event) => {
    event.preventDefault();
    const deleteItem = async () => {
      let res = await dateService.delete({id: props.id, date: props.itemDate});
      if (res){
        props.getBalance();
        props.refreshItemDates();
      }
    }
    deleteItem();
  }

  return <Modal show={props.show} onHide={props.onHide} animation={true} centered>
    <Modal.Header closeButton>
      <Modal.Title>ADD ITEM</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={handleEdit} id={"editForm" + props.id}>
        <div id="item-name">
          <label htmlFor="itemName">
            <strong>Item Name</strong>
          </label>
          <input type="text" name="itemName" value={itemName} className="itemName" onChange={itemName => setItemName(itemName.target.value)}/>
        </div>
        <div id="item-amount">
          <label htmlFor="itemAmount">
            <strong>Amount</strong>
          </label>
          <input type="text" name="itemAmount" value={itemAmount} className="itemAmount" onChange={itemAmount => setItemAmount(itemAmount.target.value)}/>
        </div>
        <div id="item-date">
          <label htmlFor="itemDate">
            <strong>Date</strong>
          </label>
          <DatePicker name="itemDate" selected={itemDate} onChange={date => setItemDate(date)}/>
        </div>
      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.onHide}>Close</Button>
      <form onSubmit={handleDelete} id={"deleteForm" + props.id}>
        <Button variant="danger" onClick={props.onHide} type="submit" id="deleteItem">Delete Item</Button>
      </form>
      <Button variant="primary" type="submit" id="editItem" onClick={props.onHide} form={"editForm" + props.id}>Save Changes</Button>
    </Modal.Footer>
  </Modal>

}

export default EditItemModal;
