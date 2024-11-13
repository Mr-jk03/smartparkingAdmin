import React from 'react'
import './Body.css'
import { FaCarSide } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { FaCircle } from "react-icons/fa6";

const Body = () => {
  return (
    <div className='wrapper-body'>
        <div className="container">
            <div className="row">
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
                                <button className='btn-filter-stt'>
                                    <i className='icon-stt'>
                                        <FaCircle className='icon-public'/>
                                        
                                    </i>
                                    Công khai
                                </button>
                                <button className='btn-filter-stt'>
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
                        <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="box-tk">
                                <div className="ticket">
                                    <span>Mã vé: XMVN123</span>
                                    <span>Phương tiện: Xe máy</span>
                                    <span>Loại vé: Vé ngày</span>
                                    <span>Thời gian hết hạn: 24 giờ</span>
                                    <div className='btn-detail'>
                                        <button>
                                            <Link>Chi tiết</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="box-tk">
                                <div className="ticket">
                                    <span>Mã vé: XMVN123</span>
                                    <span>Phương tiện: Xe máy</span>
                                    <span>Loại vé: Vé ngày</span>
                                    <span>Thời gian hết hạn: 24 giờ</span>
                                    <div className='btn-detail'>
                                        <button>
                                            <Link>Chi tiết</Link>
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
  )
}

export default Body
