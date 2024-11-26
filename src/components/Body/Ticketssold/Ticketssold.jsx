import React, { useState } from 'react';
import './Ticketssold.css';
import ticketsoldData from '../../LocalData/TicketSold.json';
import Swal from 'sweetalert2';

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

  const handleShowCustomer = (id) => {
    const findTicketSold = ticketsoldData.find((item) => item.id === id);
    if (findTicketSold) {
      Swal.fire({
        title: 'Chi tiết vé đã bán',
        html: `
          <p><strong>Mã vé: </strong>${findTicketSold.id}</p>
          <p><strong>Tên vé: </strong>${findTicketSold.name}</p>
          <p><strong>Loại vé: </strong>${findTicketSold.unit}</p>
          <p><strong>Số lượng đã bán được: </strong>${findTicketSold.quantity} vé</p>
          <p><strong>Lần cuối sử dụng: </strong>${findTicketSold.lastused}</p>
          <p><strong>Email khách hàng: </strong>${findTicketSold.email}</p>
          <p><strong>Biển số: </strong>${findTicketSold.plate}</p>
          <p><strong>Loại phương tiện: </strong>${findTicketSold.vehicle}</p>
        `,
        icon: 'info',
      });
    }
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
                    type="text"
                    value={timeStart}
                    onChange={(e) => setTimeStart(e.target.value)}
                  />
                </div>
                <div className="input-time">
                  <span>Tới</span>
                  <input
                    type="text"
                    value={timeEnd}
                    onChange={(e) => setTimeEnd(e.target.value)}
                  />
                </div>
              </div>

              <div className="box-filter-menu">
                <span className="sp-td">Email / ID khách hàng</span>
                <div className="input-time">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="box-filter-menu">
                <span className="sp-td">Nội dung biển số</span>
                <div className="input-time">
                  <input
                    type="text"
                    value={plate}
                    onChange={(e) => setPlate(e.target.value)}
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
                    <div className="col-xl-2 col-lg-2 col-md-2 text-center">Tên vé</div>
                    <div className="col-xl-2 col-lg-2 col-md-2 text-center">
                      Số lượng đã bán
                    </div>
                    <div className="col-xl-5 col-lg-5 col-md-5 text-center">
                      Lần cuối sử dụng
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 text-center">Hành động</div>
                  </div>
                </div>
              </div>

              <div className="tr">
                <div className="container">
                  {filteredTickets.map((item, index) => (
                    <div className="row mt-2" key={index}>
                      <div className="col-xl-1 col-lg-1 col-md-1 text-center">{index + 1}</div>
                      <div className="col-xl-2 col-lg-2 col-md-2 text-center">{item.name}</div>
                      <div className="col-xl-2 col-lg-2 col-md-2 text-center">{item.quantity}</div>
                      <div className="col-xl-5 col-lg-5 col-md-5 text-center">{item.lastused}</div>
                      <div className="col-xl-2 col-lg-2 col-md-2 text-center">
                        <button
                          className="detail-tksold"
                          onClick={() => handleShowCustomer(item.id)}
                        >
                          Xem chi tiết
                        </button>
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
