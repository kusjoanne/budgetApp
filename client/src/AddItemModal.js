import React, {useState} from 'react';

function AddItemModal(){
  const [itemName, setItemName] = useState('');
  const [itemAmount, setItemAmount] = useState('');
  const [itemDate, setItemDate] = useState("2020-03-13");

  function updateValue(event){
    const inputBox = event.target.name;
    const inputValue = event.target.value;
    if(inputBox === 'itemName'){
      setItemName(inputValue);
    } else if(inputBox === 'itemAmount'){
      setItemAmount(inputValue);
    } else if(inputBox === 'itemDate'){
      console.log(inputValue);
    }
  }
  function preventRefesh(event){
    event.preventDefault();
  }
  return   <div className="modal fade" id="addItemModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <form className="" action="/api/items" method="post">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">ADD ITEM</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div id="item-name">
              <label for="itemName"><strong>Item Name</strong></label>
              <input type="text" name="itemName" value={itemName} className="itemName" onChange={updateValue}/>
            </div>
            <div id="item-amount">
              <label for="itemAmount"><strong>Amount</strong></label>
              <input type="text" name="itemAmount" value={itemAmount} className="itemAmount" onChange={updateValue} />
            </div>
            <div id="item-date">
              <label for="itemDate"><strong>Date</strong></label>
              <input type="date" name="itemDate" value={itemDate} className="itemDate" onChange={updateValue} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" onClick={preventRefesh} id="addItem" className="btn btn-primary">Save changes</button>
          </div>
        </form>
      </div>
          </div>
        </div>
}

export default AddItemModal;
