import React, { useEffect, useState } from 'react';
import './ApproveMoney.css';
import Swal from 'sweetalert2';
import { endpoint } from '../../../config/apiConfig';

const ApproveMoney = () => {
    const [aprroveMoneys, setAprroveMoneys] = useState([]);
    const [loading, setLoading] = useState(false);

    // Lấy ngày thực tế và chuyển sang định dạng dd/MM/yyyy
    const getTodayDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = today.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        setLoading(true);

        const formattedDate = getTodayDate(); // Lấy ngày thực tế
        const url = `${endpoint.list_approvemoney.url}?date=${formattedDate}&status=wait&page=1`; // Thêm ngày vào URL

        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => res.json())
        .then(data => {
            setLoading(false);
            if (data.code === 1000) {
                setAprroveMoneys(data.result);
            }
        })
        .catch(err => {
            setLoading(false);
            Swal.fire('Lỗi kết nối', 'Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại!', 'error');
            console.error('Lỗi kết nối:', err);
        });
    }, []); // Không cần dependency, vì ngày thực tế chỉ lấy 1 lần khi component mount

    // Duyệt tiền
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
                const body = { id };
                fetch(endpoint.approvemoney.url, {
                    method: endpoint.approvemoney.method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(body),
                })
                .then(res => res.json())
                .then(data => {
                    if (data.code === 1000) {
                        Swal.fire('Thành công', `Giao dịch ${id} đã được duyệt`, 'success');
                        setAprroveMoneys(prev => prev.filter(item => item.id !== id));
                    } else {
                        Swal.fire('Thất bại', `Giao dịch ${id} chưa được duyệt`, 'error');
                    }
                })
                .catch(err => {
                    Swal.fire('Lỗi kết nối', 'Có lỗi xảy ra khi duyệt giao dịch. Vui lòng thử lại!', 'error');
                    console.error('Lỗi kết nối:', err);
                });
            }
        });
    };

    // Hủy giao dịch
    const handleNoAprrpve = (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire('Lỗi xác thực', 'Vui lòng đăng nhập lại', 'error');
            return;
        }

        Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: `Bạn có muốn huỷ giao dịch có mã ${id}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Thực hiện',
            cancelButtonText: 'Huỷ',
        }).then((result) => {
            if (result.isConfirmed) {
                const body = { id };
                fetch(endpoint.no_approvemoney.url, {
                    method: endpoint.no_approvemoney.method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(body),
                })
                .then(res => res.json())
                .then(data => {
                    if (data.code === 1000) {
                        Swal.fire('Thành công', `Giao dịch ${id} đã được huỷ`, 'success');
                        setAprroveMoneys(prev => prev.filter(item => item.id !== id));
                    } else {
                        Swal.fire('Thất bại', `Giao dịch ${id} chưa được huỷ`, 'error');
                    }
                })
                .catch(err => {
                    Swal.fire('Lỗi kết nối', 'Có lỗi xảy ra khi huỷ giao dịch. Vui lòng thử lại!', 'error');
                    console.error('Lỗi kết nối:', err);
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
                                {aprroveMoneys.map((item, index) =>
                                    <div className="row mt-2" key={index}>
                                        <div className="col-xl-1 col-lg-1 col-md-1 text-center">{index + 1}</div>
                                        <div className="col-xl-3 col-lg-3 col-md-3 text-center">{item.id}</div>
                                        <div className="col-xl-2 col-lg-2 col-md-2 text-center">{item.amount} <sup>đ</sup></div>
                                        <div className="col-xl-3 col-lg-3 col-md-3 d-flex justify-content-center">
                                            <button className='btn-duyet' onClick={() => handleAprrpve(item.id)}>
                                                Duyệt
                                            </button>
                                        </div>
                                        <div className="col-xl-3 col-lg-3 col-md-3 d-flex justify-content-center">
                                            <button className='btn-check-apr' onClick={() => handleNoAprrpve(item.id)}>
                                                Huỷ
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApproveMoney;
