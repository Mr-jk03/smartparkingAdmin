import React from 'react'
import './DetailListAcount.css'
import listaccount from '../../LocalData/ListAccount.json'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const DetailListAcount = () => {

    const {id} = useParams();

    const item = listaccount.find((item) => item.id === id);
    const [idcustomerDt, setIdcustomerDt] = useState(item.idcustomer);
    const [emailAcountDt, setemailAcountDt] = useState(item.email);
    const [nameAccountDt, setnameAccountDt] = useState(item.name)
    const [phoneAcountDt, setPhoneAcountDt] = useState(item.phone);
    const [conSumptionDt, setConsumptionDt] = useState(item.consumption);
    const [ticketBoughtDt, setTickketBoughtDt] = useState(item.ticketbought);
    const [nowBalanceDt, setNowbalanceDt] = useState(item.nowbalance);
    const [statusDt, setStatusDt] = useState(item.status);

    const handleEdit = () => {
        console.log("Thông tin tài khoản đã chỉnh sửa:");
        console.log({
          idcustomer: idcustomerDt,
          email: emailAcountDt,
          name: nameAccountDt,
          phone: phoneAcountDt,
          consumption: conSumptionDt,
          ticketbought: ticketBoughtDt,
          nowbalance: nowBalanceDt,
          status: statusDt,
        });
      };
      

  return (
    <div className='wrapper-dtlistacount'>
        <div className="container">
            <div className="row">
                <span className='title-dtlistaccount'>Chi tiết tài khoản</span>
                <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="main-dtlistaccount">
                        <div className="box-dtlistaccount">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="item-dtlistacount">
                                            <label for='idcustomer'>ID khách hàng</label>
                                            <input type="text" name='idcustomer' 
                                                value={idcustomerDt}
                                                onChange={(e) => setIdcustomerDt(e.target.value)}
                                            />
                                        </div>
                                        <div className="item-dtlistacount">
                                            <label for='idcustomer'>Email</label>
                                            <input type="text" name='idcustomer' 
                                                value={emailAcountDt}
                                                onChange={(e) =>setemailAcountDt(e.target.value)}
                                            />
                                        </div>
                                        <div className="item-dtlistacount">
                                            <label for='idcustomer'>Tên khách hàng</label>
                                            <input type="text" name='idcustomer' 
                                                value={nameAccountDt}
                                                onChange={(e) =>setnameAccountDt(e.target.value)}
                                            />
                                        </div>
                                        <div className="item-dtlistacount">
                                            <label for='idcustomer'>Số điện thoại</label>
                                            <input type="text" name='idcustomer' 
                                                value={phoneAcountDt}
                                                onChange={(e) =>setPhoneAcountDt(e.target.value)}
                                            />
                                        </div>

                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="item-dtlistacount">
                                            <label for='idcustomer'>Tiêu dùng</label>
                                            <input type="text" name='idcustomer' 
                                                value={conSumptionDt}
                                                onChange={(e) => setConsumptionDt(e.target.value)}
                                            />
                                        </div>
                                        <div className="item-dtlistacount">
                                            <label for='idcustomer'>Số vé đã mua</label>
                                            <input type="text" name='idcustomer' 
                                                value={ticketBoughtDt}
                                                onChange={(e) => setTickketBoughtDt(e.target.value)}
                                            />
                                        </div>
                                        <div className="item-dtlistacount">
                                            <label for='idcustomer'>Số dư hiện tại</label>
                                            <input type="text" name='idcustomer' 
                                                value={nowBalanceDt}
                                                onChange={(e)=>setNowbalanceDt(e.target.value)}
                                            />
                                        </div>
                                        <div className="item-dtlistacount">
                                            <label for='status'>Trạng thái</label>
                                            <select 
                                                name="status" 
                                                id="status" 
                                                className='select-vehicle'
                                                value={statusDt} 
                                                onChange={(e) => setStatusDt(e.target.value)}
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="box-btn">
                                            <button onClick={handleEdit}>
                                                Sửa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DetailListAcount