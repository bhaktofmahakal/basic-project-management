const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { validate, createProjectSchema, updateStatusSchema, querySchema } = require('../validators/projectValidator');

router.post('/', validate(createProjectSchema), projectController.create);
router.get('/', validate(querySchema), projectController.getAll);
router.get('/:id', projectController.getById);
router.patch('/:id/status', validate(updateStatusSchema), projectController.updateStatus);
router.delete('/:id', projectController.delete);

module.exports = router;
