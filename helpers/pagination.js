module.exports = (totalProducts,page,numberPagination) => {
    // Pagination helper function (to be implemented)
    let skip = (page - 1) * numberPagination;
    let limitItem = numberPagination;
    let totalPages = Math.ceil(totalProducts / numberPagination);
   
    return {
        skip: skip,
        limitItem: limitItem,
        totalPages: totalPages
    }
   

};