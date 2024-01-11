import express from 'express';
import { claimProduct, createProduct, deleteProduct, getProductById, getProductByUserId, getProducts, updateProduct } from '../dataAccess/productDA';

const productRouter = express.Router();

productRouter.route('/product/all').get(async (req, res) => {
    try {
        const products = await getProducts();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'Error getting products', error: error });
    }
});

productRouter.route('/product/:id').get(async (req, res) => {
    try {
        const product = await getProductById(parseInt(req.params.id));
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Error getting product', error: error });
    }
});

productRouter.route('/product/user/:id').get(async (req, res) => {
    try {
        const products = await getProductByUserId(parseInt(req.params.id));
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'Error getting products', error: error });
    }
});

productRouter.route('/product/:id/claim').put(async (req, res) => {
    try {
        const result = await claimProduct(
          parseInt(req.params.id),
          parseInt(req.body.userId)
        );
        if (!result) {
            return res.status(500).json({ message: 'Error claiming product' });
        }
        return res.status(200).json({ message: 'Product claimed successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error claiming product', error: error });
    }
});

productRouter.route('/product').post(async (req, res) => {
    try {
        const body = req.body;
        const date = new Date(Date.parse(body.expirationDate));
        const product = await createProduct({
            name: body.name,
            category: body.category,
            expirationDate: date,
            quantity: body.quantity,
            isAvailable: body.isAvailable,
            userId: body.userId
        });
        return res.status(200).json({
            message: 'Product created successfully',
            product: product
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating product', error: error });
    }
});

productRouter.route('/product/:id').delete(async (req, res) => {
    try {
        const product = await getProductById(parseInt(req.params.id));
        if (product === null) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const result = await deleteProduct(parseInt(req.params.id));
        if (!result) {
            return res.status(500).json({ message: 'Error deleting product' });
        }
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating product', error: error });
    }
});

productRouter.route('/product/:id').put(async (req, res) => {
    try {
        const product = await getProductById(parseInt(req.params.id));
        if (product === null) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const body = req.body;
        const date = new Date(Date.parse(body.expirationDate));
        const result = await updateProduct(parseInt(req.params.id), {
            name: body.name,
            category: body.category,
            expirationDate: date,
            quantity: body.quantity,
            isAvailable: body.isAvailable,
            userId: body.userId
        });
        if (!result) {
            return res.status(500).json({ message: 'Error updating product' });
        }
        return res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating product', error: error });
    }
});

export default productRouter;