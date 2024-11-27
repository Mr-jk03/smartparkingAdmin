import React from 'react';
import './GroupTickets.css';
import { useState } from 'react';
import dataticket from '../../LocalData/DataTickets.json';

const GroupTickets = () => {

    const [dayStart, setDayStart] = useState('');
    const [dayEnd, setDayEnd] = useState('');





  const findActiveTickets = () => {
    return dataticket.filter((item) => item.status === "Công khai");
  };

  return (
    <div className='warraper-groupTicket'>
      <div className="container">
        <div className="row">
          <span className='title-groupticket'>Mua vé nhóm</span>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-8">
                  <div className="container">
                    <div className="row">

                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="box-select-day">
                                <span>Ngày bắt đầu</span>
                                <input type="date" 
                                    value={dayStart}
                                    onChange={(e) => setDayStart(e.target.value)}
                                />
                                <span>Ngày kết thúc</span>
                                <input type="date" 
                                    value={dayEnd}
                                    onChange={(e) => setDayEnd(e.target.value)}
                                />
                            </div>
                        </div>

                      {findActiveTickets().map((item, index) => (
                        <div className="col-xl-6 col-lg-6 col-md-6" key={index}>
                          <div className="box-tk-group">
                            <div className="ticket">
                              <span>Tên vé: {item.name}</span>
                              <span>Phương tiện: {item.vehicle}</span>
                              <span>Loại vé: Vé {item.unit}</span>
                              <span>Giá vé: {item.price} <sup>đ</sup></span>
                              <span>Thời gian hết hạn: {item.quantity}</span>
                              <div className='btn-detail'>
                                <button>Chọn</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4">
                  <span>Danh sách những khách hàng cần mua</span>
                  <textarea
                    className='text-area mt-3'
                  >
                  </textarea>
                  <button className='btn-buyticket'>Mua</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupTickets;
