require("dotenv").config();

const mongoose = require("mongoose");
const Category = require("../models/Category");
const categories = require("./categories");

async function seedCategories() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        for (const category of categories) {
            await Category.findOneAndUpdate(
                { name: category.name },
                { name: category.name },
                { upsert: true, new: true }
            );
        }

        console.log("Categories seeded successfully!");
    } catch (error) {
        console.error("Error seeding categories:", error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

seedCategories();