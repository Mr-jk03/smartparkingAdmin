import React, { useEffect, useState } from 'react';
import './DetailListAcount.css';
import { useParams } from 'react-router-dom';
import { endpoint, refreshToken } from '../../../config/apiConfig';
import { toast, ToastContainer } from 'react-toastify';

const DetailListAcount = () => {
    const { id } = useParams();

    // Khởi tạo state cho từng trường dữ liệu
    const [idcustomerDt, setIdcustomerDt] = useState('');
    const [emailAcountDt, setEmailAcountDt] = useState('');
    const [nameAccountDt, setNameAccountDt] = useState('');
    const [phoneAcountDt, setPhoneAcountDt] = useState('');
    const [conSumptionDt, setConsumptionDt] = useState('');
    const [ticketBoughtDt, setTicketBoughtDt] = useState('');
    const [nowBalanceDt, setNowbalanceDt] = useState('');
    const [statusDt, setStatusDt] = useState('');

    const handleChangeStatus = (e) => {
        console.log(e.target.value)
        const token = localStorage.getItem('token');

        fetch(endpoint.sua_trang_thai_tk.url, {
            method: endpoint.sua_trang_thai_tk.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ listUid: [id], status: e.target.value.toUpperCase() })
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 1000) {
                    setStatusDt(e.target.vaule === "ACTIVE" ? "Đang hoạt động" : "Đã khoá")
                    toast.success("Thay đổi thành công", { position: "top-right" })
                } else if (data.code === 5010) {
                    refreshToken()
                } else {
                    toast.error(data.message, {
                        position: "top-right"
                    })
                }
            })
            .catch(err => {
                console.log('Lỗi kết nối:', err);
                toast.error('Lỗi kết nối đến server!', { position: 'top-right' });
            });
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch(endpoint.thong_tin_tai_khoan.url + `?id=${id}`, {
            method: endpoint.thong_tin_tai_khoan.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 1000) {
                    const result = data.result;

                    // Cập nhật state với dữ liệu từ API
                    setIdcustomerDt(result.id || '');
                    setEmailAcountDt(result.email || '');
                    setNameAccountDt(result.name || '');
                    setPhoneAcountDt(result.phone || '');
                    setConsumptionDt(result.tieu_dung_trong_thang || 0);
                    setTicketBoughtDt(result.so_ve_da_mua || 0);
                    setNowbalanceDt(result.so_du || 0);
                    setStatusDt(result.status || 'Active');
                } else if (data.code === 5010) {
                    refreshToken()
                } else {
                    toast.error(data.message, {
                        position: "top-right"
                    })
                }
            })
            .catch(err => {
                console.log('Lỗi kết nối:', err);
                toast.error('Lỗi kết nối đến server!', { position: 'top-right' });
            });
    }, [id]);

    return (
        <div className='wrapper-dtlistacount'>
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <span className='title-dtlistaccount'>Chi tiết tài khoản</span>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="main-dtlistaccount" >
                            <div className="box-dtlistaccount" style={{ width: "900px" }}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="item-dtlistacount">
                                                <label>ID khách hàng</label>
                                                <input
                                                    type="text"
                                                    value={idcustomerDt}

                                                />
                                            </div>
                                            <div className="item-dtlistacount">
                                                <label>Email</label>
                                                <input
                                                    type="text"
                                                    value={emailAcountDt}
                                                    onChange={(e) => setEmailAcountDt(e.target.value)}
                                                />
                                            </div>
                                            <div className="item-dtlistacount">
                                                <label>Tên khách hàng</label>
                                                <input
                                                    type="text"
                                                    value={nameAccountDt}
                                                    onChange={(e) => setNameAccountDt(e.target.value)}
                                                />
                                            </div>
                                            <div className="item-dtlistacount">
                                                <label>Số điện thoại</label>
                                                <input
                                                    type="text"
                                                    value={phoneAcountDt}
                                                    onChange={(e) => setPhoneAcountDt(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="item-dtlistacount">
                                                <label>Tiêu dùng</label>
                                                <input
                                                    type="text"
                                                    value={conSumptionDt}
                                                    onChange={(e) => setConsumptionDt(e.target.value)}
                                                />
                                            </div>
                                            <div className="item-dtlistacount">
                                                <label>Số vé đã mua</label>
                                                <input
                                                    type="text"
                                                    value={ticketBoughtDt}
                                                    onChange={(e) => setTicketBoughtDt(e.target.value)}
                                                />
                                            </div>
                                            <div className="item-dtlistacount">
                                                <label>Số dư hiện tại</label>
                                                <input
                                                    type="text"
                                                    value={nowBalanceDt}
                                                    onChange={(e) => setNowbalanceDt(e.target.value)}
                                                />
                                            </div>
                                            <div className="item-dtlistacount">
                                                <label>Trạng thái</label>
                                                <select className='ip-date'
                                                    onChange={handleChangeStatus}
                                                >
                                                    <option value="Active" selected={statusDt === "Đang hoạt động"}>Đang hoạt động</option>
                                                    <option value="Inactive" selected={statusDt === "Đã khoá"}>Ngưng hoạt động</option>
                                                </select>
                                            </div>
                                        </div>
                                        {/* <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="box-btn">
                                                <button>
                                                    Sửa
                                                </button>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailListAcount;
