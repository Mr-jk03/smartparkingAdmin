import React from 'react'
import './Ticketssold.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Ticketssold = () => {

    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [email, setEmail] = useState('');
    const [plate, setPlate] = useState('');

  return (
    <div className='wapper-ticket-sold'>
        <div className="container">
            <div className="row">
                <span
                    style={{display:'inline-block',
                            height:'auto',
                            width:'100%',
                            textAlign:'center', margin:'15px', fontWeight:'bold',
                            textTransform:'uppercase', fontSize:'20px'
                    }}
                >
                    Vé đã bán
                </span>
                <div className="col-xl-3 col-lg-3 col-md-3">
                    <div className="box-ticker-sold">
                        <span
                            style={{display:'inline-block',
                                height:'auto',
                                width:'100%',
                                textAlign:'start', paddingLeft:'5px', fontWeight:'bold',
                                textTransform:'capitalize', fontSize:'15px'
                            }}
                        >   
                            Bộ lọc dữ liệu
                        </span>
                        <div className='box-filter-menu'>
                            <span className='sp-td'>Thời điểm</span>
                            <div className='input-time'>
                                <span>Từ</span>
                                <input type="text" 
                                    value={timeStart}
                                    onChange={(e) =>setTimeStart(e.target.value)}
                                />
                            </div>
                            <div className='input-time'>
                                <span>Tới</span>
                                <input type="text" 
                                    value={timeEnd}
                                    onChange={(e) =>setTimeEnd(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='box-filter-menu'>
                            <span className='sp-td'>Email / ID khách hàng</span>
                            <div className='input-time'>
                                <input type="text" 
                                     value={email}
                                     onChange={(e) =>setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='box-filter-menu'>
                            <span className='sp-td'>Nội dung biển số</span>
                            <div className='input-time'>
                                <input type="text" 
                                    value={plate}
                                    onChange={(e) =>setPlate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='box-filter-menu'>
                            <span className='sp-td'>Phương tiện</span>
                            <div className='input-time'>
                                <select className='select-vhc' name="" id="">
                                    <option value="" selected>-- Chọn phương tiện --</option>
                                    <option value="">Xe máy</option>
                                    <option value="">Ô tô</option>
                                </select>
                            </div>
                        </div>




                    </div>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-9">
                    <div className="box-ticker-sold">
                        <div className="th">
                           <div className="container">
                                <div className="row">
                                        <div className="col-xl-2 col-lg-2 col-md-2 text-center">Tên vé</div>
                                        <div className="col-xl-3 col-lg-3 col-md-3 text-center">Số lần sử dụng</div>
                                        <div className="col-xl-5 col-lg-5 col-md-5 text-center">Lần cuối sử dụng</div>
                                        <div className="col-xl-2 col-lg-2 col-md-2 text-center">Hành động</div>
                                </div>
                           </div>
                        </div>

                        <div className="tr">
                           <div className="container">
                                <div className="row">
                                        <div className="col-xl-2 col-lg-2 col-md-2 text-center">Vé ngày</div>
                                        <div className="col-xl-3 col-lg-3 col-md-3 text-center">2</div>
                                        <div className="col-xl-5 col-lg-5 col-md-5 text-center">21:21 | 26.01.2024</div>
                                        <div className="col-xl-2 col-lg-2 col-md-2 text-center">
                                            <Link className='ac-detail'>Xem chi tiết</Link>
                                        </div>
                                </div>
                           </div>
                        </div>

                        <div className="tr">
                           <div className="container">
                                <div className="row">
                                        <div className="col-xl-2 col-lg-2 col-md-2 text-center">Vé ngày</div>
                                        <div className="col-xl-3 col-lg-3 col-md-3 text-center">2</div>
                                        <div className="col-xl-5 col-lg-5 col-md-5 text-center">21:21 | 26.01.2024</div>
                                        <div className="col-xl-2 col-lg-2 col-md-2 text-center">
                                            <Link className='ac-detail'>Xem chi tiết</Link>
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

export default Ticketssold