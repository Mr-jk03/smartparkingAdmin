import React, { useEffect, useState } from 'react';
import './DetailListTickets.css';
import { useParams } from 'react-router-dom';
import { endpoint } from '../../../config/apiConfig';

const DetailListTickets = () => {
  const { id } = useParams(); // Lấy ID vé từ URL
  const [ticketDetails, setTicketDetails] = useState(null);
  const [error, setError] = useState(null); // Xử lý lỗi nếu có

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
          setTicketDetails(data.result);
        } else {
          setError(`Lỗi lấy dữ liệu: ${data.message}`);
        }
      })
      .catch((err) => {
        setError(`Lỗi kết nối: ${err.message}`);
      });
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!ticketDetails) {
    return <div>Không tìm thấy vé.</div>;
  }

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
                        <input type="text" value={ticketDetails.id} readOnly />
                      </div>

                      <div className="item">
                        <label htmlFor="name"><b>Tên vé:</b></label>
                        <input type="text" value={ticketDetails.name} readOnly />
                      </div>

                      <div className="item">
                        <label htmlFor="price"><b>Giá vé:</b></label>
                        <input type="text" value={ticketDetails.price} readOnly />
                      </div>

                      <div className="item">
                        <label htmlFor="status"><b>Trạng thái:</b></label>
                        <select
                          value={ticketDetails.status}
                          className='select-status'
                          onChange={(e) =>
                            setTicketDetails({ ...ticketDetails, status: e.target.value })
                          }
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="INACTIVE">INACTIVE</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <div className="item">
                        <label htmlFor="quantity"><b>Số lượng:</b></label>
                        <input type="text" value={ticketDetails.quantity} readOnly />
                      </div>

                      <div className="item">
                        <label htmlFor="unit"><b>Đơn vị:</b></label>
                        <input type="text" value={ticketDetails.unit} readOnly />
                      </div>

                      <div className="item">
                        <label htmlFor="vehicle"><b>Phương tiện:</b></label>
                        <select
                          value={ticketDetails.vehicle}
                          className='select-vehicle'
                          onChange={(e) =>
                            setTicketDetails({ ...ticketDetails, vehicle: e.target.value })
                          }
                        >
                          <option value="Car">Car</option>
                          <option value="Motorbike">Motorbike</option>
                        </select>
                      </div>

                      <div className="item">
                        <label htmlFor="createAt"><b>Tạo lúc:</b></label>
                        <input type="text" value={formatTimestamp(ticketDetails.createAt)} readOnly />
                      </div>

                      <div className="item">
                        <label htmlFor="expireAt"><b>Hết hạn lúc:</b></label>
                        <input type="text" value={formatTimestamp(ticketDetails.modifiedAt)} readOnly />
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 mt-3">
                      <div className="box-btn">
                        <button>
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
