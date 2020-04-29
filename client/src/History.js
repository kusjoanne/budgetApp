import React, {useState, useEffect} from 'react';
import ItemDate from "./ItemDate";
import dateService from "./services/dateService";

function History(){
  const [allItemDates, setAllItemDates] = useState([]);

  useEffect(()=>{
    if(allItemDates.length <= 0)
      getAllItemDates();
  },allItemDates);

  //returns ALL of the dates
  const getAllItemDates = async () => {
    const dates = await dateService.getAll();
    setAllItemDates(dates);
  }

  return <div>
    {allItemDates.map((date, index)=>{
      return <ItemDate key={index} date={date.date} items={date.items} />
    })}
  </div>
}

export default History;
