import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateService from "./services/dateService";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function EditItemModal(props) {
  const [itemName, setItemName] = useState(props.itemName);
  const [itemAmount, setItemAmount] = useState(props.itemAmount);
  const [itemDate, setItemDate] = useState(new Date(props.itemDate));
  const [validated, setValidated] = useState(false);

  const handleEdit = (event) => {
    event.preventDefault();
    setValidated(true);
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
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
        props.onHide();
      }
      editItem();
    }
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
      <Form noValidate validated={validated} onSubmit={handleEdit} id={"editForm" + props.id}>
        <Form.Group controlId="formItemName">
          <Form.Label>Item Name</Form.Label>
          <Form.Control name="itemName"  type="text" value={itemName} className="itemName" onChange={itemName => setItemName(itemName.target.value)} required/>
          <Form.Control.Feedback type="invalid">
            Please provide an item name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formItemAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control name="itemAmount" type="text" value={itemAmount} className="itemAmount" onChange={itemAmount => setItemAmount(itemAmount.target.value)}/>
          <Form.Control.Feedback type="invalid">
            Please provide an item amount.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formItemDate">
          <Form.Label>Item Date</Form.Label>
          <br></br>
          <DatePicker name="itemDate" selected={itemDate} onChange={date => setItemDate(date)} />
          <Form.Control.Feedback type="invalid">
            Please provide an item date.
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.onHide}>Close</Button>
      <form onSubmit={handleDelete} id={"deleteForm" + props.id}>
        <Button variant="danger" onClick={props.onHide} type="submit" id="deleteItem">Delete Item</Button>
      </form>
      <Button variant="primary" type="submit" id="editItem" form={"editForm" + props.id}>Save Changes</Button>
    </Modal.Footer>
  </Modal>

}

export default EditItemModal;
