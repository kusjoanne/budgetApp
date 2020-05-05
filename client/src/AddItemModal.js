import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import dateService from "./services/dateService";
import "react-datepicker/dist/react-datepicker.css";

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

  return   <div className="modal fade" id="addItemModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <form className=""  id="addForm" onSubmit={handleAdd}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">ADD ITEM</h5>
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
              <DatePicker name="itemDate" selected={startDate} onChange={date => setStartDate(date)} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" id="addItem" form="addForm" className="btn btn-primary">Save changes</button>
          </div>
        </form>
      </div>
          </div>
        </div>
}

export default AddItemModal;
