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
    console.log("getBalance called")
    let res = await balanceService.getAll();
    console.log(res.balance);
    setBalance(res.balance);
  }
  return <header>
    <h1>CURRENT BALANCE</h1>
    <div class="my-balance card">
      <div class="card-body">
        {balance}
      </div>
    </div>
  </header>
}

export default Header;
