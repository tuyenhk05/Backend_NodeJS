let count = 0; // Biến toàn cục để đánh số thứ tự (Index)

const createTree = (arr, parentId = "") => {
    const tree = [];
    arr.forEach((item) => {
        if (item.parentId === parentId) {
            count++; // Mỗi lần tìm thấy 1 nhánh, tăng số thứ tự lên
            const newItem = item;
            newItem.index = count; // Gán chỉ số cho nhánh đó

            // Đệ quy: Tìm các thằng con của thằng hiện tại
            const children = createTree(arr, item.id);
            if (children.length > 0) {
                newItem.children = children;
            }
            tree.push(newItem);
        }
    });
    return tree;
};

module.exports = (arr, parentId = "") => {
    count = 0; // Reset lại biến đếm mỗi khi gọi hàm, kẻo nó tăng mãi "mô" có dừng
    return createTree(arr, parentId);
};