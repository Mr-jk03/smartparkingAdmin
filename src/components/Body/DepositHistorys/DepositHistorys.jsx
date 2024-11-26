import React from 'react'
import './DepositHistorys.css'
import { useState } from 'react'
import deposits from '../../LocalData/Deposit.json'

const DepositHistorys = () => {
    const [inputDate, setInputDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');


    const filterDepositData = deposits.filter(deposit => {
        const matchesDate = inputDate === '' || deposit.tao_luc.startsWith(inputDate.split('-').reverse().join('/'));

        const matchesStatus = filterStatus === '' || deposit.trang_thai.toLocaleLowerCase() === filterStatus;
        return  matchesDate && matchesStatus;
    });

    return (
        <div className='wrapper-deposit'>
            <div className="container">
                <div className="row">
                    <span className='title-deposit'>Danh sách lịch sử nạp tiền</span>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="search-deposit">
                            <span>Ngày yêu cầu</span>
                            <input className='ip-date'
                                type="date"
                                value={inputDate}
                                onChange={(e) => setInputDate(e.target.value)}
                            />
                            <input type="radio"  name='status' 
                                value=""
                                checked ={filterStatus === ''}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            />
                            <span>Tất cả</span>
                            <input type="radio" name='status' 
                                value="đã duyệt"
                                checked ={filterStatus === 'đã duyệt'}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            />
                            <span>Đã duyệt</span>
                            <input type="radio"  name='status' 
                                value="chờ duyệt"
                                checked ={filterStatus === 'chờ duyệt'}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            />
                            <span>Chờ duyệt</span>
                            <input type="radio"  name='status' 
                                value="đã huỷ"
                                checked ={filterStatus === 'đã huỷ'}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            />
                            <span>Đã huỷ</span>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="t-head-deposit">
                            <div className="container">
                                <div className="row ">
                                    <div className="col-xl-1 col-lg-1 col-md-1 style-tb">STT</div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 style-tb">ID Khách hàng</div>
                                    <div className="col-xl-2 col-lg-2 col-md-2 style-tb">Số tiền</div>
                                    <div className="col-xl-2 col-lg-2 col-md-2 style-tb">Thời gian yêu cầu</div>
                                    <div className="col-xl-2 col-lg-2 col-md-2 style-tb">Thực hiện bởi</div>
                                    <div className="col-xl-2 col-lg-2 col-md-2 style-tb">Trạng thái</div>
                                </div>
                            </div>
                        </div>

                        <div className="t-body-deposit">
                            <div className="container">
                                {filterDepositData.map((deposit, index) => (
                                    <div className="row" key={index}>
                                        <div className="col-xl-1 col-lg-1 col-md-1 style-tb">{index + 1}</div>
                                        <div className="col-xl-3 col-lg-3 col-md-3 style-tb">{deposit.id_khach_hang}</div>
                                        <div className="col-xl-2 col-lg-2 col-md-2 style-tb">{deposit.so_tien}</div>
                                        <div className="col-xl-2 col-lg-2 col-md-2 style-tb">{deposit.tao_luc}</div>
                                        <div className="col-xl-2 col-lg-2 col-md-2 style-tb">{deposit.thuc_hien_boi}</div>
                                        <div className="col-xl-2 col-lg-2 col-md-2 style-tb">{deposit.trang_thai}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DepositHistorys;
