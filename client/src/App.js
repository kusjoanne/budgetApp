import React, {useState} from "react";
import Header from "./Header";
import AddItemButton from "./AddItemButton";
import AddItemModal from "./AddItemModal";
import Settings from "./Settings";
import History from "./History";
import dateService from "./services/dateService";

function App() {
  const [allItemDates, setAllItemDates] = useState([]);

  const getAllItemDates = async () => {
    const dates = await dateService.getAll();
    setAllItemDates(dates);
  }
  getAllItemDates();

  return (
    <div className="App">
      <Header />
      <div>
        <AddItemButton />
        <Settings />
        <History allItemDates={allItemDates} setAllItemDates={setAllItemDates} refreshItemDates={getAllItemDates}/>
        <AddItemModal refreshItemDates={getAllItemDates}/>
      </div>
    </div>

  );
}

export default App;
