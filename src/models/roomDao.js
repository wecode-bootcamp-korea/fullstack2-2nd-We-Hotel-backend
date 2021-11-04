import prisma from '../../prisma';

const getRoomList = async (accommodationId) => {
  return await prisma.$queryRaw `
  SELECT
    a.id,
    a.name as title,
    a.grade,
    r.etc,
    r.price,
    r.is_reserved as isReserved,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', r.id,
        'grade', rg.name,
        'price', r.price,
        'image', i.image_url
      )
    ) rooms
  FROM 
    accommodations as a
  JOIN rooms as r ON a.id = r.accommodation_id 
  JOIN room_images as i ON r.id = i.room_id
  JOIN room_grades as rg ON rg.id = r.room_grade_id
  WHERE r.accommodation_id = ${accommodationId}
  GROUP BY r.id;`
}

const getRoomImage = async () => {
  return await prisma.$queryRaw`
  SELECT
    ri.id,
    ri.name as Name,
    ri.image_url as Url
  FROM
    room_images as ri
  LIMIT 10;`
  ;
}

export default { getRoomList, getRoomImage };