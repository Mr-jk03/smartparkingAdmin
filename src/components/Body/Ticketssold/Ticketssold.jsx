import React, { useState } from 'react';
import './Ticketssold.css';
import ticketsoldData from '../../LocalData/TicketSold.json';
import { Link } from 'react-router-dom'

const Ticketssold = () => {
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [email, setEmail] = useState('');
  const [plate, setPlate] = useState('');
  const [vehicle, setVehicle] = useState(''); 
  const [filteredTickets, setFilteredTickets] = useState(ticketsoldData);


  const handleFilterVehicle = (selectedVehicle) => {
    setVehicle(selectedVehicle);

    const filtered = ticketsoldData.filter((ticket) => {
      return selectedVehicle === ''
        ? true
        : ticket.vehicle.toLowerCase() === selectedVehicle.toLowerCase();
    });

    setFilteredTickets(filtered);
  };


  return (
    <div className="wapper-ticket-sold">
      <div className="container">
        <div className="row">
          <span
            style={{
              display: 'inline-block',
              height: 'auto',
              width: '100%',
              textAlign: 'center',
              margin: '15px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: '20px',
            }}
          >
            Vé đã bán
          </span>
          <div className="col-xl-3 col-lg-3 col-md-3">
            <div className="box-ticker-sold">
              <span
                style={{
                  display: 'inline-block',
                  height: 'auto',
                  width: '100%',
                  textAlign: 'start',
                  paddingLeft: '5px',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  fontSize: '15px',
                }}
              >
                Bộ lọc dữ liệu
              </span>

              <div className="box-filter-menu">
                <span className="sp-td">Thời điểm</span>
                <div className="input-time">
                  <span>Từ</span>
                  <input
                    type="date"
                    value={timeStart}
                    onChange={(e) => setTimeStart(e.target.value)}
                  />
                </div>
                <div className="input-time">
                  <span>Tới</span>
                  <input
                    type="date"
                    value={timeEnd}
                    onChange={(e) => setTimeEnd(e.target.value)}
                  />
                </div>
              </div>

              <div className="box-filter-menu">
                <span className="sp-td">Phương tiện</span>
                <div className="input-time">
                  <select
                    className="select-vhc"
                    value={vehicle}
                    onChange={(e) => handleFilterVehicle(e.target.value)}
                  >
                    <option value="">-- Chọn phương tiện --</option>
                    <option value="Motorbike">Xe máy</option>
                    <option value="Car">Ô tô</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-9 col-md-9">
            <div className="box-ticker-sold">
              <div className="th">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-1 col-lg-1 col-md-1 text-center">STT</div>
                    <div className="col-xl-1 col-lg-1 col-md-1 text-center">Tên vé</div>
                    <div className="col-xl-3 col-lg-3 col-md-3 text-center">
                      Thời gian bắt đầu
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 text-center">
                      Thời gian kết thúc
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 text-center">
                      Lần cuối sử dụng
                    </div>
                    <div className="col-xl-1 col-lg-1 col-md-1 text-center">Hành động</div>
                  </div>
                </div>
              </div>

              <div className="tr">
                <div className="container">
                  {filteredTickets.map((item, index) => (
                    <div className="row mt-2" key={index}>
                      <div className="col-xl-1 col-lg-1 col-md-1 text-center">{index + 1}</div>
                      <div className="col-xl-1 col-lg-1 col-md-1 text-center">{item.name}</div>
                      <div className="col-xl-3 col-lg-3 col-md-3 text-center">{item.starttime}</div>
                      <div className="col-xl-3 col-lg-3 col-md-3 text-center">{item.endtime}</div>
                      <div className="col-xl-3 col-lg-3 col-md-3 text-center">{item.lastused}</div>
                      <div className="col-xl-1 col-lg-1 col-md-1 text-center">
                        <Link to={`/detailticketsold/${item.id}`}>
                            <button
                            className="detail-tksold">
                                Xem chi tiết
                            </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticketssold;
