import React, { useState } from 'react'
import './ApproveMoney.css'
import aprroveMoneys from '../../LocalData/ApproveMoney.json'
import Swal from 'sweetalert2'

const ApproveMoney = () => {

    const [findDate, setFindDate] = useState('');

    const findApproveMoneyDate = aprroveMoneys.filter(apr =>{
        const matchesFindDate = findDate === '' || apr.date.startsWith(findDate.split('-').reverse().join('/'));

        return matchesFindDate
    })

    const handleAprrpve = (ma_giao_dich)=>{
        Swal.fire({
            title: 'Bạn có chắc chắn ?',
            text: `Bạn có muốn duyệt giao dịch có mã ${ma_giao_dich}`,
            icon:'warning',
            showCancelButton:true,
            confirmButtonText: 'Duyệt',
            cancelButtonText: 'Huỷ',
        }).then((result) =>{
            if(result.isConfirmed){
                // xu li sk o day
                Swal.fire('Thành công', `Giao dịch ${ma_giao_dich} đã được duyệt`, 'success')
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
                                    <div className="col-xl-3 col-lg-3 col-md-3 text-center">{item.ma_giao_dich}</div>
                                    <div className="col-xl-2 col-lg-2 col-md-2 text-center">{item.so_tien} <sup>đ</sup></div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 d-flex justify-content-center">
                                        <button className='btn-duyet'
                                            onClick={() =>handleAprrpve(item.ma_giao_dich)}
                                        >Duyệt</button>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 d-flex justify-content-center">
                                        <button className='btn-check-apr'>Huỷ</button>
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
