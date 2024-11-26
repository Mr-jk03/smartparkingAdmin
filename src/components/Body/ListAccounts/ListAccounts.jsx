import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import './ListAccounts.css';
import customers from '../../LocalData/ListAccount.json';
import Swal from 'sweetalert2';

const ListAccounts = () => {
  const [searchInput, setSearchInput] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filterInput = customers.filter(customer => {
    const matchesSearch =
      (customer.email && customer.email.toLowerCase().includes(searchInput.toLowerCase())) ||
      (customer.name && customer.name.toLowerCase().includes(searchInput.toLowerCase())) ||
      (customer.phone && customer.phone.toString().includes(searchInput));

    const matchesStatus =
      statusFilter === '' || customer.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleShowDetailCtm = (idcustomer) =>{
    const findCustomer = customers.find((customer) => customer.idcustomer === idcustomer);
    if(findCustomer){
      Swal.fire({
        title: `Thông tin khách hàng <br/>${findCustomer.name}`,
        html:`
          <p><Strong>ID khách hàng: </Strong> ${findCustomer.idcustomer}</p>
          <p><Strong>Tên khách hàng: </Strong> ${findCustomer.name}</p>
          <p><Strong>Email khách hàng: </Strong> ${findCustomer.email}</p>
          <p><Strong>SĐT khách hàng: </Strong> ${findCustomer.phone}</p>
          <p><Strong>Tiêu dùng trong tháng: </Strong> ${findCustomer.consumption.toLocaleString('vi-VN')} <sup>đ</sup></p>
          <p><Strong>Vé đã mua: </Strong> ${findCustomer.ticketbought} vé</p>
          <p><Strong>Số dư hiện tại: </Strong> ${findCustomer.nowbalance.toLocaleString('vi-VN')} <sup>đ</sup></p>
          <p><Strong>Trạng thái: </Strong> ${findCustomer.status}</p>
          `
      })
    }
  }



  return (
    <div className='wrapper-listAccount'>
      <div className="container">
        <div className="row">
          <span className='title-list'>Danh sách tài khoản</span>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="search-input">
              <span>Tìm khách hàng</span>
              <input
                type="text"
                placeholder='Gmail/Tên khách hàng/SĐT'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="search-radio">
              <span>Trạng thái:</span>
              <input
                type="radio"
                name="status"
                value=""
                checked={statusFilter === ''}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
              <span>Tất cả</span>
              <input
                type="radio"
                name="status"
                value="active"
                checked={statusFilter === 'active'}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
              <span>Đang hoạt động</span>
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={statusFilter === 'inactive'}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
              <span>Không hoạt động</span>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="t-head-listac">
              <div className="container">
                <div className="row text-align-center">
                  <div className="col-xl-1 col-lg-1 col-md-1">STT</div>
                  <div className="col-xl-2 col-lg-2 col-md-2">ID khách hàng</div>
                  <div className="col-xl-3 col-lg-3 col-md-3">Email khách hàng</div>
                  <div className="col-xl-2 col-lg-2 col-md-2">Tên khách hàng</div>
                  <div className="col-xl-2 col-lg-2 col-md-2">Số điện thoại</div>
                  <div className="col-xl-1 col-lg-1 col-md-1">Trạng thái</div>
                  <div className="col-xl-1 col-lg-1 col-md-1">Thao tác</div>
                </div>
              </div>
            </div>
            <div className="t-body-listac">
              <div className="container">
                {filterInput.map((customer, index) => (
                  <div className="row text-align-center" key={index}>
                    <div className="col-xl-1 col-lg-1 col-md-1">{index + 1}</div>
                    <div className="col-xl-2 col-lg-2 col-md-2">{customer.idcustomer}</div>
                    <div className="col-xl-3 col-lg-3 col-md-3">{customer.email}</div>
                    <div className="col-xl-2 col-lg-2 col-md-2">{customer.name}</div>
                    <div className="col-xl-2 col-lg-2 col-md-2">{customer.phone}</div>
                    <div className="col-xl-1 col-lg-1 col-md-1">{customer.status}</div>
                    <div className="col-xl-1 col-lg-1 col-md-1 d-flex justify-content-center align-items-center">
                      <button className='btn-active-item-list'
                        onClick={() =>handleShowDetailCtm(customer.idcustomer)}
                      >
                          <FaEye />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListAccounts;
