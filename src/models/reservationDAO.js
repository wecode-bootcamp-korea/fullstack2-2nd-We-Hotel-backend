import prisma from '../../prisma';
import { Prisma } from '@prisma/client';

const getReservations = async userId => {
  return await prisma.$queryRaw`
  SELECT
      res.id,
      res.start_date as startDate,
      res.end_date as endDate,
      acc.id as accommodationId,
      acc.name as accommodationName,
      r.name as roomName,
      acc.detail_address as address,
      u.id,
      u.nickname as userName,
      u.phone_number as phoneNumber,
      u.email,
      res.by_car as byCar,
      res.total_price as totalPrice,
      res.created_at as createdAt
  FROM reservations res
  JOIN users u
  ON   res.user_id = u.id
  JOIN rooms r
  ON   res.room_id = r.id
  JOIN likes l
  ON   u.id = l.user_id
  JOIN accommodations acc
  ON   l.accommodation_id = acc.id
  ;`;
};

const createReservation = async (
  userId,
  startDate,
  endDate,
  accommodationId
) => {
  await prisma.$queryRaw`
  INSERT INTO reservations(id,userId,roomId, startDate,endDate,createAt, personnel, byCar, policyAgreed, totalPrice, isAdult)VALUES (
              default,
              ${userId},
              ${roomId},
              ${startDate},
              ${endDate},
              default,
              ${personnel},
              ${byCar},
              ${policyAgreed},
              ${totalPrice},
              ${isAdult}
  );
  `; //프론트에 예약정보요청, accommodationId column 추가

  return await prisma.$queryRaw`
  SELECT ;`;
};

export default { getReservations, createReservation };
