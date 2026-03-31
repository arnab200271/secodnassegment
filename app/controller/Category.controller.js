// model
const CategoryModel = require("../model/Category.model");
//validation joi
const validation = require("../utils/category.validation");

// create controller
class categorycontroller {
  //create category
  //render html page
  async createcategoryhtm(req, res) {
    res.render("admin/category/add");
  }
  async createcategory(req, res) {
    try {
      const { name } = req.body;
      //joi validation
      const { error } = validation.validate({ name });
      if (error) {
        res.send("error", error.details[0].message);
        return res.redirect("back");
      }
      //slug genarate
      const slug = name.toLowerCase().split(" ").join("-");
      //save to database
      const category = new CategoryModel({
        name,
        slug,
      });
      await category.save();
      // return success
      res.redirect('/cat/list')
    } catch (error) {
      //error
      //console.log(err0);
      res.send("error", "Something went wrong");
      return res.redirect("back");
    }
  }
  // get all category
  async getAllCategory(req, res) {
    try {
      const categories = await CategoryModel.find({ isDeleted: false }).sort({
        createdAt: -1,
      });
        return res.render("admin/Allcategory/category",{
        categories
    });
    } catch (err) {
      console.log(err);
      return res.send("Error fetching categories");
    }
  }

// edit category 
async editCategoryPage(req, res) {
  try {
    const { id } = req.params;

    // find category by id
    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.send("Category not found");
    }

    // render edit page with data
    return res.render("admin/editcategory/edit", {
      category
    });

  } catch (err) {
    console.log(err);
    return res.send("Error loading edit page");
  }
}
// update category
async updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Joi validation
    const { error } = validation.validate({ name });

    if (error) {
      return res.send(error.details[0].message);
    }

    // slug generate
    const slug = name.toLowerCase().split(" ").join("-");

    // update category
    await CategoryModel.findByIdAndUpdate(id, {
      name,
      slug
    });

    return res.redirect("/cat/list");

  } catch (err) {
    console.log(err);
    return res.send("Error updating category");
  }
}
//soft delete
async deleteCategory(req, res) {
  try {
    const { id } = req.params;

    // soft delete (isDeleted = true)
    await CategoryModel.findByIdAndUpdate(id, {
      isDeleted: true
    });

    return res.redirect("/cat/list");

  } catch (err) {
    console.log(err);
    return res.send("Error deleting category");
  }
}
}
module.exports = new categorycontroller();
