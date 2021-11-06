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
  SELECT
        a.id,
        a.grade,
        a.name as accommodationName,
        a.detail_address as detailAddress,
        a.town_id as townId
        
  FROM  accommodations as a
  
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
    mc.name
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'a.id', ,
        '.towns_name', ,
        'a.grade', ,
        'a.name',
        't.accommodation_id',
        'image_url',
        'price',
        'percentage'
      )
    ) 
  FROM main_categories as mc
  JOIN accommodations as a 
  ON   mc.id
  JOIN town as t
  ON 
  JOIN accommodations_images as ai
  ON
  ;`;
};

export default {
  getAccommodationList,
  getAccommodationImage,
  getLikedAccommodation,
  getMainSliderAccommodation,
  getMainLocationAccommodation,
};
