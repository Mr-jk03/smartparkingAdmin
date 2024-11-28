import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import GroupTickets from './components/Body/GroupTickets/GroupTickets'
import DetailListTickets from './components/Body/DetailListTickets/DetailListTickets'
import DetailTicketSold from './components/Body/DetailTicketSold/DetailTicketSold';
import DetailListAcount from './components/Body/DetailListAcount/DetailListAcount';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false); 
    navigate('/login'); 
  };

  return (
    <>
      {isLoggedIn ? (
        <div>
          <Header/> 
          <div className='row'>
            <div className='col-xl-2 col-lg-2 col-md-2'>
              <Menu onLogout={handleLogout}/>
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
                <Route path="/buygrouptickets" element={<GroupTickets />} />
                <Route path="/detaillistTicket/:id" element={<DetailListTickets />} />
                <Route path="/detailticketsold/:id" element={<DetailTicketSold />} />
                <Route path="/detaillistaccount/:idcustomer" element={<DetailListAcount />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} /> 
      )}
    </>
  );
}

export default App;
