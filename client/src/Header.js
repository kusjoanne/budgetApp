import React from 'react';

function Header(props){

  return <header>
    <h1>CURRENT BALANCE</h1>
    <div className="my-balance card">
      <div className="card-body">
        $ {props.balance}
      </div>
    </div>
  </header>
}

export default Header;
