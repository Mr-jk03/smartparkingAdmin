import React from 'react'
import { useState } from 'react';
import './Body.css'
import { FaCarSide } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa6";
import dataticket from '../LocalData/DataTickets.json'
import Swal from 'sweetalert2'

const Body = () => {
    const [filteredTickets, setFilteredTickets] = useState(dataticket);

    const handleDetail = (id) => {
        const ticket = dataticket.find((item) => item.id === id);
        if (ticket) {
            Swal.fire({
                title: `Thông tin vé "${ticket.name}"`,
                html: `
                    <p><strong>Mã vé:</strong> ${ticket.id}</p>
                    <p><strong>Tên vé:</strong> ${ticket.name}</p>
                    <p><strong>Giá vé:</strong> ${ticket.price} đ</p>
                    <p><strong>Trạng thái:</strong> ${ticket.status}</p>
                    <p><strong>Lượt/Thời gian:</strong> ${ticket.quantity}</p>
                    <p><strong>Đơn vị:</strong> ${ticket.unit}</p>
                    <p><strong>Phương tiện:</strong> ${ticket.vehicle}</p>
                    <p><strong>Tạo lúc:</strong> ${ticket.createat}</p>
                `,
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Sửa thông tin vé',
                cancelButtonText: 'Huỷ',
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: `Sửa thông tin vé "${ticket.name}"`,
                        html: `
                            <label for="editname">Tên vé</label>
                            <input id="editName" name="editname" type="text" class="swal2-input" placeholder="Tên vé" value="${ticket.name}">
                            <label for="editPrice">Giá vé</label>
                            <input id="editPrice" name="editPrice" type="number" class="swal2-input" placeholder="Giá vé" value="${ticket.price}">
                            <label for="editStatus">Trạng thái</label>
                            <select id="editStatus" name="editStatus" class="swal2-input">
                                <option value="Công khai" ${ticket.status === 'Công khai' ? 'selected' : ''}>Công khai</option>
                                <option value="Ẩn" ${ticket.status === 'Ẩn' ? 'selected' : ''}>Ẩn</option>
                            </select>
                        `,
                        showCancelButton: true,
                        confirmButtonText: 'Lưu',
                        cancelButtonText: 'Huỷ',
                        preConfirm: () => {
                            const updatedName = document.getElementById('editName').value;
                            const updatedPrice = document.getElementById('editPrice').value;
                            const updatedStatus = document.getElementById('editStatus').value;
    
                            if (!updatedName || !updatedPrice || !updatedStatus) {
                                Swal.showValidationMessage('Vui lòng điền đầy đủ thông tin!');
                                return null;
                            }
    
                            return {
                                name: updatedName,
                                price: updatedPrice,
                                status: updatedStatus,
                            };
                        },
                    }).then((editResult) => {
                        if (editResult.isConfirmed) {
                            // const updatedTicket = editResult.value;
    
                            // // Cập nhật dữ liệu trong dataticket
                            // const ticketIndex = dataticket.findIndex((item) => item.id === id);
                            // if (ticketIndex !== -1) {
                            //     dataticket[ticketIndex] = {
                            //         ...ticket,
                            //         ...updatedTicket,
                            //     };
    
                            //     Swal.fire(
                            //         'Thành công',
                            //         `Thông tin vé "${updatedTicket.name}" đã được cập nhật.`,
                            //         'success'
                            //     );
                            // }

                            Swal.fire(
                                        'Thành công',
                                        `Thông tin vé đã được cập nhật.`, //"${updatedTicket.name}"
                                        'success'
                                    );
                        }
                    });
                }
            });
        } else {
            Swal.fire('Lỗi', 'Không tìm thấy vé!', 'error');
        }
    };
    
    const filterByStatus = (status) => {
        if (status === '') {
            setFilteredTickets(dataticket);
        } else {
            const filtered = dataticket.filter((ticket) => ticket.status === status);
            setFilteredTickets(filtered);
        }
    };



  return (
    <div className='wrapper-body'>
        <div className="container">
            <div className="row">
                <span className='title-listTicker'>Danh sách vé</span>
                <span style={{fontWeight:'bold'}}>Bộ lọc</span>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <span style={{display:'inline-block', 
                                          marginLeft:'15px',
                                          fontWeight:'bold'}}>
                                Theo phương tiện
                            </span>
                            <div className='btn-filter'>
                                <button className='btn-filter-vehical'>
                                    <i className='icon-vhc'>
                                        <FaMotorcycle />
                                        
                                    </i>
                                    Xe máy
                                </button>
                                <button className='btn-filter-vehical'>
                                    <i className='icon-vhc'>
                                    <FaCarSide />
                                    </i>
                                    Ô tô
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <span style={{display:'inline-block', 
                                          marginLeft:'15px',
                                          fontWeight:'bold'}}>
                                Theo Trạng thái
                            </span>
                            <div className='btn-filter'>

                                <button className='btn-filter-stt'
                                    onClick={() => filterByStatus('')}
                                >
                                    Tất cả
                                </button>

                                <button className='btn-filter-stt'
                                    onClick={() => filterByStatus('Công khai')}
                                >
                                    <i className='icon-stt'>
                                        <FaCircle className='icon-public'/>
                                        
                                    </i>
                                    Công khai
                                </button>
                                <button className='btn-filter-stt'
                                    onClick={() => filterByStatus('Ẩn')}
                                >
                                    <i className='icon-stt'>
                                        <FaCircle className='icon-private'/>
                                    </i>
                                    Ẩn
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <hr style={{margin:'15px 0px'}}/>

                <div className="container">
                    <div className="row">
                        {filteredTickets.map((item, index) =>
                            <div className="col-xl-6 col-lg-6 col-md-6" key={index}>
                                <div className="box-tk">
                                    <div className="ticket">
                                        <span>Tên vé: {item.name}</span>
                                        <span>Phương tiện: {item.vehicle}</span>
                                        <span>Loại vé: Vé {item.unit}</span>
                                        <span>Giá vé: {item.price} <sup>đ</sup></span>
                                        <span>Thời gian hết hạn: {item.quantity}</span>
                                        <div className='btn-detail'>
                                            <button 
                                                onClick={() =>handleDetail(item.id)}
                                            >
                                                Chi tiết
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Body
