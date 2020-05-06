import React, {useState,useEffect} from "react";
import Header from "./Header";
import AddItemButton from "./AddItemButton";
import Settings from "./Settings";
import History from "./History";
import dateService from "./services/dateService";
import balanceService from "./services/balanceService";

function App() {
  const [allItemDates, setAllItemDates] = useState([]);
  const [balance, setBalance] = useState('$ 0.00');

  useEffect(() => {
    getBalance();
    if(allItemDates.length===0) {
       getAllItemDates();
     }
   })

  const getAllItemDates = async () => {
    const dates = await dateService.getAll();
    setAllItemDates(dates);
  }

  const getBalance = async () => {
    let newBalance = await balanceService.getAll();
    setBalance(newBalance.balance.toFixed(2));
  }

  return (
    <div className="App">
      <Header balance={balance} />
      <div>
        <AddItemButton refreshItemDates={getAllItemDates} getBalance={getBalance}/>
        <Settings />
        <History allItemDates={allItemDates} setAllItemDates={setAllItemDates} refreshItemDates={getAllItemDates}  getBalance={getBalance}/>
      </div>
    </div>

  );
}

export default App;
