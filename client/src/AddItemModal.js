import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import dateService from "./services/dateService";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function AddItemModal(props){
  const [itemName, setItemName] = useState('');
  const [itemAmount, setItemAmount] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  function handleAdd(event){
    event.preventDefault();
    let myForm = {};
    let formData = new FormData(event.target);
    formData.forEach(function(value, key){
        myForm[key] = value;
    });

    const addItem = async ()=>{
      await dateService.add(myForm);
      setItemName('');
      setItemAmount('');
      props.getBalance();
      props.refreshItemDates();
    }
    addItem();
  }

  return <Modal show={props.show} onHide={props.onHide} animation={true} centered>
    <Modal.Header closeButton>
      <Modal.Title>ADD ITEM</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form className=""  id="addForm" onSubmit={handleAdd}>
        <div id="item-name">
          <label htmlFor="itemName"><strong>Item Name</strong></label>
          <input type="text" name="itemName" value={itemName} className="itemName" onChange={itemName => setItemName(itemName.target.value)}/>
        </div>
        <div id="item-amount">
          <label htmlFor="itemAmount"><strong>Amount</strong></label>
          <input type="text" name="itemAmount" value={itemAmount} className="itemAmount" onChange={itemAmount => setItemAmount(itemAmount.target.value)} />
        </div>
        <div id="item-date">
          <label htmlFor="itemDate"><strong>Date</strong></label>
          <DatePicker name="itemDate" selected={startDate} onChange={date => setStartDate(date)} />
        </div>
      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.onHide}>
        Close
      </Button>
      <Button variant="primary" onClick={props.onHide} type="submit" id="addItem" form="addForm">
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
}

export default AddItemModal;
