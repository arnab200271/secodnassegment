const ProductModel = require("../model/Product.model");
const CategoryModel = require("../model/Category.model");
const validation = require("../utils/product.validation");

class ProductController {
  async manageproduct(req, res) {
    const categories = await CategoryModel.find({ isDeleted: false }).sort({
      createdAt: -1,
    });
    const products = await ProductModel.find({ isDeleted: false })
      .populate("category")
      .sort({ createdAt: -1 });
    res.render("admin/productmanage/manage",{ products, categories });
  }
  //  Create Product
  async productpage(req, res) {
    const categories = await CategoryModel.find({ isDeleted: false });
    res.render("admin/Addproduct/add", {
      categories,
      errors: null,
      oldData: {},
    });
  }
  async createProduct(req, res) {
    try {
      const { name, category, description } = req.body;

      // image upload
      const image = req.file ? req.file.filename : null;

      // Joi validation
      const { error } = validation.validate({
        name,
        category,
        description,
        image,
      });

      if (error) {
        // validation fail  re-render add.ejs with error & old form data
        const categories = await CategoryModel.find({ isDeleted: false });
        return res.render("admin/Addproduct/add", {
          categories,
          errors: error.details,
          oldData: req.body,
        });
      }

      // slug generate
      const slug = name.toLowerCase().split(" ").join("-");

      // save product
      const product = new ProductModel({
        name,
        slug,
        description,
        category,
        image,
      });

      await product.save();

      // redirect after success
      return res.redirect("/admin/products");
    } catch (err) {
      console.log(err);
      return res.send("Error creating product");
    }
  }
}

module.exports = new ProductController();
