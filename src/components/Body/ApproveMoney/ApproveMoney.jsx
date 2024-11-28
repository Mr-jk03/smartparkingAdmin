import React, { useEffect, useState } from 'react'
import './ApproveMoney.css'
// import aprroveMoneys from '../../LocalData/ApproveMoney.json'
import Swal from 'sweetalert2'
import { endpoint } from '../../../config/apiConfig'

const ApproveMoney = () => {
    const [aprroveMoneys, setAprroveMoneys] = useState([]);
    

    const [findDate, setFindDate] = useState('');

    const findApproveMoneyDate = aprroveMoneys.filter(apr =>{
        const matchesFindDate = findDate === '' || apr.date.startsWith(findDate.split('-').reverse().join('/'));

        return matchesFindDate
    })

    useEffect(() =>{
        const token = localStorage.getItem('token');
        fetch(endpoint.list_approvemoney.url,{
            method: endpoint.list_approvemoney.method,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => res.json())
        .then(data =>{
            if(data.code === 1000){
                setAprroveMoneys(data.result);
            }
        })
    },[])

    // duyet tien
    const handleAprrpve = (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire('Lỗi xác thực', 'Vui lòng đăng nhập lại', 'error');
            return;
        }
    
        Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: `Bạn có muốn duyệt giao dịch có mã ${id}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Duyệt',
            cancelButtonText: 'Huỷ',
        }).then((result) => {
            if (result.isConfirmed) {
                const body = {
                    id,
                };
    
                fetch(endpoint.approvemoney.url, {
                    method: endpoint.approvemoney.method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(body),
                })
                    .then((res) => {
                        if (res.status === 401) {
                            throw new Error('Unauthorized');
                        }
                        return res.json();
                    })
                    .then((data) => {
                        if (data.code === 1000) {
                            Swal.fire('Thành công', `Giao dịch ${id} đã được duyệt`, 'success');
                            setAprroveMoneys((prev) => prev.filter((item) => item.id !== id));
                        } else {
                            Swal.fire('Thất bại', `Giao dịch ${id} chưa được duyệt`, 'error');
                        }
                    })
                    .catch((error) => {
                        if (error.message === 'Unauthorized') {
                            Swal.fire('Lỗi xác thực', 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!', 'error');
                            localStorage.removeItem('token');
                        } else {
                            Swal.fire('Lỗi kết nối', 'Có lỗi xảy ra khi duyệt giao dịch. Vui lòng thử lại!', 'error');
                            console.log('Lỗi kết nối:', error);
                        }
                    });
            }
        });
    };
    
    // huy
    const handleNoAprrpve = (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire('Lỗi xác thực', 'Vui lòng đăng nhập lại', 'error');
            return;
        }
    
        Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: `Bạn có muốn huỷ giao dịch có mã  ${id}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Thực hiện',
            cancelButtonText: 'Huỷ',
        }).then((result) => {
            if (result.isConfirmed) {
                const body = {
                    id,
                };
    
                fetch(endpoint.no_approvemoney.url, {
                    method: endpoint.no_approvemoney.method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(body),
                })
                    .then((res) => {
                        if (res.status === 401) {
                            throw new Error('Unauthorized');
                        }
                        return res.json();
                    })
                    .then((data) => {
                        if (data.code === 1000) {
                            Swal.fire('Thành công', `Giao dịch ${id} đã được huỷ`, 'success');
                            setAprroveMoneys((prev) => prev.filter((item) => item.id !== id));
                        } else {
                            Swal.fire('Thất bại', `Giao dịch ${id} chưa được huỷ`, 'error');
                        }
                    })
                    .catch((error) => {
                        if (error.message === 'Unauthorized') {
                            Swal.fire('Lỗi xác thực', 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!', 'error');
                            localStorage.removeItem('token');
                        } else {
                            Swal.fire('Lỗi kết nối', 'Có lỗi xảy ra khi duyệt giao dịch. Vui lòng thử lại!', 'error');
                            console.log('Lỗi kết nối:', error);
                        }
                    });
            }
        });
    };




  return (
    <div className='wrapper-approve'>
        <div className="container">
            <div className="row">
                <span className='title-aprrove'>
                    Danh sách yêu cầu duyệt tiền
                </span>
                <div className="col-xl-7 col-lg-7 col-md-7">
                    <div className="search-approve">
                        <span className='fw-bold'>Ngày giao dịch</span>
                        <input type="date" className='search-date-approve'
                            value={findDate}
                            onChange={(e) => setFindDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="thead-approve">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-1 col-lg-1 col-md-1 fw-bold text-center">STT</div>
                                <div className="col-xl-3 col-lg-3 col-md-3 fw-bold text-center">Mã giao dịch</div>
                                <div className="col-xl-2 col-lg-2 col-md-2 fw-bold text-center">Số tiền</div>
                                <div className="col-xl-3 col-lg-3 col-md-3 fw-bold text-center">Duyệt tiền</div>
                                <div className="col-xl-3 col-lg-3 col-md-3 fw-bold text-center">Huỷ</div>
                            </div>
                        </div>
                    </div>

                    <div className="tbody-approve">
                        <div className="container">
                            {findApproveMoneyDate.map((item, index) =>
                                <div className="row mt-2" key={index}>
                                    <div className="col-xl-1 col-lg-1 col-md-1 text-center">{index + 1}</div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 text-center">{item.id}</div>
                                    <div className="col-xl-2 col-lg-2 col-md-2 text-center">{item.amount} <sup>đ</sup></div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 d-flex justify-content-center">
                                        <button className='btn-duyet'
                                            onClick={() =>handleAprrpve(item.id)}
                                        >Duyệt</button>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 d-flex justify-content-center">
                                        <button className='btn-check-apr'
                                            onClick={()=>handleNoAprrpve(item.id)}
                                        >Huỷ</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ApproveMoney
