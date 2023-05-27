export const userColumns = [
    { field: 'id', headerName: 'ID', width: 70 }, 
    {
        field: "user",
        headerName: "User",
        width: 230,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.img} alt="avatar" />
                    {params.row.username}
                    </div>
            );
        },
    },

    {
        field: "email",
        headerName: "Email",
        width: 230,
    },

    {
        field: "age",
        headerName: "Age",
        width: 100,
    },

    {
        field: "status",
        headerName: "Status",
        width: 160,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.status}`}>
                {params.row.status}
            </div> );
        },
    },
];  


//tempo data

export const userRows = [
    {
        id: 1,
        username: "Snow",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "active",
        email: "1snow@gmail.com",
        age: 35,
    },

    {
        id: 2,
        username: "Pandoy",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 34,
    },

    {
        id: 3,
        username: "Lancelot",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "pending",
        email: "1pandoy@gmail.com",
        age: 33,
    },

    {
        id: 4,
        username: "Wanwan",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 22,
    },

    {
        id: 5,
        username: "Granger",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 24,
    },

    {
        id: 6,
        username: "Karrie",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 18,
    },

    {
        id: 7,
        username: "Ling",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "pending",
        email: "1pandoy@gmail.com",
        age: 20,
    },

    {
        id: 8,
        username: "Aamon",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 22,
    },

    {
        id: 9,
        username: "Saber",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 27,
    },

    {
        id: 10,
        username: "Hylos",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 30,
    },

    {
        id: 11,
        username: "Snow",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "active",
        email: "1snow@gmail.com",
        age: 35,
    },

    {
        id: 12,
        username: "Pandoy",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 34,
    },

    {
        id: 13,
        username: "Lancelot",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "pending",
        email: "1pandoy@gmail.com",
        age: 33,
    },

    {
        id: 14,
        username: "Wanwan",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 22,
    },

    {
        id: 15,
        username: "Granger",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 24,
    },

    {
        id: 16,
        username: "Karrie",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 18,
    },

    {
        id: 17,
        username: "Ling",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "pending",
        email: "1pandoy@gmail.com",
        age: 20,
    },

    {
        id: 18,
        username: "Aamon",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 22,
    },

    {
        id: 19,
        username: "Saber",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 27,
    },

    {
        id: 20,
        username: "Hylos",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 30,
    },

    {
        id: 21,
        username: "Snow",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "active",
        email: "1snow@gmail.com",
        age: 35,
    },

    {
        id: 22,
        username: "Pandoy",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 34,
    },

    {
        id: 23,
        username: "Lancelot",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "pending",
        email: "1pandoy@gmail.com",
        age: 33,
    },

    {
        id: 24,
        username: "Wanwan",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 22,
    },

    {
        id: 25,
        username: "Granger",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 24,
    },

    {
        id: 26,
        username: "Karrie",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 18,
    },

    {
        id: 27,
        username: "Ling",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "pending",
        email: "1pandoy@gmail.com",
        age: 20,
    },

    {
        id: 28,
        username: "Aamon",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 22,
    },

    {
        id: 29,
        username: "Saber",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 27,
    },

    {
        id: 30,
        username: "Hylos",
        img: "https://cdn.oneesports.gg/cdn-data/2022/08/MLBB_Wanwan-1024x576.webp",
        status: "passive",
        email: "1pandoy@gmail.com",
        age: 30,
    },
]