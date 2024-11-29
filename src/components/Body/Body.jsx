import React, { useEffect, useState } from 'react';
import './Body.css';
import { FaCarSide } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { endpoint } from '../../config/apiConfig';

const Body = () => {
  const [allTickets, setAllTickets] = useState([]); 
  const [filteredTickets, setFilteredTickets] = useState([]); 
  const [vehicleFilter, setVehicleFilter] = useState(''); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(endpoint.lisTicket.url, {
      method: endpoint.lisTicket.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 1000) {
          setAllTickets(data.result);
          setFilteredTickets(data.result); 
        } else {
          console.error('Error fetching tickets:', data.message);
        }
      })
      .catch((err) => {
        console.error('Connection error:', err);
      });
  }, []); 

  const filterByStatus = (status) => {
    if (status === '') {
      setFilteredTickets(allTickets); 
    } else {
      const filtered = allTickets.filter((ticket) => ticket.status === status);
      setFilteredTickets(filtered);
    }
  };

  const filterByVehicle = (vehicle) => {
    setVehicleFilter(vehicle);
    if (vehicle === '') {
      setFilteredTickets(allTickets);
    } else {
      const filtered = allTickets.filter((ticket) => ticket.vehicle === vehicle);
      setFilteredTickets(filtered);
    }
  };

  return (
    <div className="wrapper-body">
      <div className="container">
        <div className="row">
          <span className="title-listTicker">Danh sách vé</span>
          <span style={{ fontWeight: 'bold' }}>Bộ lọc</span>

          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12">
                <span
                  style={{
                    display: 'inline-block',
                    marginLeft: '15px',
                    fontWeight: 'bold',
                  }}
                >
                  Theo phương tiện
                </span>
                <div className="btn-filter">
                  <button
                    className="btn-filter-vehical"
                    onClick={() => filterByVehicle('motorbike')} 
                  >
                    <i className="icon-vhc">
                      <FaMotorcycle />
                    </i>
                    Xe máy
                  </button>
                  <button
                    className="btn-filter-vehical"
                    onClick={() => filterByVehicle('car')}
                  >
                    <i className="icon-vhc">
                      <FaCarSide />
                    </i>
                    Ô tô
                  </button>
                  <button
                    className="btn-filter-vehical"
                    onClick={() => filterByVehicle('')} 
                  >
                    Tất cả
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filter by Status */}
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12">
                <span
                  style={{
                    display: 'inline-block',
                    marginLeft: '15px',
                    fontWeight: 'bold',
                  }}
                >
                  Theo Trạng thái
                </span>
                <div className="btn-filter">
                  <button className="btn-filter-stt" onClick={() => filterByStatus('')}>
                    Tất cả
                  </button>
                  <button className="btn-filter-stt" onClick={() => filterByStatus('ACTIVE')}>
                    <i className="icon-stt">
                      <FaCircle className="icon-public" />
                    </i>
                    Công khai
                  </button>
                  <button className="btn-filter-stt" onClick={() => filterByStatus('INACTIVE')}>
                    <i className="icon-stt">
                      <FaCircle className="icon-private" />
                    </i>
                    Ẩn
                  </button>
                </div>
              </div>
            </div>
          </div>

          <hr style={{ margin: '15px 0px' }} />

          {/* Ticket List */}
          <div className="container">
            <div className="row">
              {filteredTickets.map((item, index) => (
                <div className="col-xl-6 col-lg-6 col-md-6" key={index}>
                  <div className="box-tk">
                    <div className="ticket">
                      <span>Tên vé: {item.name}</span>
                      <span>Phương tiện: {item.vehicle}</span>
                      <span>Loại vé: Vé {item.type}</span>
                      <span>Giá vé: {item.price} <sup>đ</sup></span>
                      <span>Thời gian hết hạn: {item.timeEnd}</span>
                      <div className="btn-detail">
                        <Link to={`/detaillistTicket/${item.id}`}>
                          <button>Chi tiết</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Body;
