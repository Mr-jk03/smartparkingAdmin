import React, { useEffect } from 'react'
import './SettingLocation.css'
import { useState } from 'react'
import { endpoint, refreshToken } from '../../../config/apiConfig';
import { toast, ToastContainer } from 'react-toastify';

const SettingLocation = () => {


    const [totalLocationCar, setTotalLocationCar] = useState();
    const [reservedCar, setReservedCar] = useState();
    const [totalLocationMotor, setTotalLocationMotor] = useState();
    const [reservedMotor, setReservedMotor] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(endpoint.settingLocation.url, {
            method: endpoint.settingLocation.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 1000) {
                    setTotalLocationCar(data.result.maxPositionCar);
                    setReservedCar(data.result.spareCar);
                    setTotalLocationMotor(data.result.maxPositionMotorbike);
                    setReservedMotor(data.result.spareMotorbike)
                } else if (data.code === 5010) {
                    refreshToken()
                } else {
                    toast.error(data.message, {
                        position: "top-right"
                    })
                }
            })
            .catch(err => {
                console.log('Loi ket noi', err)
            })
    }, [])

    const handleEditSetting = () => {
        const body = {
            maxPositionCar: totalLocationCar,
            spareCar: reservedCar,
            maxPositionMotorbike: totalLocationMotor,
            spareMotorbike: reservedMotor
        }
        const token = localStorage.getItem('token');
        fetch(endpoint.put_settingLocation.url, {
            method: endpoint.put_settingLocation.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 1000) {
                    toast.success('Cập nhật vé thành công', { position: 'top-right' })
                } else if (data.code === 5010) {
                    refreshToken()
                } else {
                    toast.error(data.message, {
                        position: "top-right"
                    })
                }
            })
    }



    return (
        <div className='wrapper-settinglct'>
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <span className='title-settinglct'>Cài đặt vị trí đỗ</span>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="location-car">
                            <span>Tổng số vị trí đỗ cho Ô tô: </span>
                            <input type="text"
                                value={totalLocationCar}
                                onChange={(e) => setTotalLocationCar(e.target.value)}
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
                            <button className='btn-submit-lct'
                                onClick={handleEditSetting}
                            >Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingLocation
