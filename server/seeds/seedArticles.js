
require("dotenv").config();

const mongoose = require("mongoose");
const Article = require("../models/Article");
const Category = require("../models/Category");
const articles = [
    ...require("./articles"),
    ...require("./additionalArticles"),
];

async function seedArticles() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        for (const article of articles) {
            const category = await Category.findOne({
                name: article.category,
            });

            if (!category) {
                throw new Error(`Category "${article.category}" not found`);
            }

            await Article.findOneAndUpdate(
                { title: article.title },
                {
                    title: article.title,
                    content: article.content,
                    picture: article.picture,
                    category: category._id,
                },
                {
                    upsert: true,
                    new: true,
                    runValidators: true,
                    setDefaultsOnInsert: true,
                }
            );
        }

        console.log(`${articles.length} articles seeded successfully!`);
    } catch (error) {
        console.error("Error seeding articles:", error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

seedArticles();
