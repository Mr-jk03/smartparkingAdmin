import React, { useState } from 'react'
import './DetailListTickets.css'
import { useParams } from 'react-router-dom'
import dataticket from '../../LocalData/DataTickets.json'

const DetailListTickets = () => {

    const {id} = useParams();

    const item = dataticket.find((item) => item.id === id);
    const [idticketDt, setIdTicketDt] = useState(item.id);
    const [nameticketDt, setNameticketDt] = useState(item.name);
    const [priceTicketDt, setPriveDt] = useState(item.price);
    const [statusDt, setStatusDt] = useState(item.status);
    const [quantityDt, setQuantityDt] = useState(item.quantity);
    const [unitDt, setUnitDt] = useState(item.unit)
    const [vehicleDt, setVehicleDt] = useState(item.vehicle);
    const [createAtDt, setCreateAtDt] = useState(item.createat);

    const handleUpdate = () => {
        console.log("Thông tin sau khi chỉnh sửa:");
        console.log({
          id: idticketDt,
          name: nameticketDt,
          price: priceTicketDt,
          status: statusDt,
          quantity: quantityDt,
          unit: unitDt,
          vehicle: vehicleDt,
          createAt: createAtDt,
        });
      };
      



  return (
    <div className='wrapper-detailtk'>
        <div className="container">
            <div className="row">
                <span className='title-detailtk'>Chi tiết vé</span>
                <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="main-detail">
                        <div className="box-dt-ticket">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6">

                                        <div className='item'>
                                            <label for="id"><b>ID vé :</b></label> 
                                            <input type="text" name='id' value={idticketDt} onChange={(e) => setIdTicketDt(e.target.value)}/>
                                        </div>
                                        
                                        <div className='item'>
                                            <label for="name"><b>Tên vé :</b></label>
                                            <input type="text" name='name' value={nameticketDt} onChange={(e) => setNameticketDt(e.target.value)}/>
                                        </div>
                                        
                                        <div className='item'>
                                            <label for="price"><b>Giá vé :</b></label>
                                            <input type="text" name='price' value={priceTicketDt} onChange={(e) => setPriveDt(e.target.value)}/>
                                        </div>
                                        <div className='item'>
                                            <label for="status"><b>Trạng thái :</b></label>
                                            <input type="text" name='status' value={statusDt} onChange={(e) => setStatusDt(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">

                                        <div className="item">
                                            <label for="quantity"><b>Thời gian :</b></label>
                                            <input type="text" name='quantity' value={quantityDt} onChange={(e) => setQuantityDt(e.target.value)}/>
                                        </div>
                                        
                                        <div className="item">
                                            <label for="unit"><b>Đơn vị :</b></label>
                                            <input type="text" name='unit' value={unitDt} onChange={(e) => setUnitDt(e.target.value)}/>
                                        </div>
                                        <div className="item">
                                            <label for="vehicle"><b>Phương tiện :</b></label>
                                            <input type="text" name='vehicle' value={vehicleDt} onChange={(e) => setVehicleDt(e.target.value)}/>
                                        </div>
                                        <div className="item">
                                            <label for="createAt"><b>Tạo lúc :</b></label>
                                            <input type="text" name='createAt' value={createAtDt} onChange={(e) => setCreateAtDt(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12 col-md-12 mt-3">
                                        <div className="box-btn">
                                            <button onClick={handleUpdate}>
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

export default DetailListTickets
