const express = require('express');
const router = express.Router();
const company = require('../Controllers/company.controllers');
const auth = require('../Controllers/authentication.controllers');


router.get('/all', auth.validateToken, company.getCompanies);

router.get('/:companyId', auth.validateToken, company.getCompany);

router.post('/create', auth.validateToken, company.addCompany);

router.put('/edit/:id', auth.validateToken, company.editCompany);

router.delete('/delete/:id', auth.validateToken, company.deleteCompany);

module.exports = router;