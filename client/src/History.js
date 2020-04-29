import React, {useState, useEffect} from 'react';
import ItemDate from "./ItemDate";

function History(props){
  return <div>
    {props.allItemDates.map((date, index)=>{
      return <ItemDate key={index} date={date.date} items={date.items} refreshItemDates={props.refreshItemDates}/>
    })}
  </div>
}

export default History;
