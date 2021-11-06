import prisma from '../../prisma';

const getMainCategories = async () => {
  // 지역별..
  const getCategories = await prisma.$queryRaw`
    SELECT
      mc.id,
      mc.name as city
    FROM
      main_categories mc
  ;
  `;
  return getCategories;
};

const getSubCategoryList = async id => {
  const getSubCategoryList = await prisma.$queryRaw`
    SELECT DISTINCT
      sc.id,
      sc.name as name
    FROM
      towns sc
    JOIN accommodations a
    ON a.town_id = sc.id
    JOIN sub_categories s
    ON a.sub_category_id = s.id
    JOIN main_categories m 
    ON s.main_category_id = m.id
    WHERE m.id = ${id}
  `;
  return getSubCategoryList;
};

export default { getMainCategories, getSubCategoryList };
