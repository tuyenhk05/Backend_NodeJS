module.exports = (query) => {
    const listStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Ngừng hoạt động",
            status: "inactive",
            class: ""
        }
    ];
    if (query) {
        const index = listStatus.findIndex(x => x.status === query);
        listStatus[index].class = "active";
    } else {
        listStatus[0].class = "active";
    }
   
    return listStatus;
}