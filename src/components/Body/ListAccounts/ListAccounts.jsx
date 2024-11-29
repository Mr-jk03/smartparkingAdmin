import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import './ListAccounts.css';
import { endpoint } from '../../../config/apiConfig';
import { toast } from 'react-toastify';

const ListAccounts = () => {
  const [customers, setCustomers] = useState([]); // Lưu dữ liệu gốc từ API
  const [searchInput, setSearchInput] = useState('');
  const [statusFilter, setStatusFilter] = useState('active');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(false);
  const [concat, setConcat] = useState(false)


  const param = () =>{
    return `?name=${encodeURIComponent(searchInput)}&status=${statusFilter}&page=${page}`
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(endpoint.listAccount.url + param(), {
      method: endpoint.listAccount.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 1000) {
          if (data.result.length > 0)
            if (concat) {
              setCustomers([...customers, ...data.result]);
            } else {
              setCustomers(data.result);
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
      .catch((err) => {
        setError(`Lỗi kết nối: ${err.message}`);
      });
  }, [searchInput, statusFilter, page]);

  const onChangeRadio = (e) =>{
    setMaxPage(false)
    setPage(1)
    setStatusFilter(e.target.value)
    setConcat(false)
  }
  const changInputSearch =(e) =>{
    setMaxPage(false)
    setPage(1)
    setSearchInput(e.target.value)
    setConcat(false)
  }

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight <= e.target.scrollTop + e.target.clientHeight + 5;
    if (bottom) {
      if (!maxPage)
        setPage(prevPage => prevPage + 1);
    }
  };

  if (error) {
    return <div>{error}</div>;
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
                placeholder='Tên khách hàng'
                value={searchInput}
                onChange={changInputSearch}
              />
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="search-radio">
              <span>Trạng thái:</span>
              <input
                type="radio"
                name="status"
                value="active"
                checked={statusFilter === 'active'}
                onChange={onChangeRadio}
              />
              <span>Đang hoạt động</span>
              <input
                type="radio"
                name="status"
                value="block"
                checked={statusFilter === 'block'}
                onChange={onChangeRadio}
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
            <div className="t-body-listac" onScroll={handleScroll}>
              <div className="container">
                {customers.map((customer, index) => (
                  <div className="row text-align-center" key={index}>
                    <div className="col-xl-1 col-lg-1 col-md-1">{index + 1}</div>
                    <div className="col-xl-2 col-lg-2 col-md-2">{customer.id}</div>
                    <div className="col-xl-3 col-lg-3 col-md-3">{customer.email}</div>
                    <div className="col-xl-2 col-lg-2 col-md-2">{customer.name}</div>
                    <div className="col-xl-2 col-lg-2 col-md-2">{customer.sdt || 'N/A'}</div>
                    <div className="col-xl-1 col-lg-1 col-md-1">{customer.status}</div>
                    <div className="col-xl-1 col-lg-1 col-md-1 d-flex justify-content-center align-items-center">
                      <Link to={`/detaillistaccount/${customer.id}`}>
                        <button className='btn-active-item-list'>
                          <FaEye />
                        </button>
                      </Link>
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
