import React from 'react';
import ItemDate from "./ItemDate";

function History(props){

  return <div>
    {props.allItemDates.map((date, index)=>{
      return <ItemDate key={index} date={date.date} items={date.items} refreshItemDates={props.refreshItemDates} getBalance={props.getBalance}/>
    })}
  </div>
}

export default History;
