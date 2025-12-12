const statusButtons = document.querySelectorAll("[changeStatusButton]");
if (statusButtons.length > 0) {
    const statusForm = document.querySelector("#formChangeStatus");
    const path = statusForm.getAttribute("dataPath");
    console.log(path);
    statusButtons.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("dataStatus");
            const id = button.getAttribute("dataId");

            let statusToUpdate = status === "active" ? "inactive" : "active";

            const actionUrl = `${path}/${statusToUpdate}/${id}?_method=PATCH`;

            statusForm.setAttribute("action", actionUrl);
            statusForm.submit();
        })
    });
}


