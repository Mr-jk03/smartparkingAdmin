import React from 'react'
import './SettingLocation.css'
import { useState } from 'react'

const SettingLocation = () => {

    const [totalLocationCar, setTotalLocationCar] = useState();
    const [reservedCar, setReservedCar] = useState();
    const [totalLocationMotor, setTotalLocationMotor] = useState();
    const [reservedMotor, setReservedMotor] = useState();




  return (
    <div className='wrapper-settinglct'>
        <div className="container">
            <div className="row">
                <span className='title-settinglct'>Cài đặt vị trí đỗ</span>
                <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="location-car">
                        <span>Tổng số vị trí đỗ cho Ô tô: </span>
                        <input type="text"
                            value={totalLocationCar}
                            onChange={(e) =>setTotalLocationCar(e.target.value)}
                        />
                        <span>Dự trữ: </span>
                        <input type="text" 
                            value={reservedCar}
                            onChange={(e) => setReservedCar(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 mt-5">
                    <div className="location-car">
                        <span>Tổng số vị trí đỗ cho Xe máy: </span>
                        <input type="text"
                            value={totalLocationMotor}
                            onChange={(e) => setTotalLocationMotor(e.target.value)}
                        />
                        <span>Dự trữ: </span>
                        <input type="text" 
                            value={reservedMotor}
                            onChange={(e) => setReservedMotor(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="location-car">
                        <button className='btn-submit-lct'>Lưu</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SettingLocation
