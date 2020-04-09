import React, {useState, useEffect} from 'react';
import balanceService from './services/balanceService';

function Header(){
  const [balance, setBalance] = useState('');

  useEffect(() => {
    if(!balance) {
      getBalance();
    }
  })
  const getBalance = async () => {
    let res = await balanceService.getAll();
    setBalance(res.balance);
  }
  return <header>
    <h1>CURRENT BALANCE</h1>
    <div className="my-balance card">
      <div className="card-body">
        {balance}
      </div>
    </div>
  </header>
}

export default Header;
