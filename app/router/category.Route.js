const express = require('express')
const router = express.Router()

const CategoryController = require('../controller/Category.controller')
//post category
router.post("/admin/categories/add",CategoryController.createcategory)
//get category page
router.get("/admin/category",CategoryController.createcategoryhtm)
//get category list page
router.get("/cat/list", CategoryController.getAllCategory)

//edit category 
router.get("/edit/:id", CategoryController.editCategoryPage)
//update category
router.post("/admin/categories/update/:id",CategoryController.updateCategory)
//delete 
router.get("/admin/categories/delete/:id", CategoryController.deleteCategory)
module.exports = router