const express = require('express');
const router = express.Router();
const rolesController = require('../../controllers/admin/roles.controller');
router.get('/', rolesController.role);
router.get('/create', rolesController.create);
router.post('/create', rolesController.createPost);
router.get('/edit/:id', rolesController.edit);
router.patch("/edit/:id", rolesController.editRole);
module.exports = router;