import React, { useState } from 'react'
import './Menu.css'
import { Link } from 'react-router-dom'

const Menu = () => {

    const [qlvInvisible, setQlvInvisible] = useState(false);
    const [qlkhInvisible, setQlkhInvisible] = useState(false);
    const [qlntInvisible, setQlnpInvisible] = useState(false);
    const [qltkInvisible, setQltkInvisible] = useState(false);



    const handleShowqlv = () =>{
        setQlvInvisible(!qlvInvisible);
    }
    const handleShowqlkh = () =>{
        setQlkhInvisible(!qlkhInvisible);
    }
    const handleShowQlnt = () =>{
        setQlnpInvisible(!qlntInvisible);
    }
    const handleShowQltk = () =>{
        setQltkInvisible(!qltkInvisible);
    }

  return (
    <div className='wrapper-menu'>
        <div className="ql-item">
            <button className='btn-ql-item' onClick={handleShowqlv}>Quản lí vé</button>
                <ul className={`list-ql-item ${qlvInvisible ? "visible" : ""}`}>
                    <li className='li-item'>
                        <Link to={'/createticket'}>Tạo vé</Link>
                    </li>
                    <li className='li-item'>
                        <Link>Danh sách vé</Link>
                    </li>
                    <li className='li-item'>
                        <Link to={'/ticketsold'}>Vé đã bán</Link>
                    </li>
                </ul>
        </div>
        <div className="ql-item">
            <button className='btn-ql-item' onClick={handleShowqlkh}>Quản lí khách hàng</button>
                <ul className={`list-ql-item ${qlkhInvisible ? "visible" : ""}`}>
                    <li className='li-item'>
                        <Link>Danh sách tài khoản</Link>
                    </li>
                    <li className='li-item'>
                        <Link>Khách hàng tiềm năng</Link>
                    </li>
                </ul>
        </div>

        <div className="ql-item">
            <button className='btn-ql-item' onClick={handleShowQlnt}>Quản lí nạp tiền</button>
                <ul className={`list-ql-item ${qlntInvisible ? "visible" : ""}`}>
                    <li className='li-item'>
                        <Link>Lịch sử nạp tiền</Link>
                    </li>
                    <li className='li-item'>
                        <Link>Duyệt tiền thủ công</Link>
                    </li>
                </ul>
        </div>

        <div className="ql-item">
            <button className='btn-ql-item' onClick={handleShowQltk}>Quản lí thống kê</button>
                <ul className={`list-ql-item ${qltkInvisible ? "visible" : ""}`}>
                    <li className='li-item'>
                        <Link>Thống kê doanh thu</Link>
                    </li>
                    <li className='li-item'>
                        <Link>Thống kê vé bán</Link>
                    </li>
                    <li className='li-item'>
                        <Link>Thống kê thời điểm sử dụng vé</Link>
                    </li>
                </ul>
        </div>

    </div>
  )
}
export  default Menu