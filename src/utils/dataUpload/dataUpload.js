const fs = require('fs');
const csv = require('csv-parse');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createMainCategory = async () => {
  return new Promise(resolve => {
    fs.createReadStream(`${__dirname}/mainCategories.csv`)
      .pipe(csv())
      .on('data', async mainCategories => {
        try {
          await prisma.$queryRaw`
          INSERT INTO main_categories (main_category_name) 
          VALUES (${mainCategories.main_category_name});
          `;
          console.log('mainCategory data load success');
        } catch (error) {
          console.log(error);
        }
      })
      .on('end', async () => {
        resolve();
        prisma.$disconnect();
      });
  });
};

const createSubCategory = async () => {
  return new Promise(resolve => {
    fs.createReadStream(`${__dirname}/subCategories.csv`)
      .pipe(csv())
      .on('data', async subCategories => {
        try {
          await prisma.$queryRaw`
          INSERT INTO sub_categories (sub_category_name, main_category_id) 
          VALUES (${subCategories.sub_category_name}, ${subCategories.main_category_id});
          `;
          console.log('subCategory data load success');
        } catch (error) {
          console.log(error);
        }
      })
      .on('end', async () => {
        resolve();
        prisma.$disconnect();
      });
  });
};

const run = async () => {
  await createMainCategory();
  await createSubCategory();
};

run();
