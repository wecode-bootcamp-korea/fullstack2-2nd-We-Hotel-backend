import { errorGenerator } from '../utils';
import accommodationDao from '../models';

const getAccommodationList = async () => {
  const allAccommodations = await accommodationDao.getAccommodationList();
  if(!allAccommodations) errorGenerator(404, 'ACCOMMODATION_DOES_NOT_EXIST');
  return allAccommodations;
};

export default {
  getAccommodationList,
}