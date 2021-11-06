import { accommodationDAO } from '../models';
import { errorGenerator } from '../utils';

const getAccommodationList = async (depth, id) => {
  const accommodationList = await accommodationDAO.getAccommodationList(
    depth,
    id
  );

  for (const list of accommodationList) {
    const [image] = await accommodationDAO.getAccommodationImage(list.id);

    list.image = image.imageUrl;
  }

  return accommodationList;
  // if (!accommodationImage) errorGenerator(404, 'DOES_NOT_EXIST_ACCOMMODATION_IMAGE');

  // const likedAccommodation = await accommodationDAO.getLikedAccommodation(userId, accommodationId);
  // if (!likedAccommodation) errorGenerator(404, 'DOES_NOT_EXIST_ACCOMMODATION_LIKED');
  // if (!accommodationList) errorGenerator(404, 'DOES_NOT_EXIST_ACCOMMODATION');

  // const accommodationImage = await accommodationDAO.getAccommodationImage(
  //   subcategoryId
  // );

  // const getTotalAccommodationList = {
  //   accommodationList,
  //   accommodationImage,
  //   likedAccommodation,
  // };

  // return getTotalAccommodationList;
};

export default {
  getAccommodationList,
};
