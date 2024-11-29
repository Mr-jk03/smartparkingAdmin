import React, { useState, useEffect } from 'react';
import './DetailTicketSold.css';
import { useParams } from 'react-router-dom';
import { endpoint } from '../../../config/apiConfig';

const DetailTicketSold = () => {
  const { id } = useParams(); // Get the id from the URL parameters
  const [ticketData, setTicketData] = useState(null); // Store ticket data
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch ticket data by id when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(endpoint.chitiet_vedamua.url(id), {
      method: endpoint.chitiet_vedamua.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 1000) {
          setTicketData(data.result);
        } else {
          console.error('Error fetching data');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log('Connection error', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }


  function formatTimestamp(timestamp, format) {
    const date = new Date(timestamp);

    const map = {
      'YYYY': date.getFullYear(),
      'MM': String(date.getMonth() + 1).padStart(2, '0'),
      'DD': String(date.getDate()).padStart(2, '0'),
      'HH': String(date.getHours()).padStart(2, '0'),
      'mm': String(date.getMinutes()).padStart(2, '0'),
      'ss': String(date.getSeconds()).padStart(2, '0'),
    };

    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (matched) => map[matched]);
  }
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
                        <label htmlFor='id'>ID vé</label>
                        <input
                          type="text"
                          name='id'
                          value={ticketData?.ticketId || ''}
                          readOnly
                        />
                      </div>
                      <div className="item-dtticketsold">
                        <label htmlFor='name'>Tên vé</label>
                        <input
                          type="text"
                          name='name'
                          value={ticketData?.name || ''}
                          readOnly
                        />
                      </div>
                      <div className="item-dtticketsold">
                        <label htmlFor='unit'>Đơn vị</label>
                        <input
                          type="text"
                          name='unit'
                          value={ticketData?.unit || ''}
                          readOnly
                        />
                      </div>
                      <div className="item-dtticketsold">
                        <label htmlFor='startDate'>Ngày bắt đầu</label>
                        <input
                          type="text"
                          name='startDate'
                          value={ticketData?.startAt ? new Date(ticketData.startAt).toLocaleDateString('vi-VN') : ''}
                          readOnly
                        />
                      </div>
                      <div className="item-dtticketsold">
                        <label htmlFor='endDate'>Ngày kết thúc</label>
                        <input
                          type="text"
                          name='endDate'
                          value={ticketData?.expireAt ? new Date(ticketData.expireAt).toLocaleDateString('vi-VN') : ''}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <div className="item-dtticketsold">
                        <label htmlFor='lastused'>Lần cuối sử dụng</label>
                        <input
                          type="text"
                          name='lastused'
                          value={ticketData?.usedAt && formatTimestamp(ticketData.usedAt, 'HH:mm:ss DD/MM/YYYY')}
                          readOnly
                        />
                      </div>
                      <div className="item-dtticketsold">
                        <label htmlFor='email'>Email</label>
                        <input
                          type="text"
                          name='email'
                          value={ticketData?.email || ''}
                          readOnly
                        />
                      </div>
                      <div className="item-dtticketsold">
                        <label htmlFor='plate'>Biển số</label>
                        <input
                          type="text"
                          name='plate'
                          value={ticketData?.plate || ''}
                          readOnly
                        />
                      </div>
                      <div className="item-dtticketsold">
                        <label htmlFor='vehicle'>Phương tiện</label>
                        <input
                          type="text"
                          name='vehicle'
                          value={ticketData?.vehicle || ''}
                          readOnly
                        />
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

export default DetailTicketSold;
