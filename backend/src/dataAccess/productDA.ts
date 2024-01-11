import Product, { ProductCreationAttributes } from "../entities/Product";

async function createProduct(product: ProductCreationAttributes) {
    return await Product.create(product);
}

async function getProductById(id: number) {
    const product = await Product.findByPk(id);
    return product;
}

async function getProductByUserId(userId: number) {
    const product = await Product.findAll({
        where: {
            userId: userId
        }
    });
    return product;
}

async function getProducts() {
    const products = await Product.findAll();
    return products;
}

async function deleteProduct(id: number) {
    let product = await Product.findByPk(id);

    if (product === null) {
        return false;
    }
    await product.destroy();
    return true;
}

async function claimProduct(id: number, userId: number) {
    let product = await Product.findByPk(id);

    if (product === null) {
        return false;
    }
    product.setAttributes({
        isAvailable: false,
        userId: userId
    });
    await product.save();
    return true;
}

async function updateProduct(id: number, product: ProductCreationAttributes) {
    let prod = await Product.findByPk(id);

    if (prod === null) {
        return false;
    }
    prod.setAttributes(product);
    await prod.save();
    return true;
}

export {
    createProduct,
    getProductByUserId,
    getProducts,
    getProductById,
    deleteProduct,
    claimProduct,
    updateProduct
};