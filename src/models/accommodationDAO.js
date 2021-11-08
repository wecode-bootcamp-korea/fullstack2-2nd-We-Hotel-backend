import { Prisma } from '.prisma/client';
import prisma from '../../prisma';

const getAccommodationList = async (depth, id) => {
  let query = '';
  // if(subCategoryId === 'md추천') query = Prisma.sql`1`;
  // if(subCategoryId === '호캉스패키지') query = Prisma.sql`2`;
  // if(subCategoryId === '알뜰가성비') query = Prisma.sql`3`;
  // if(subCategoryId === '단풍여행') query = Prisma.sql`4`;
  // if(subCategoryId === '얼리버드특가') query = Prisma.sql`5`;
  if (depth === 'main') query = Prisma.sql`WHERE m.id=${id}`;
  if (depth === 'sub') query = Prisma.sql`WHERE a.sub_category_id=${id}`;
  await prisma.$queryRaw`
  SET SESSION sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

  `;
  return await prisma.$queryRaw`
  SELECT DISTINCT
        a.id,
        a.grade,
        a.name as accommodationName,
        a.detail_address as detailAddress,
        a.town_id as townId,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            r.price,
            dt.percentage type
            dt.type
          ) 
        ) 
  FROM  accommodations as a
  JOIN  rooms as r
  ON    a.id = r.accommodation_id
  JOIN  room_discounted_types as rdt
  ON    rdt.room_id = r.id
  JOIN  discounted_types as dt
  ON    dt.id = rdt.discounted_type_id
  JOIN sub_categories as s
  ON a.sub_category_id = s.id
  JOIN  main_categories as m
  ON m.id = s.main_category_id
  ${query}
  ;`;
};
// JOIN  discounted_types as dt
//   ON    dt.id = rdt.discounted_type_id
//   dt.percentage,
//   dt.type

// SELECT
//         a.id,
//         a.grade,
//         a.name as accommodationName,
//         a.detail_address as detailAddress,
//         a.town_id as townId,
//         JSON_ARRAYAGG(
//           JSON_OBJECT(
//             "price",r.price,
//             "percentage",dt.percentage,
//             "type",dt.type
//           )
//         ) ARRAY
//   FROM  accommodations as a
//   JOIN  rooms as r
//   ON    a.id = r.accommodation_id
//   JOIN  room_discounted_types as rdt
//   ON    rdt.room_id = r.id
//   JOIN  discounted_types as dt
//   ON    dt.id = rdt.discounted_type_id
//   JOIN sub_categories as s
//   ON a.sub_category_id = s.id
//   JOIN  main_categories as m
//   ON m.id = s.main_category_id
//   ${query}
const getAccommodationImage = async accommodationId => {
  return await prisma.$queryRaw`
  SELECT
    ai.image_url as imageUrl
  FROM  accommodations_images as ai
  WHERE ai.accommodation_id = 
  ${accommodationId}
  LIMIT 1
  ;`;
};

const getLikedAccommodation = async (userId, accommodationId) => {
  return await prisma.$queryRaw`
  SELECT
    l.id,
    l.user_id as userId,
    l.accommodation_id as accommodationId
    FROM likes as l
    ;`;
};

const getMainSliderAccommodation = async () => {
  return await prisma.$queryRaw`
  SELECT
    a.id,
    a.name,
    ai.image_url as url
  FROM accommodations as a
  JOIN accommodations_images as ai
  ON a.id = ai.accommodation_id
  ;`;
};

const getMainLocationAccommodation = async () => {
  return await prisma.$queryRaw`
  SELECT
    mc.name,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', a.id,
        'towns_name', a.detail_address,
        'grade', a.grade,
        'accommodation', a.name,
        'accommodation_id', a.id,
        'image_url', ai.image_url,
        'price', r.price
      )
    ) 
  FROM main_categories as mc
  JOIN sub_categories as sc
  ON   mc.id = sc.main_category_id
  JOIN accommodations as a
  ON a.id = a.sub_category_id
  JOIN accommodations_images as ai
  ON ai.id = ai.accommodation_id
  JOIN rooms as r
  ON r.id = r.accommodation_id
  JOIN room_discounted_types as rdt
  ON rdt.id = rdt.room_id
  JOIN discounted_types as dt
  ON dt.id = dt.room_discounted_types
  GROUP BY mc.id
  ;`;
};
// SELECT
//     mc.name,
//     JSON_ARRAYAGG(
//       JSON_OBJECT(
//         'id', a.id,
//         'towns_name', a.detail_address,
//         'grade', a.grade,
//         'accommodation', a.name,
//         'accommodation_id', a.id,
//         'image_url', ai.image_url,
//         'price', r.price,
//         'percentage', dt.percentage
//       )
//     ) 
//   FROM main_categories as mc
//   JOIN sub_categories as sc
//   ON   mc.id = sc.main_categories_id
//   JOIN accommodations as a
//   ON a.id = a.sub_categories_id
//   JOIN accommodations_images as ai
//   ON ai.id = ai.accommodation_id
//   JOIN rooms as r
//   ON r.id = r.accommodation_id
//   JOIN room_discounted_types as rdt
//   ON rdt.id = rdt.room_id
//   JOIN discounted_types as dt
//   ON dt.id = dt.room_discounted_types
//   ;
export default {
  getAccommodationList,
  getAccommodationImage,
  getLikedAccommodation,
  getMainSliderAccommodation,
  getMainLocationAccommodation,
};
