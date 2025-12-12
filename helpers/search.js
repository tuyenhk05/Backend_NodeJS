module.exports = (find,keyword) => {
    if (keyword) {
        const regex = new RegExp(keyword, 'i'); // 'i' for case-insensitive
        find.title = regex;
    }
    return find;
}