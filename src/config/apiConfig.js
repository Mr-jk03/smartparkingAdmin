
export const baseApi = "http://localhost:8080/gateway/v1"
export const endpoint = {
    login: { /*dang nhap --da xong */
        url: baseApi + "/identity/auth",
        method: "POST"
    },
    lisTicket: { /*danh sach ve --da xong*/
        url: baseApi + "/ticket/category/all?vehicle=car&status=active&page=1",
        method: "GET"
    },

    timkiemve: { /*danh sach ve --da xong*/
        url: baseApi + "/ticket/category/tim-kiem-ve",
        method: "GET"
    },
    detailTicket: { /**chi tet ve -- da xong */
        url: (id) => baseApi + `/ticket/category/detail/${id}`,
        method: "GET"
    },
    listAccount: { /**danh sach tk --da xong */
        url: baseApi + "/identity/users/ds-tai-khoan",
        method: "GET"
    },
    deposit_htr: { /**lich su nap tien -- da xong */
        url: baseApi + "/vault/deposit/mn/history",
        method: "GET"
    },
    revenue: { /** bieu do thong ke doanh thu -- da xong*/
        url: baseApi + "/ticket/thong-ke/tk-doanh-thu",
        method: "GET"
    },
    tk_ticket_sale: {/**tk ve ban --da xong*/
        url: baseApi + "/ticket/thong-ke/tk-ve-ban",
        method: "GET"
    },
    buyticketforlistEmail: { /**mua ve hang loat */
        url: baseApi + "/ticket/buy/adminBuyForListEmail",
        method: "POST"
    },
    list_approvemoney: { /**ds duyet tien thu cong */
        url: baseApi + "/vault/deposit/mn/history",
        method: "GET"
    },
    approvemoney: { /**duyet tien thu cong */
        url: baseApi + "/vault/deposit/approve",
        method: "POST"
    },
    no_approvemoney: { /**huy yeu cau nap tien */
        url: baseApi + "/vault/deposit/cancel",
        method: "POST"
    },
    list_ticke_table_revenue: { /**ds ves ban duoi doanh thu */
        url: baseApi + "/ticket/ds-ve-ban",
        method: "GET"
    },
    tim_kiem_ds_ve_ban: { /*tim kiem ve */
        url: baseApi + "/ticket/timkiem-ds-ve-ban",
        method: "GET"
    },
    chitiet_vedamua: {
        url: (id) => baseApi + `/ticket/admin/${id}`,
        method: "GET"
    },
    thong_tin_tai_khoan: {
        url: baseApi + "/identity/users/info/thong_tin_tai_khoan",
        method: "GET"
    },

    sua_trang_thai_tk: {
        url: baseApi + "/identity/users/action",
        method: "PATCH"
    },

    settingLocation: { /**Cai datj vi tri */
        url: baseApi + "/ticket/setting",
        method: "GET"
    },
    put_settingLocation: { /* sua vi tri */
        url: baseApi + "/ticket/setting",
        method: "PUT"
    },
    patch_stt_ticket: { /**cap nhat trang thai ve trong cua hang doi fig api*/
        url: baseApi + "/ticket/category/update/status",
        method: "PATCH"
    },
    patch_price_ticket: { /*cap nhat gia ve trong cua hang ---doi fig api*/
        url: baseApi + "/ticket/category",
        method: "PATCH"
    }


}