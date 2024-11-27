import React from 'react';
import './DetailTicketSold.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ticketsold from '../../LocalData/TicketSold.json';

const DetailTicketSold = () => {
  const { id } = useParams();

  const item = ticketsold.find((item) => item.id === id);
  const [idticketsoldDt, setIdTicketsoldDt] = useState(item.id);
  const [nameticketsoldDt, setNameticketsoldDt] = useState(item.name);
  const [unitsoldDt, setUnitsoldDt] = useState(item.unit);
  const [startTimeSoldDt, setStartTimesoldDt] = useState(item.starttime);
  const [endTimeSoldDt, setEndtimesoldDt] = useState(item.endtime);
  const [lastUsesoldDt, setlastUsesoldDt] = useState(item.lastused);
  const [emailsoldDt, setemailsoldDt] = useState(item.email);
  const [platesoldDt, setplatesoldDt] = useState(item.plate);
  const [vehiclesoldDt, setvehiclesoldDt] = useState(item.vehicle);

  const handleEdit = () => {
    console.log("Thông tin vé đã chỉnh sửa:");
    console.log({
      id: idticketsoldDt,
      name: nameticketsoldDt,
      unit: unitsoldDt,
      starttime: startTimeSoldDt,
      endtime: endTimeSoldDt,
      lastused: lastUsesoldDt,
      email: emailsoldDt,
      plate: platesoldDt,
      vehicle: vehiclesoldDt,
    });
  };
  

  return (
    <div className='wrapper-detailticketsold'>
      <div className="container">
        <div className="row">
          <span className='title-dtticketsold'>Chi tiết vé đã bán</span>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="main-dtticketsold">
              <div className="box-dtticketsold">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <div className="item-dtticketsold">
                        <label for='id'>ID vé</label>
                        <input type="text" name='id' 
                          value={idticketsoldDt}
                          onChange={(e) => setIdTicketsoldDt(e.target.value)}
                        />
                      </div>
                      <div className="item-dtticketsold">
                        <label for='name'>Tên vé</label>
                        <input type="text" name='name' 
                          value={nameticketsoldDt}
                          onChange={(e) => setNameticketsoldDt(e.target.value)}
                        />
                      </div>
                      <div className="item-dtticketsold">
                        <label for='unit'>Đơn vị</label>
                        <input type="text" name='unit' 
                          value={unitsoldDt}
                          onChange={(e) => setUnitsoldDt(e.target.value)}
                        />
                      </div>
                      <div className="item-dtticketsold">
                        <label for='quantity'>Ngày bắt đầu</label>
                        <input type="text" name='quantity' 
                          value={startTimeSoldDt}
                          onChange={(e) => setStartTimesoldDt(e.target.value)}
                        />
                      </div>
                      <div className="item-dtticketsold">
                        <label for='quantity'>Ngày kết thúc</label>
                        <input type="text" name='quantity' 
                          value={endTimeSoldDt}
                          onChange={(e) => setEndtimesoldDt(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <div className="item-dtticketsold">
                        <label for='lastused'>Lần cuối sử dụng</label>
                        <input type="text" name='lastused' 
                          value={lastUsesoldDt}
                          onChange={(e) => setlastUsesoldDt(e.target.value)}
                        />
                      </div>
                      <div className="item-dtticketsold">
                        <label for='email'>Email</label>
                        <input type="text" name='email' 
                          value={emailsoldDt}
                          onChange={(e) => setemailsoldDt(e.target.value)}
                        />
                      </div>
                      <div className="item-dtticketsold">
                        <label for='plate'>Biển số</label>
                        <input type="text" name='plate' 
                          value={platesoldDt}
                          onChange={(e) => setplatesoldDt(e.target.value)}
                        />
                      </div>
                      <div className="item-dtticketsold">
                        <label for='vehicle'>Phương tiện</label>
                        <select 
                          name="vehicle" 
                          id="vehicle" 
                          className='select-vehicle'
                          value={vehiclesoldDt} 
                          onChange={(e) => setvehiclesoldDt(e.target.value)}
                        >
                          <option value="Motorbike">Xe máy</option>
                          <option value="Car">Ô tô</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 mt-3">
                    <div className="box-btn">
                        <button onClick={handleEdit}>
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
  )
}

export default DetailTicketSold;
