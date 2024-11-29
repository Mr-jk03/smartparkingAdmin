import React, { useEffect, useState } from 'react';
import './DepositHistorys.css';
import { endpoint } from '../../../config/apiConfig';
import { toast, ToastContainer } from 'react-toastify';

const DepositHistorys = () => {
    const [deposits, setDeposits] = useState([]);
    const [inputDate, setInputDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(false);
    const [concat, setConcat] = useState(false)

    const convertDate = (date) => {
        let split = date.split('-');
        return `${split[2]}/${split[1]}/${split[0]}`;
      }
      

    const param = () =>{
        return `?page=${page}&status=${filterStatus}&date=${inputDate === '' ? '' : convertDate(inputDate)}`;
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        setLoading(true);
       
        const url = `${endpoint.deposit_htr.url + param()}`; 

        fetch(url, {
            method: endpoint.deposit_htr.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => res.json())
        .then(data => {
            setLoading(false);
            if (data.code === 1000) {
                if (data.result.length > 0)
                    if (concat) {
                        setDeposits([...deposits, ...data.result]);
                    } else {
                      setDeposits(data.result)
                      setConcat(true);
                    }
                  else {
                    setMaxPage(true)
                  }
            } else {
                toast.error(data.message, {
                    position: "top-right"
                  })
            }
        })
        .catch(error => {
            setLoading(false);
            console.error('Lỗi kết nối:', error);
        });
    }, [page, inputDate, filterStatus]);

    const onChangeRadio = (e) =>{
        setMaxPage(false)
        setPage(1)
        setFilterStatus(e.target.value)
        setConcat(false)
    }

    const changDate =(e) =>{
        setMaxPage(false)
        setPage(1)
        setInputDate(e.target.value)
        setConcat(false)
    }

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight <= e.target.scrollTop + e.target.clientHeight + 5;
        if (bottom) {
          if (!maxPage)
            setPage(prevPage => prevPage + 1);
        }
      };

    return (
        
        <div className='wrapper-deposit' >
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <span className='title-deposit'>Danh sách lịch sử nạp tiền</span>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="search-deposit">
                            <span>Ngày yêu cầu</span>
                            <input
                                className='ip-date'
                                type="date"
                                value={inputDate}
                                onChange={changDate}
                            />
                            <input type="radio" name='status' value="all"
                                checked={filterStatus === 'all'}
                                onChange={onChangeRadio}
                            />
                            <span>Tất cả</span>
                            <input type="radio" name='status' value="approve"
                                checked={filterStatus === 'approve'}
                                onChange={onChangeRadio}
                            />
                            <span>Đã duyệt</span>
                            <input type="radio" name='status' value="wait"
                                checked={filterStatus === 'wait'}
                                onChange={onChangeRadio}
                            />
                            <span>Chờ duyệt</span>
                            <input type="radio" name='status' value="cancel"
                                checked={filterStatus === 'cancel'}
                                onChange={onChangeRadio}
                            />
                            <span>Đã huỷ</span>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="t-head-deposit">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-1 col-lg-1 col-md-1 style-tb">STT</div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 style-tb">ID Khách hàng</div>
                                    <div className="col-xl-2 col-lg-2 col-md-2 style-tb">Số tiền</div>
                                    <div className="col-xl-2 col-lg-2 col-md-2 style-tb">Thời gian yêu cầu</div>
                                    <div className="col-xl-2 col-lg-2 col-md-2 style-tb">Thực hiện bởi</div>
                                    <div className="col-xl-2 col-lg-2 col-md-2 style-tb">Trạng thái</div>
                                </div>
                            </div>
                        </div>

                        <div className="t-body-deposit" onScroll={handleScroll}>
                            <div className="container">
                                {deposits.map((deposit, index) => (
                                    <div className="row" key={index}>
                                        <div className="col-xl-1 col-lg-1 col-md-1 style-tb">{index + 1}</div>
                                        <div className="col-xl-3 col-lg-3 col-md-3 style-tb">{deposit.ownerId}</div>
                                        <div className="col-xl-2 col-lg-2 col-md-2 style-tb">{deposit.amount}</div>
                                        <div className="col-xl-2 col-lg-2 col-md-2 style-tb">{new Date(deposit.createAt).toLocaleString()}</div>
                                        <div className="col-xl-2 col-lg-2 col-md-2 style-tb">{deposit.actionBy || "N/A"}</div>
                                        <div className="col-xl-2 col-lg-2 col-md-2 style-tb">{deposit.trang_thai || "Chưa xác định"}</div>
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
