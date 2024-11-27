import React from 'react'
import { useState } from 'react';
import './Body.css'
import { FaCarSide } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa6";
import dataticket from '../LocalData/DataTickets.json'
import { Link } from 'react-router-dom'

const Body = () => {
    const [filteredTickets, setFilteredTickets] = useState(dataticket);
    
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
                                            <Link to={`/detaillistTicket/${item.id}`}>
                                                <button>
                                                    Chi tiết
                                                </button>
                                            </Link>
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
