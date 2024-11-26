import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Body from './components/Body/Body';
import CreateTicket from './components/Body/CreateTicket/CreateTicket';
import Ticketssold from './components/Body/Ticketssold/Ticketssold';
import ListAccounts from './components/Body/ListAccounts/ListAccounts';
import DepositHistorys from './components/Body/DepositHistorys/DepositHistorys';
import ApproveMoney from './components/Body/ApproveMoney/ApproveMoney';
import Revenue from './components/Body/Revenue/Revenue';
import TkTicketSales from './components/Body/TkTicketSales/TkTicketSales';
import SettingLocation from './components/Body/SettingLocation/SettingLocation';
import Login from './components/Body/Login/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập

  return (
    <>
      {isLoggedIn ? (
        <div>
          <Header />
          <div className='row'>
            <div className='col-xl-2 col-lg-2 col-md-2'>
              <Menu />
            </div>
            <div className='col-xl-10 col-lg-10 col-md-10'>
              <Routes>
                <Route path="/" element={<Body />} />
                <Route path="/createticket" element={<CreateTicket />} />
                <Route path="/ticketsold" element={<Ticketssold />} />
                <Route path="/listaccount" element={<ListAccounts />} />
                <Route path="/deposit" element={<DepositHistorys />} />
                <Route path="/approvemoney" element={<ApproveMoney />} />
                <Route path="/revenue" element={<Revenue />} />
                <Route path="/ticketsale" element={<TkTicketSales />} />
                <Route path="/settinglocation" element={<SettingLocation />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Login onLogin={setIsLoggedIn} /> // Truyền hàm setIsLoggedIn
      )}
    </>
  );
}

export default App;
