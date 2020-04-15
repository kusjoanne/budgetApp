import React from "react";
import Header from "./Header";
import AddItemButton from "./AddItemButton";
import AddItemModal from "./AddItemModal";
import Settings from "./Settings";
import History from "./History";

function App() {

  return (
    <div className="App">
      <Header />
      <div>
        <AddItemButton />
        <Settings />
        <History />
        <AddItemModal />
      </div>
    </div>

  );
}

export default App;
