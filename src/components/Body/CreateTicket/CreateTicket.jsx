import React, { useState } from 'react';
import './CreateTicket.css';
import Swal from 'sweetalert2';

const CreateTicket = () => {
  const [idTicket, setIDticket] = useState('');
  const [priceTicket, setPriceTicket] = useState('');
  const [nameTicket, setNameTicket] = useState('');
  const [timeTicket, setTimeTicket] = useState('');
  const [options, setOptions] = useState(['Không giới hạn']); // Danh sách options mặc định

  const handleLimited = async () => {
    const { value: limitedValue } = await Swal.fire({
      title: 'Nhập số lượt',
      input: 'number',
      inputPlaceholder: 'Nhập số lượt giới hạn',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
      inputValidator: (value) => {
        if (!value) {
          return 'Bạn cần nhập một số!';
        }
        if (value <= 0) {
          return 'Số lượt phải lớn hơn 0!';
        }
      },
    });

    if (limitedValue) {
      const newOption = `${limitedValue}`;
      setOptions((prevOptions) => [...prevOptions, newOption]); // Thêm option mới
      setTimeTicket(newOption); // Chọn luôn option vừa tạo
    }
  };

  const handleTimeSelect = (e) => {
    const value = e.target.value;
    if (value === 'limited') {
      handleLimited(); // Hiển thị Swal nếu chọn "có giới hạn"
    } else {
      setTimeTicket(value); // Cập nhật trực tiếp nếu không phải "có giới hạn"
    }
  };

  return (
    <div className="wrapper-createticket">
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
                type="text"
                placeholder="Giá vé"
                value={priceTicket}
                onChange={(e) => setPriceTicket(e.target.value)}
              />
            </div>

            <div className="box-input-ticket">
              <span>Trạng thái</span>
              <select name="" id="" className="select-stt">
                <option value="" disabled>
                  --Trạng thái--
                </option>
                <option value="active">Công khai</option>
                <option value="inactive">Ẩn</option>
              </select>
            </div>

            <div className="box-input-ticket">
              <button className="btn-create-ticket">Tạo vé</button>
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
              <select name="" id="" className="select-stt">
                <option value="" selected>
                  --Phương tiện--
                </option>
                <option value="Motorbike">Xe máy</option>
                <option value="Car">Ô tô</option>
              </select>
            </div>

            <div className="box-input-ticket">
              <span>Số lượt</span>
              <select
                name=""
                id=""
                className="select-stt"
                value={timeTicket}
                onChange={handleTimeSelect}
              >
                <option value="" selected>
                  --Số lượt--
                </option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
                <option value="limited">Có giới hạn</option>
              </select>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4">
            <div className="box-input-ticket">
              <span>Đơn vị</span>
              <select name="" id="" className="select-stt">
                <option value="day" selected>
                  Ngày
                </option>
              </select>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="box"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
