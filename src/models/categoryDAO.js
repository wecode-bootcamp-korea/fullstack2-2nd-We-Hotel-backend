import prisma from '../../prisma';

const getMainCategories = async () => { // 지역별..
  const getCategories =  await prisma.$queryRaw`
    SELECT
      mc.id,
      mc.name as mainCategoryName
    FROM
      main_categories mc
  ;
  `;
  return getCategories
};


const getSubCategoryList = async () => {// md호캉스 등등..
  const getSubCategoryList = await prisma.$queryRaw`
    SELECT
      sc.id,
      sc.name as subCategoryName,
      sc.main_category_id as mainCategoryId
    FROM
      sub_categories sc
  ;
  `;
  return getSubCategoryList;
};

export default { getMainCategories, getSubCategoryList };

