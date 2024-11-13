import React from 'react'
import './Header.css'
import Logo from '../Images/logo.png'
import { FaUserCircle } from "react-icons/fa";
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className='wrapper-header'>
        <div className="container">
            <div className="row khung-header">
                <div className="col-xl-1 col-lg-2 col-md-2">
                    <div className="logo">
                        <img src={Logo} alt="" />
                    </div>
                </div>
                <div className='col-xl-10 col-lg-8 col-md-8'>
                    <Link className='title-name' to={'/'}>parking</Link>
                </div>
                <div className="col-xl-1 col-lg-2 col-md-2">
                    <div className="avatar">
                        <Link to={'/'}>
                            <FaUserCircle />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header
