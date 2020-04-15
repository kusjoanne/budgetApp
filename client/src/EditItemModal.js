import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditItemModal(props){
  const [itemName, setItemName] = useState(props.itemName);
  const [itemAmount, setItemAmount] = useState(props.itemAmount);
  const [startDate, setStartDate] = useState(new Date(props.itemDate));

  return   <div className="modal fade" id={"editItemModal"+props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <form className="" id="editItemForm" action="/api/date" method="post">
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
              <DatePicker name="itemDate" selected={startDate} onChange={date => setStartDate(date)} />
            </div>
          </div>
          </form>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" form="editItemForm">Close</button>
            <form id="deleteItemForm" action={"/api/date/delete/"+props.itemDate+"/"+props.id} method="post">
              <button type="submit" id="addItem" className="btn btn-danger">Delete Item</button>
            </form>
            <button type="submit" id="addItem" className="btn btn-primary">Save changes</button>
          </div>
      </div>
          </div>
        </div>
}

export default EditItemModal;
