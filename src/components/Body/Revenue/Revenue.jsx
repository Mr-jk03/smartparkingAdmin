import React, { useEffect, useState } from 'react';
import './Revenue.css';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import allData from '../../LocalData/DataRevenue.json';
import { endpoint } from '../../../config/apiConfig';


const Revenue = () => {

    const currentMonth = new Date().getMonth() + 1; 
    const currentYear = new Date().getFullYear(); 

    const [monthRvn, setMonthRvn] = useState(currentMonth); 
    const [yearRvn, setYearRvn] = useState(currentYear); 
    const [filteredData, setFilteredData] = useState([]);
    const [totalMonth, setTotalMonth] = useState(0);
    const [tableTicket, setTableTicket] = useState([]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('vi-VN'); 
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`${endpoint.revenue.url.split('?')[0]}?date=${monthRvn}/${yearRvn}`,{
            method: endpoint.revenue.method,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.code === 1000) {
                setFilteredData(data.result);
                const totalRevenue = data.result.reduce((total, item) => total + item.amountMotorbike + item.amountCar, 0);
                setTotalMonth(totalRevenue);
            } else {
                console.error('Lỗi khi lấy dữ liệu');
            }
        })
        .catch(error => {
            console.log('Lỗi kết nối:', error);
        });
    }, [monthRvn, yearRvn]);

    useEffect(() =>{
        const token = localStorage.getItem('token');
        fetch(`${endpoint.list_ticke_table_revenue.url.split('?')[0]}?date=${monthRvn}/${yearRvn}`,{
            method: endpoint.list_ticke_table_revenue.method,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.code === 1000){
                setTableTicket(data.result);
            }else{
                console.error('loi khi lay du lieu')
            }
        })
        .catch(err =>{
            console.log('Loi ket noi', err);
        })
    },[])

    return (
        <div className='wrapper-revenue'>
            <div className="container">
                <div className="row">
                    <span className='title-revenue'>Thống kê doanh thu</span>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="main-filter">
                            <span>Tháng</span>
                            <input 
                                type="number" 
                                placeholder='Nhập tháng...' 
                                value={monthRvn}
                                onChange={(e) => setMonthRvn(Number(e.target.value))} 
                            />
                            <span>Năm</span>
                            <input 
                                type="number" 
                                placeholder='Nhập năm...' 
                                value={yearRvn}
                                onChange={(e) => setYearRvn(Number(e.target.value))} 
                            />
                        </div>
                    </div>
                    <span className='total-revenue'>Tổng doanh thu trong tháng {monthRvn}/{yearRvn}: {totalMonth.toLocaleString('vi-VN')} <sup>đ</sup></span>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className='chart-revenue'>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={filteredData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="amountMotorbike" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                    <Bar dataKey="amountCar" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <span className='title-revenue mt-3'>Chi tiết doanh thu</span>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="thead-revenue">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-2 col-lg-2 col-md-2 fw-bold text-center">STT</div>
                                    <div className="col-xl-4 col-lg-4 col-md-4 fw-bold text-center">Ngày bán</div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 fw-bold text-center">Số tiền</div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 fw-bold text-center">Phương tiện</div>
                                </div>
                            </div>
                        </div>

                        <div className="tbody-revenue">
                            <div className="container">
                                {tableTicket.map((item, index) =>
                                <div className="row" key={index}>
                                    <div className="col-xl-2 col-lg-2 col-md-2 text-center">{index + 1}</div>
                                    <div className="col-xl-4 col-lg-4 col-md-4 text-center">{formatDate(item.buyAt)}</div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 text-center">{item.category.price}</div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 text-center">{item.category.vehicle}</div>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Revenue;
