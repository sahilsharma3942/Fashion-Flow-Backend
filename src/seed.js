import mongoose from "mongoose";
import Product from "./models/product.models.js";
import Category from "./models/category.models.js";
import { faker } from '@faker-js/faker';
import connectDb from "./db/index.js";


export const seedDatabase =async () => {
    try {
        // Connect to the database
        connectDb();
        await Category.deleteMany({});
        await Product.deleteMany({});

        console.log('Existing data cleared.');

        // Create dummy categories
        const categories = await Category.insertMany([
            { name: "Men's Clothing", description: 'Men fashion clothing and accessories' },
            { name: "Women's Clothing", description: 'Women fashion clothing and accessories' },
            { name: 'Accessories', description: 'Fashion accessories for men and women' },
        ]);

        console.log('Dummy categories created.');

        // Create dummy products
        const products = [];

        // Generate products using Faker.js
        for (let i = 0; i < 20; i++) {
            const categoryIndex = faker.datatype.number({ min: 0, max: categories.length - 1 });
            const categoryName = categories[categoryIndex].name;

            const product = {
                name: faker.commerce.productName(),
                description: faker.lorem.sentence(),
                price: parseFloat(faker.commerce.price(10, 1000)), // Random price between 10 and 1000
                imageUrl: faker.image.fashion(), // Random fashion-related image URL
                category: categories[categoryIndex]._id,
            };

            products.push(product);
        }

        await Product.insertMany(products);

        console.log('Dummy products created.');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
};