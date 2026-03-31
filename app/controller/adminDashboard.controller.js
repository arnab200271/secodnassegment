const CategoryModel = require('../model/Category.model');
const ProductModel = require('../model/Product.model');

class DashboardController {
    async dashboard(req, res) {
        try {
            const categories = await CategoryModel.find({ isDeleted: false }).sort({ createdAt: -1 });
            const products = await ProductModel.find({ isDeleted: false }).populate('category').sort({ createdAt: -1 });

            return res.render('admin/dashboard', { categories, products });
        } catch (err) {
            console.log(err);
            return res.send("Error loading dashboard");
        }
    }
}

module.exports = new DashboardController();