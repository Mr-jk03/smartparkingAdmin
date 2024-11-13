import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Menu from './components/Menu/Menu';
import CreateTicket from './components/Body/CreateTicket/CreateTicket';
import Ticketssold from './components/Body/Ticketssold/Ticketssold';

function App() {
  return (
    <>
      <Header />
      <div className='row'>
        <div className='col-xl-2 col-lg-2 col-md-2'>
          <Menu />
        </div>
        <div className='col-xl-10 col-lg-10 col-md-10'>
          <Routes>
            <Route path='/' element={<Body />}/>
            <Route path='/createticket' element={<CreateTicket />}/>
            <Route path='/ticketsold' element={<Ticketssold />}/>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
