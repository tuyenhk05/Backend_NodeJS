

// Xử lý sự kiện click cho các nút lọc trạng thái
const buttonsStatus = document.querySelectorAll("[button-status]");

if (buttonsStatus.length > 0) {
    // Lấy ra cái URL hiện tại của trình duyệt
    const url = new URL(window.location.href);

    buttonsStatus.forEach(button => {

        button.addEventListener("click", () => {
            // Lấy giá trị status từ thuộc tính tự định nghĩa (vd: button-status="active")
            const status = button.getAttribute("button-status");

            buttonsStatus.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");
           
            if (status) {
                // Nếu có status, gắn thêm ?status=... vào URL
                url.searchParams.set("status", status);
            } else {
                // Nếu status rỗng (nút "Tất cả"), xóa params status đi
                url.searchParams.delete("status");
            }

            // Chuyển hướng trang web sang cái URL mới
            window.location.href = url.href;
        });
    });
}

// Xử lý sự kiện tìm kiếm
const keysearch = document.querySelector("#form-search");
if (keysearch) {
    keysearch.addEventListener("submit", function (e) {
        const url = new URL(window.location.href);

        e.preventDefault();
        const keyword = document.querySelector(".form-control").value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}

// Xử lý phân trang
const paginationLinks = document.querySelectorAll("[paginationButton]");
if (paginationLinks.length > 0) {
    const url = new URL(window.location.href);

    paginationLinks.forEach(link => {
        link.addEventListener("click", () => {
            const page = link.getAttribute("paginationButton");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        });
    });
    if (url.searchParams.get("page") > paginationLinks.length - 2) {
        url.searchParams.set("page", paginationLinks.length - 2);
        window.location.href = url.href;
    }

   
}

 
//preview image khi chọn file
const inputImage = document.querySelector("[input-image]");
if (inputImage) {
    const previewImage = document.querySelector("[preview-image]");
    inputImage.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            previewImage.src = URL.createObjectURL(file);
            previewImage.style.display = "block";
        }
    })
}
