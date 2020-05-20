import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import dateService from "./services/dateService";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function AddItemModal(props){
  const [itemName, setItemName] = useState('');
  const [itemAmount, setItemAmount] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [validated, setValidated] = useState(false);


  function handleAdd(event){
    event.preventDefault();
    setValidated(true);
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.preventDefault();
      let myForm = {};
      let formData = new FormData(event.target);
      formData.forEach(function(value, key){
          myForm[key] = value;
      });

      const addItem = async ()=>{
        event.preventDefault();
        await dateService.add(myForm);
        setItemName('');
        setItemAmount('');
        props.getBalance();
        props.refreshItemDates();
        props.onHide();
        setValidated(false);
      }
      addItem();
    }
  }

  return <Modal show={props.show} onHide={props.onHide} animation={true} centered>
    <Modal.Header closeButton>
      <Modal.Title>ADD ITEM</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form noValidate validated={validated} id="addForm" onSubmit={handleAdd}>
        <Form.Group controlId="formItemName">
          <Form.Label>Item Name</Form.Label>
          <Form.Control name="itemName" type="text" placeholder="Enter Item Name" required/>
          <Form.Control.Feedback type="invalid">
            Please provide an item name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formItemAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control name="itemAmount" type="text" placeholder="Enter Amount" required/>
          <Form.Control.Feedback type="invalid">
            Please provide an item amount.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formItemDate">
          <Form.Label>Item Date</Form.Label>
          <br></br>
          <DatePicker name="itemDate" selected={startDate} onChange={date => setStartDate(date)} required/>
          <Form.Control.Feedback type="invalid">
            Please provide an item date.
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.onHide}>
        Close
      </Button>
      <Button variant="primary" type="submit" id="addItem" form="addForm">
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
}

export default AddItemModal;
