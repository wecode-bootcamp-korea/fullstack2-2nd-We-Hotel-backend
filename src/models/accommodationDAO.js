import prisma from '../../prisma';

const getAccommodationList = async (categoryId) => {
  return await prisma.$queryRaw`
  SELECT
    a.id,
    a.name as accommodationName,
    a.grade,
    a.sub_category_id as subCategoryId,
    a.detail_address as detailAddress,
    a.created_at as createdAt,
    a.town_id as townId
  FROM 
    accommodations acc
  JOIN subcategories c ON c.id=a.category_id
  ORDER BY ${categoryId}
  `;
};

export default {
  getAccommodationList,
}