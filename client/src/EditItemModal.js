import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateService from "./services/dateService";

function EditItemModal(props){
  const [itemName, setItemName] = useState(props.itemName);
  const [itemAmount, setItemAmount] = useState(props.itemAmount);
  const [itemDate, setItemDate] = useState(new Date(props.itemDate));

  const handleEdit = (event) =>{
    event.preventDefault();
    let myForm = {id:props.id,originalDate:props.itemDate};
    let formData = new FormData(event.target);
    formData.forEach(function(value, key){
        myForm[key] = value;
    });
    const editItem = async () =>{
      let res = await dateService.edit(myForm);
    }
    editItem();
  }

  const handleDelete = (event) =>{
    event.preventDefault();
    const deleteItem = async () =>{
      let res = await dateService.delete({id:props.id, date:props.itemDate});
    }
    deleteItem();
    props.refreshItemDates();
  }

  return   <div className="modal fade" id={"editItemModal"+props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <form onSubmit={handleEdit} id={"editForm"+props.id}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">EDIT ITEM</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
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
              <DatePicker name="itemDate" selected={itemDate} onChange={date => setItemDate(date)} />
            </div>
          </div>
        </form>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          <form onSubmit={handleDelete} id={"deleteForm"+props.id}>
            <button type="submit" id="deleteItem" className="btn btn-danger">Delete Item</button>
          </form>
          <button type="submit" id="editItem" className="btn btn-primary" form={"editForm"+props.id}>Save changes</button>
          </div>
      </div>
          </div>
        </div>
}

export default EditItemModal;
