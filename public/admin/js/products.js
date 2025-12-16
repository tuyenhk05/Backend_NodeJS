const statusButtons = document.querySelectorAll("[changeStatusButton]");
if (statusButtons.length > 0) {
    const statusForm = document.querySelector("#formChangeStatus");
    const path = statusForm.getAttribute("dataPath");
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


//delete product
const buttonDeleteProducts = document.querySelectorAll("[buttonDelete]");
if (buttonDeleteProducts.length > 0) {
    const formDeleteProduct = document.querySelector("#formDeleteProduct");
    const pathDelete = formDeleteProduct.getAttribute("dataPath");

    buttonDeleteProducts.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirmed = confirm("Are you sure you want to delete this product?");
            if (isConfirmed) {
                const id = button.getAttribute("dataId");
                const actionUrl = `${pathDelete}/${id}?_method=DELETE`;
                formDeleteProduct.setAttribute("action", actionUrl);
                formDeleteProduct.submit();

            }

        })
    });
}


//end delete product

//select all checkbox
const selectAllCheckbox = document.querySelector("[checkboxSelectAll]");
if (selectAllCheckbox) {
    const checkboxes = document.querySelectorAll("[checkboxSelectItem]");
    //check all for boxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            selectAllCheckbox.checked = allChecked;
        });
    });
    //select all functionality
    selectAllCheckbox.addEventListener("change", () => {
        const isChecked = selectAllCheckbox.checked;
        checkboxes.forEach(checkbox => {

            checkbox.checked = isChecked;
        });
    });

}

const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const dataAction = formChangeMulti.querySelector("[valueData]").value;
        console.log(dataAction);
        const checkboxes = document.querySelector("[checkbox-Multi]");
        const checkboxSelected = checkboxes.querySelectorAll("input[name='id']:checked");
        if (dataAction.length > 0) {
            if (checkboxSelected.length > 0) {
                const ids = [];
                const inputData = document.querySelector("input[name='ids']");
                checkboxSelected.forEach(checkbox => {
                    ids.push(checkbox.getAttribute("dataId"));
                });
                inputData.value = ids.join(",");
                formChangeMulti.submit();
            }

        else {
                alert("Bạn chưa chọn phần tử nào.");
                return;
            }
        }
        else {
            alert("Bạn chưa chọn hành động nào.");
            return;
        }

            
    });
}



//end select all checkbox