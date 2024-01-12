const categoryModel = require('../model/categoryModel');
const serviceModel = require('../model/serviceModel');

exports.addService = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { name, type, priceOptions } = req.body;
        const category = await categoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const newService = await serviceModel.create({
            category: categoryId,
            name,
            type,
            option: priceOptions
        });
        return res.status(201).json({ message: 'Service added successfully', service: newService });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getServicesInCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const services = await serviceModel.find({ category: categoryId });
        return res.status(200).json({ services });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.removeServiceFromCategory = async (req, res) => {
    try {
        const { categoryId, serviceId } = req.params;
        const service = await serviceModel.findOne({ _id: serviceId, category: categoryId });
        if (!service) {
            return res.status(404).json({ message: 'Service not found in the specified category' });
        }
        await serviceModel.findByIdAndDelete(serviceId);
        return res.status(200).json({ message: 'Service removed successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateService = async (req, res) => {
    try {
        const { categoryId, serviceId } = req.params;
        const { name, type, priceOptions } = req.body;
        const service = await serviceModel.findOne({ _id: serviceId, category: categoryId });
        if (!service) {
            return res.status(404).json({ message: 'Service not found in the specified category' });
        }
        service.name = name;
        service.type = type;
        service.priceOptions = priceOptions;
        await service.save();
        return res.status(200).json({ message: 'Service updated successfully', service });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};