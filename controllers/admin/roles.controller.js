const roleModel = require('../../models/roles.model');
// //[GET] /admin/roles
module.exports.role =async (req, res) => {
    try {
        const find = {
            deleted: false
        }
        const roles =await roleModel.find(find);
        res.render('admin/pages/roles/index', {
            PageTitle: 'roles Dashboard',
            roles: roles
        });
    } catch (error) {
        console.error('Error rendering roles page:', error);
        res.status(500).send('Internal Server Error');
    }
    
};
//[GET] /admin/roles/create
module.exports.create = (req, res) => {
    try {
        res.render('admin/pages/roles/create', {
            PageTitle: 'Create roles'
        });
    } catch (error) {
        console.error('Error rendering create roles page:', error);
        res.status(500).send('Internal Server Error');
    }
};
//[POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
    try {
        const newRole = new roleModel(req.body);
        await newRole.save();
        res.redirect('/admin/roles');
    } catch (error) {
        console.log("Error creating role:", error);
        res.redirect('/admin/roles/create');

    }
}
//[GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {

    try
    {
        const roleId = req.params.id;
        const find = {
            _id: roleId,
            deleted: false
        }
        const role = await roleModel.findOne(find);
        console.log(role);
        res.render('admin/pages/roles/edit', {
            PageTitle: 'Edit Role',
            role: role
        });
    } catch (error) {
        console.log("Error editing role:", error);
        res.redirect('/admin/roles');
    }
};
//[PATCH] /admin/roles/edit/:id
module.exports.editRole = async (req, res) => {
    try {
        const id = req.params.id;
        const update = req.body;
        console.log("Update data:", req.body);
        await roleModel.updateOne({
            _id: id
        },
            update
        );
        res.redirect('/admin/roles');
    } catch (error) {
        console.log("Error updating role:", error);
        res.redirect('/admin/roles');
    }
}