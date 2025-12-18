module.exports.createPost = (req, res, next) => {
    if (!req.body.title) {
        res.redirect(req.get('referer'));
        return; // Ngăn không cho chạy code phía dưới [15]
    }
    if (!req.body.price) {
        res.redirect(req.get('referer'));
        return; // Ngăn không cho chạy code phía dưới [15]
    }
   

    // Nếu thỏa mãn điều kiện thì cho đi tiếp sang controller [16]
    next();
}