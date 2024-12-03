import React, { useState } from 'react';
import './CreateTicket.css';
import Swal from 'sweetalert2';
import { endpoint } from '../../../config/apiConfig';
import { toast, ToastContainer } from 'react-toastify';

const CreateTicket = () => {
  const [idTicket, setIDticket] = useState('');
  const [priceTicket, setPriceTicket] = useState('');
  const [nameTicket, setNameTicket] = useState('');
  const [unit, setUnit] = useState('day'); 
  const [vehicle, setVehicle] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [quantity, setQuantity] = useState();

  const handleLimited = async () => {
    const { value: limitedValue } = await Swal.fire({
      title: 'Nhập số lượt',
      input: 'number',
      inputPlaceholder: 'Nhập số lượt giới hạn',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
      inputValidator: (value) => {
        if (!value) return 'Bạn cần nhập một số!';
        if (value <= 0) return 'Số lượt phải lớn hơn 0!';
      },
    });

    if (limitedValue) {
      setQuantity(Number(limitedValue)); // Cập nhật số lượt giới hạn
      setUnit('limited'); // Đánh dấu trạng thái giới hạn
    }
  };

  const handleTimeSelect = (e) => {
    const value = e.target.value;
    if (value === 'limited') {
      handleLimited(); // Xử lý Swal khi chọn giới hạn
    } else {
      setQuantity(0); // Không giới hạn
      setUnit(value);
    }
  };

  const handleCreateTicket = () => {
    const token = localStorage.getItem('token');

    const body = {
      id: idTicket,
      status: status,
      unit: unit, // Đơn vị thời gian
      name: nameTicket,
      vehicle: vehicle.toUpperCase(),
      price: Number(priceTicket),
      quantity: quantity, // Gửi số lượt
    };

    fetch(endpoint.create_ticket.url, {
      method: endpoint.create_ticket.method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 1000) {
          toast.success('Tạo vé thành công', { position: 'top-right' });
          // Reset form sau khi tạo vé
          setIDticket('');
          setPriceTicket('');
          setNameTicket('');
          setUnit(''); // Reset về mặc định "day"
          setVehicle('');
          setQuantity();
        } else {
          toast.error(data.message, { position: 'top-right' });
        }
      })
      .catch((err) => {
        console.log('Lỗi kết nối', err);
      });
  };

  return (
    <div className="wrapper-createticket">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <span
            style={{
              display: 'inline-block',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '20px',
            }}
          >
            Thêm vé mới
          </span>
          <div className="col-xl-4 col-lg-4 col-md-4">
            <div className="box-input-ticket">
              <span>Mã vé</span>
              <input
                type="text"
                placeholder="Mã vé"
                value={idTicket}
                onChange={(e) => setIDticket(e.target.value)}
              />
            </div>

            <div className="box-input-ticket">
              <span>Giá vé</span>
              <input
                type="number"
                placeholder="Giá vé"
                value={priceTicket}
                onChange={(e) => setPriceTicket(e.target.value)}
              />
            </div>

            <div className="box-input-ticket">
              <span>Trạng thái</span>
              <select
                className="select-stt"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="ACTIVE">Công khai</option>
                <option value="INACTIVE">Ẩn</option>
              </select>
            </div>

            <div className="box-input-ticket">
              <button className="btn-create-ticket" onClick={handleCreateTicket}>
                Tạo vé
              </button>
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-4">
            <div className="box-input-ticket">
              <span>Tên vé</span>
              <input
                type="text"
                placeholder="Tên vé"
                value={nameTicket}
                onChange={(e) => setNameTicket(e.target.value)}
              />
            </div>

            <div className="box-input-ticket">
              <span>Phương tiện</span>
              <select
                className="select-stt"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
              >
                <option value="">--Phương tiện--</option>
                <option value="MOTORBIKE">Xe máy</option>
                <option value="CAR">Ô tô</option>
              </select>
            </div>

            <div className="box-input-ticket">
              <span>Số lượt</span>
              <select
                className="select-stt"
                value={quantity}
                onChange={handleTimeSelect}
              >
                <option value="0">Không giới hạn</option>
                <option value="limited">Có giới hạn</option>
              </select>
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-4">
            <div className="box-input-ticket">
              <span>Đơn vị</span>
              <select
                className="select-stt"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="day">Ngày</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
