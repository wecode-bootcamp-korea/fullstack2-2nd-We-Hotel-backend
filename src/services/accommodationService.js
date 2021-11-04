import { accommodationDAO } from '../models';
import { errorGenerator } from '../utils';

const getAccommodationList = async (subcategoryId, userId, accommodationId) => {
  
  const accommodationList = await accommodationDAO.getAccommodationList(subcategoryId);
  if (!accommodationList) errorGenerator(404, 'DOES_NOT_EXIST_ACCOMMODATION');

  const accommodationImage = await accommodationDAO.getAccommodationImage(subcategoryId);
  if (!accommodationImage) errorGenerator(404, 'DOES_NOT_EXIST_ACCOMMODATION_IMAGE');

  const likedAccommodation = await accommodationDAO.getLikedAccommodation(userId, accommodationId);
  if (!likedAccommodation) errorGenerator(404, 'DOES_NOT_EXIST_ACCOMMODATION_LIKED');
  
  const getTotalAccommodationList = {
    accommodationList,
    accommodationImage,
    likedAccommodation,
  };

  return getTotalAccommodationList;
};


export default {
  getAccommodationList
};
