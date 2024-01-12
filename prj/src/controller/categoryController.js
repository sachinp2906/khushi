const categoryModel = require('../model/categoryModel');
const serviceModel = require('../model/serviceModel');

exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category with this name already exists' });
        }
        const newCategory = await categoryModel.create({ name });
        return res.status(201).json({ message: 'Category added successfully', category: newCategory });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        return res.status(200).json({ categories });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
      const { name } = req.body;
      const category = await categoryModel.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      category.name = name;
      await category.save();
      return res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

exports.removeEmptyCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await categoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const servicesInCategory = await serviceModel.find({ category: categoryId });
        if (servicesInCategory.length > 0) {
            return res.status(400).json({ message: 'Category has associated services. Cannot remove.' });
        }
        await categoryModel.findByIdAndDelete(categoryId);
        return res.status(200).json({ message: 'Empty category removed successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
