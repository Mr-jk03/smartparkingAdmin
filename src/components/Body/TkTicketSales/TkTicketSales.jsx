import React from 'react'
import { useState, useEffect } from 'react'
import './TkTicketSales.css'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dataticksales from '../../LocalData/DataTicketSales.json'
import { endpoint, refreshToken } from '../../../config/apiConfig';
import { toast } from 'react-toastify';

const TkTicketSales = () => {

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const [monthRvn, setMonthRvn] = useState(currentMonth);
    const [yearRvn, setYearRvn] = useState(currentYear);
    const [filteredData, setFilteredData] = useState([]);
    const [totalMonth, setTotalMonth] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`${endpoint.tk_ticket_sale.url.split('?')[0]}?date=${monthRvn}/${yearRvn}`, {
            method: endpoint.tk_ticket_sale.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 1000) {
                    setFilteredData(data.result);
                    const totalRevenue = data.result.reduce((total, item) => total + item.motorbike + item.car, 0);
                    setTotalMonth(totalRevenue);
                } else if (data.code === 5010) {
                    refreshToken()
                } else {
                    toast.error(data.message, {
                        position: "top-right"
                    })
                }
            })
            .catch(error => {
                console.log('Lỗi kết nối:', error);
            });
    }, [monthRvn, yearRvn]);

    return (
        <div className='wrapper-tkticketsales'>
            <span className='title-tkticketsales'>Thống kê vé bán</span>
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
            <span className='total-ticketsales'>Tổng vé bán trong tháng {monthRvn} / {yearRvn}: {totalMonth} vé</span>
            <div className="col-xl-12 col-lg-12 col-md-12">
                <div className='chart-ticketsales'>
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
                            <Bar dataKey="motorbike" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                            <Bar dataKey="car" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default TkTicketSales
