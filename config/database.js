const moogoose = require('mongoose');
module.exports.connect = async() => {
    try {
        await moogoose.connect(process.env.MONGODB_URI);
        console.log('Database connected successfully');
    }
    catch (error) {
        console.error('Error connecting to the database', error);
    }

}
