import prisma from '../../prisma';

const getRoomList = async () => {
  return await prisma.$queryRaw `
  SELECT
    r.id,
    r.name as roomName,
    r.room_grade_id as roomGradeId,
    r.bed_type_id as bedTypeId,
    r.standard_people as standardPeople,
    r.max_people as maxPeople,
    r.etc,
    r.price,
    r.accommodation_id as accommodationId,
    r.is_reserved as isReserved
  FROM 
    rooms r
  `
}

