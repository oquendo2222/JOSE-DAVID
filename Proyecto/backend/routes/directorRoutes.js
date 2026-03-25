const { Router } = require('express');
const { getDirectores, createDirector, updateDirector, deleteDirector } = require('../controllers/DirectorController');
const router = Router();

router.get('/', getDirectores);
router.post('/', createDirector);
router.put('/:id', updateDirector);
router.delete('/:id', deleteDirector);

module.exports = router;
