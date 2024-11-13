import React, { useState } from 'react'
import './CreateTicket.css'

const CreateTicket = () => {

    const [idTicket, setIDticket] = useState('');
    const [priceTicket, setPriceTicket] = useState('');
    const [statusTicket, setStatusTicket] = useState('');
    const [nameTicket, setNameTicket] = useState('');
    const [timeTicket, setTimeTicket] = useState('');
    const [unit, SetUnit] = useState('');


  return (
    <div className='wrapper-createticket'>
        <div className="container">
            <div className="row">
                <span
                    style={{display:'inline-block', 
                            textAlign:'center',
                            fontWeight:'bold', fontSize:'20px'
                    }}  
                >
                    Thêm vé mới
                </span>
                <div className="col-xl-4 col-lg-4 col-md-4">
                    <div className='box-input-ticket'>
                        <span>Mã vé</span>
                        <input type="text" placeholder='Mã vé' 
                            value={idTicket}
                            onChange={(e) => setIDticket(e.target.value)}
                        />
                    </div>

                    <div className='box-input-ticket'>
                        <span>Giá vé</span>
                        <input type="text" placeholder='Giá vé'
                            value={priceTicket}
                            onChange={(e) =>setPriceTicket(e.target.value)}
                        />
                    </div>

                    <div className='box-input-ticket'>
                        <span>Trạng thái</span>
                        <input type="text" placeholder='Trạng thái'
                            value={statusTicket}
                            onChange={(e) =>setStatusTicket(e.target.value)}
                        />
                    </div>

                    <div className='box-input-ticket'>
                        <button className='btn-create-ticket'>Tạo vé</button>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4">
                    <div className='box-input-ticket'>
                        <span>Tên vé</span>
                        <input type="text" placeholder='Tên vé' 
                            value={nameTicket}
                            onChange={(e) =>setNameTicket(e.target.value)}
                        />
                    </div>

                    <div className='box-input-ticket'>
                        <span>Lượt / Thời gian</span>
                        <input type="text" placeholder='Lượt / thời gian'
                            value={timeTicket}
                            onChange={(e) =>setTimeTicket(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4">
                    <div className='box-input-ticket'>
                        <span>Đơn vị</span>
                        <input type="text" placeholder='Đơn vị'
                            value={unit}
                            onChange={(e) =>SetUnit(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className='box'></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateTicket