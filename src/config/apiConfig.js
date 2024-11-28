
export const baseApi = "http://localhost:8080/gateway/v1"
export const endpoint = {
    login:{ /*dang nhap --da xong */
        url: baseApi + "/identity/auth",
        method: "POST"
    },
    lisTicket: { /*danh sach ve --da xong*/
        url: baseApi + "/ticket/category/all?vehicle=car&status=active&page=1",
        method: "GET"
    },
    detailTicket: { /**chi tet ve -- da xong */
        url: (id) => baseApi + `/ticket/category/detail/${id}`,
        method: "GET"
    },
    listAccount: { /**danh sach tk --da xong */
        url: baseApi + "/identity/users/ds-tai-khoan?name=&status=block&page=1",
        method: "GET"
    },
    deposit_htr:{ /**lich su nap tien -- da xong */
        url: baseApi + "/vault/deposit/mn/history?date=25/11/2024&status=CANCEL&page=1",
        method: "GET"
    },
    revenue:{ /** bieu do thong ke doanh thu -- da xong*/
        url: baseApi + "/ticket/thong-ke/tk-doanh-thu",
        method: "GET"
    },
    tk_ticket_sale:{/**tk ve ban --da xong*/
        url: baseApi + "/ticket/thong-ke/tk-ve-ban",
        method: "GET"
    },
    buyticketforlistEmail:{ /**mua ve hang loat */
        url: baseApi + "/ticket/buy/adminBuyForListEmail",
        method: "POST"
    },
    list_approvemoney:{ /**ds duyet tien thu cong */
        url: baseApi + "/vault/deposit/mn/history?date=28/11/2024&status=wait&page=1",
        method: "GET"
    },
    approvemoney:{ /**duyet tien thu cong */
        url: baseApi + "/vault/deposit/approve",
        method: "POST"
    },
    no_approvemoney:{ /**huy yeu cau nap tien */
        url: baseApi + "/vault/deposit/cancel",
        method: "POST"
    }

}