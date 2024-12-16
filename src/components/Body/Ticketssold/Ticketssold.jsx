import React, { useEffect, useState } from 'react';
import './Ticketssold.css';
import { Link } from 'react-router-dom';
import { endpoint, refreshToken } from '../../../config/apiConfig';
import { toast, ToastContainer } from 'react-toastify';

const Ticketssold = () => {
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [vehicle, setVehicle] = useState('car');
  const [maxPage, setMaxPage] = useState(false);
  const [concat, setConcat] = useState(false);
  const [page, setPage] = useState(1);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [isStartDateSelected, setIsStartDateSelected] = useState(false); // Trạng thái chọn ngày "Từ"

  // Convert yyyy-MM-dd to dd/MM/yyyy
  const convertDate = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const param = () => {
    const start = convertDate(timeStart);
    const end = convertDate(timeEnd);
    return `?start=${start}&end=${end}&page=${page}&vehicle=${vehicle}`;
  };

  useEffect(() => {
    if (!timeStart || !timeEnd || !isStartDateSelected) return; // Chỉ gọi API khi cả hai ngày đã được chọn
    const token = localStorage.getItem('token');

    fetch(endpoint.tim_kiem_ds_ve_ban.url + param(), {
      method: endpoint.tim_kiem_ds_ve_ban.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 1000) {
          if (data.result.length > 0)
            if (concat) {
              setFilteredTickets([...filteredTickets, ...data.result]);
            } else {
              setFilteredTickets(data.result);
              setConcat(true);
            }
          else {
            if (page === 1) {
              setFilteredTickets([])
            }
            setMaxPage(true)
          }
        } else if (data.code === 5010) {
          refreshToken()
        } else {
          toast.error(data.message, {
            position: "top-right"
          })
        }
      })
      .catch((err) => {
        console.error('Lỗi kết nối:', err);
        toast.error('Lỗi kết nối đến server!', { position: 'top-right' });
      });
  }, [timeStart, timeEnd, vehicle, page, isStartDateSelected]);

  const handleFilterVehicle = (selectedVehicle) => {
    setMaxPage(false)
    setPage(1)
    setConcat(false)
    setVehicle(selectedVehicle);
  };

  const handleTimeStartChange = (value) => {
    setMaxPage(false)
    setPage(1)
    setConcat(false)
    setTimeStart(value);
    setIsStartDateSelected(true);
    setTimeEnd(value)
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight <= e.target.scrollTop + e.target.clientHeight + 5;
    if (bottom) {
      if (!maxPage)
        setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="wapper-ticket-sold">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <span>Vé đã bán</span>
          <div className="col-xl-3 col-lg-3 col-md-3">
            <div className="box-ticker-sold">
              <span>Bộ lọc dữ liệu</span>
              <div className="box-filter-menu">
                <span className="sp-td">Thời điểm</span>
                <div className="input-time">
                  <span>Từ</span>
                  <input
                    type="date"
                    value={timeStart}
                    onChange={(e) => handleTimeStartChange(e.target.value)}
                  />
                </div>
                <div className="input-time">
                  <span>Tới</span>
                  <input
                    type="date"
                    value={timeEnd}
                    onChange={(e) => setTimeEnd(e.target.value)}
                    min={timeStart}
                  />
                </div>
              </div>
              <div className="box-filter-menu">
                <span className="sp-td">Phương tiện</span>
                <select
                  className="select-vhc"
                  value={vehicle}
                  onChange={(e) => handleFilterVehicle(e.target.value)}
                >
                  <option value="car">Ô tô</option>
                  <option value="motorbike">Xe máy</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-9" >
            <div className="box-ticker-sold">
              <div className="th">
                <div className="container">
                  <div className="row">
                    <div className="col text-center">STT</div>
                    <div className="col text-center">Tên vé</div>
                    <div className="col text-center">Thời gian bắt đầu</div>
                    <div className="col text-center">Thời gian kết thúc</div>
                    <div className="col text-center">Lần cuối sử dụng</div>
                    <div className="col text-center">Hành động</div>
                  </div>
                </div>
              </div>
              <div className="tr" onScroll={handleScroll}>
                {filteredTickets.map((item, index) => (
                  <div className="row mt-2" key={item.id}>
                    <div className="col text-center">{index + 1}</div>
                    <div className="col text-center">{item.category.name}</div>
                    <div className="col text-center">{new Date(item.startAt).toLocaleDateString()}</div>
                    <div className="col text-center">{new Date(item.expireAt).toLocaleDateString()}</div>
                    <div className="col text-center">
                      {item.usedAt ? new Date(item.usedAt).toLocaleDateString() : ''}
                    </div>
                    <div className="col text-center">
                      <Link to={`/detailticketsold/${item.id}`}>
                        <button className="detail-tksold">Xem chi tiết</button>
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
  );
};

export default Ticketssold;
