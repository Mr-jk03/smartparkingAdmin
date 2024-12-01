import React, { useEffect, useState } from 'react';
import './GroupTickets.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { endpoint, refreshToken } from '../../../config/apiConfig';

const GroupTickets = () => {
  const [dayStart, setDayStart] = useState('');
  const [dayEnd, setDayEnd] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [customerList, setCustomerList] = useState('');
  const [tickets, setTickets] = useState([]);

  const [today, setToday] = useState('');
  const [maxDayStart, setMaxDayStart] = useState('');
  const [maxDayEnd, setMaxDayEnd] = useState('');

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
          setTickets(data.result);
        } else if (data.code === 5010) {
          refreshToken();
        } else {
          toast.error(data.message, { position: 'top-right' });
        }
      })
      .catch((err) => {
        console.error('Connection error:', err);
        toast.error('Lỗi kết nối');
      });
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const formatDate = (date) => date.toISOString().split('T')[0];

    setToday(formatDate(currentDate));

    const maxStart = new Date(currentDate);
    maxStart.setDate(currentDate.getDate() + 7);
    setMaxDayStart(formatDate(maxStart));

    setDayStart(formatDate(currentDate));
    setDayEnd(formatDate(currentDate)); // Khởi tạo cùng ngày hiện tại
  }, []);

  useEffect(() => {
    if (dayStart) {
      const maxEndDate = new Date(dayStart);
      maxEndDate.setDate(maxEndDate.getDate() + 30); // Cộng đúng 30 ngày kể từ ngày bắt đầu
      setMaxDayEnd(maxEndDate.toISOString().split('T')[0]);

      // Tự động đồng bộ ngày kết thúc nếu nó chưa được chỉnh sửa hoặc rỗng
      if (!dayEnd || new Date(dayEnd) < new Date(dayStart)) {
        setDayEnd(dayStart);
      }
    }
  }, [dayStart]);

  const handleDayEndChange = (e) => {
    const selectedEnd = e.target.value;

    if (new Date(selectedEnd) < new Date(dayStart)) {
      toast.error('Ngày kết thúc không thể nhỏ hơn ngày bắt đầu.');
    } else {
      setDayEnd(selectedEnd);
    }
  };

  const handleSelectTicket = (ticket) => {
    setSelectedTicket(selectedTicket === ticket ? null : ticket);
  };

  const handleCustomerChange = (e) => {
    setCustomerList(e.target.value);
  };

  const countCustomers = () => {
    return customerList.trim().split('\n').filter(line => line.trim() !== '').length;
  };

  const handlePurchase = () => {
    if (!dayStart) {
      toast.error('Vui lòng chọn ngày bắt đầu.');
      return;
    }

    const finalDayEnd = dayEnd || dayStart;

    if (!selectedTicket) {
      toast.error('Vui lòng chọn vé trước khi mua.');
      return;
    }

    if (countCustomers() === 0) {
      toast.error('Vui lòng nhập danh sách khách hàng.');
      return;
    }

    const emails = customerList
      .trim()
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(customer => customer.trim());

    const formatDate = (date) => {
      const d = new Date(date);
      return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    };

    const payload = {
      end: formatDate(finalDayEnd),
      start: formatDate(dayStart),
      categoryId: selectedTicket.id,
      emails: emails,
    };

    const token = localStorage.getItem('token');
    fetch(endpoint.buyticketforlistEmail.url, {
      method: endpoint.buyticketforlistEmail.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 1000) {
          toast.success(`Đã đặt vé thành công cho ${countCustomers()} khách hàng.`);
          setCustomerList('');
        } else if (data.code === 5010) {
          refreshToken();
        } else {
          toast.error(data.message, { position: 'top-right' });
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        toast.error('Lỗi kết nối');
      });
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
                          <input
                            type="date"
                            value={dayStart}
                            min={today}
                            max={maxDayStart}
                            onChange={(e) => setDayStart(e.target.value)}
                          />
                          <span>Ngày kết thúc</span>
                          <input
                            type="date"
                            value={dayEnd}
                            min={dayStart}
                            max={maxDayEnd}
                            onChange={handleDayEndChange}
                          />
                        </div>
                      </div>

                      {tickets.map((item, index) => (
                        <div className="col-xl-6 col-lg-6 col-md-6" key={index}>
                          <div className="box-tk-group">
                            <div className={`ticket ${selectedTicket === item ? 'selected-ticket' : ''}`}>
                              <span>Tên vé: {item.name}</span>
                              <span>Phương tiện: {item.vehicle}</span>
                              <span>Loại vé: Vé {item.unit}</span>
                              <span>Giá vé: {item.price} <sup>đ</sup></span>
                              <span>Thời gian hết hạn: {item.quantity}</span>
                              <div className='btn-detail'>
                                <button onClick={() => handleSelectTicket(item)}>Chọn</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-4">
                  <span>Danh sách những khách hàng cần mua</span><br />
                  <span>Số lượng khách hàng: {countCustomers()} người</span>
                  <textarea
                    className='text-area mt-3'
                    value={customerList}
                    onChange={handleCustomerChange}
                    placeholder="Nhập email khách hàng, mỗi dòng một khách hàng"
                  />
                  <button className='btn-buyticket' onClick={handlePurchase}>Mua</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default GroupTickets;
