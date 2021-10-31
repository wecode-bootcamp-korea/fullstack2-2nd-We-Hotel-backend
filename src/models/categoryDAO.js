import prisma from '../../prisma';

const getMainCategoryList = async () => {
  const mainCategories = await prisma.$queryRaw`
    SELECT
      mc.id,
      mc.name as mainCategoryId,
    FROM
      main_categories
  `
}


const getSubCategoryList = async (mainCategoryId) => {
  const subCategories = await prisma.$queryRaw`
    SELECT
      sc.id,
      sc.name as subCategoryId,
      sc.main_category_id as mainCategoryId
    FROM
      sub_categories
  `
}


export {
  getMainCategoryList,
  getSubCategoryList,
}
