import { Prisma } from '@prisma/client';
import prisma from '../../prisma';

const getReviews = async (id, sort, offset, limit = 10) => {
  return await prisma.$queryRaw`
  SELECT    
              rev.scores,
              acc.id as accommodationId,
              rev.id as reviewId,
              rev.review_content as reviewContent,
              u.nickname,
              rev.reservation_id as reservationId,
              r.name as roomsName,
              revi.image_url as reviewImg,
              rev.created_at as createdAt,
              rev.updated_at as updatedAt
  FROM        reviews rev
  LEFT JOIN   users u
  ON          rev.user_id = u.id
  LEFT JOIN   review_images revi
  ON          rev.id = revi.review_id
  LEFT JOIN   reservations reserve
  ON          reservation_id = rev.id
  LEFT JOIN   rooms r
  ON          reserve.room_id = r.id
  LEFT JOIN   accommodations acc
  ON          r.accommodation_id = acc.id
  WHERE       rev.reservation_id = ${id}
  ORDER BY    ${sort ? Prisma.sql`rev.scores` : Prisma.sql`rev.created_at`} DESC
  LIMIT       ${limit}
  ${offset ? Prisma.sql`OFFSET ${offset}` : Prisma.empty};
  `;
};

const createReview = async (scores, content, userId, reservationId) => {
  await prisma.$queryRaw`
  INSERT INTO reviews VALUES(
              DEFAULT,
              ${scores},
              ${content},
              ${userId},
              ${reservationId},
              DEFAULT,
              DEFAULT,
              DEFAULT,
              DEFAULT
  );
  `;

  return await prisma.$queryRaw`
  SELECT    
              rev.scores,
              acc.id as accommodationId,
              rev.id as reviewId,
              rev.review_content as reviewContent,
              u.nickname,
              rev.reservation_id as reservationId,
              r.name as roomsName,
              revi.image_url as reviewImg,
              rev.created_at as createdAt,
              rev.updated_at as updatedAt
  FROM        reviews rev
  LEFT JOIN   users u
  ON          rev.user_id = u.id
  LEFT JOIN   review_images revi
  ON          rev.id = revi.review_id
  LEFT JOIN   reservations reserve
  ON          reservation_id = rev.id
  LEFT JOIN   rooms r
  ON          reserve.room_id = r.id
  LEFT JOIN   accommodations acc
  ON          r.accommodation_id = acc.id
  WHERE       rev.reservation_id = ${reservationId}
  ORDER BY    rev.created_at DESC
  ;`;
};

const createReviewImg = async (imgUrl, reviewId) => {
  await prisma.$queryRaw`
  INSERT INTO review_images VALUES(
              DEFAULT,
              ${imgUrl},
              ${reviewId}
  );
  `;
  return await prisma.$queryRaw`
  SELECT      revi.review_id as reviewId,
              revi.image_url as reviewImg
  FROM        review_images revi
  ;`;
};

export default { getReviews, createReview, createReviewImg };
