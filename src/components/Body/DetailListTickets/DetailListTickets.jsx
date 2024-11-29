import React, { useEffect, useState } from 'react';
import './DetailListTickets.css';
import { useParams } from 'react-router-dom';
import { endpoint } from '../../../config/apiConfig';
import { toast } from 'react-toastify';

const DetailListTickets = () => {
  const { id } = useParams(); 
  const [ticketID, setTicketID] = useState('');
  const [nameTicket, setNameTicket] = useState('');
  const [priceTicket, setPriceTicket] = useState('');
  const [statusTicket, setStatusTicket] = useState('');
  const [quantity, setQuantity] = useState();
  const [unit, setUnit] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [createAt, setCreateAt] = useState('');


  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(endpoint.detailTicket.url(id), {
      method: endpoint.detailTicket.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 1000) {
          setTicketID(data.result.id);
          setNameTicket(data.result.name);
          setStatusTicket(data.result.status);
          setPriceTicket(data.result.price);
          setQuantity(data.result.quantity);
          setUnit(data.result.unit);
          setVehicle(data.result.vehicle);
          setCreateAt(data.result.createAt);
        } else {
          toast.error(data.message, {
            position: 'top-right',
          });
        }
      })
      .catch((err) => {
        console.log('loi ket noi', err);
      });
  }, [id]);

  const handleUpdateTicket = () => {
    const token = localStorage.getItem('token');
    
    const bodyStatus = {
      category: ticketID, 
      status: statusTicket, 
    };
  
    fetch(endpoint.patch_stt_ticket.url, {
      method: endpoint.patch_stt_ticket.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(bodyStatus),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 1000) {
          toast.success('Cập nhật trạng thái thành công', { position: 'top-right' });
        } else {
          toast.error(data.message, { position: 'top-right' });
        }
      })
      .catch((err) => {
        toast.error(`Lỗi kết nối: ${err.message}`, { position: 'top-right' });
      });
  
    const bodyPrice = {
      id: ticketID, 
      price: priceTicket,
      vehicle: vehicle,
    };
  
    fetch(endpoint.patch_price_ticket.url, {
      method: endpoint.patch_price_ticket.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(bodyPrice),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 1000) {
          toast.success('Cập nhật giá và phương tiện thành công', { position: 'top-right' });
        } else {
          toast.error(data.message, { position: 'top-right' });
        }
      })
      .catch((err) => {
        toast.error(`Lỗi kết nối: ${err.message}`, { position: 'top-right' });
      });
  };
  


  return (
    <div className="wrapper-detailtk">
      <div className="container">
        <div className="row">
          <span className="title-detailtk">Chi tiết vé</span>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="main-detail">
              <div className="box-dt-ticket">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <div className="item">
                        <label htmlFor="id"><b>ID vé:</b></label>
                        <input type="text" value={ticketID} readOnly 
                              onChange={(e) => setTicketID(e.target.value)}
                        />
                      </div>

                      <div className="item">
                        <label htmlFor="name"><b>Tên vé:</b></label>
                        <input type="text" value={nameTicket} readOnly />
                      </div>

                      <div className="item">
                        <label htmlFor="price"><b>Giá vé:</b></label>
                        <input
                          type="text"
                          value={priceTicket}
                          onChange={(e) => setPriceTicket(e.target.value)}
                        />
                      </div>

                      <div className="item">
                        <label htmlFor="status"><b>Trạng thái:</b></label>
                        <select
                          value={statusTicket}
                          className="select-vehicle"
                          onChange={(e) => setStatusTicket(e.target.value)}
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="INACTIVE">INACTIVE</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <div className="item">
                        <label htmlFor="quantity"><b>Số lượng:</b></label>
                        <input type="text" value={quantity} readOnly />
                      </div>

                      <div className="item">
                        <label htmlFor="unit"><b>Đơn vị:</b></label>
                        <input type="text" value={unit} readOnly />
                      </div>

                      <div className="item">
                        <label htmlFor="vehicle"><b>Phương tiện:</b></label>
                        <select
                          value={vehicle}
                          className="select-vehicle"
                          onChange={(e) => setVehicle(e.target.value)}
                        >
                          <option value="Car">Car</option>
                          <option value="Motorbike">Motorbike</option>
                        </select>
                      </div>

                      <div className="item">
                        <label htmlFor="createAt"><b>Tạo lúc:</b></label>
                        <input type="text" value={formatTimestamp(createAt)} readOnly />
                      </div>

                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 mt-3">
                      <div className="box-btn">
                        <button onClick={handleUpdateTicket}>
                          Sửa
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailListTickets;
