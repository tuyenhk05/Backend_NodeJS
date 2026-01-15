const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const rolesschema = new mongoose.Schema(
    {
        title: String,
        description: String,
        slug: {
            type: String,
            unique: true,
            slug: "title"
        },
        deleted:
        {
            type: Boolean, default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true
    }
);
const Roles = mongoose.model('Roles', rolesschema, "roles");
module.exports = Roles;
