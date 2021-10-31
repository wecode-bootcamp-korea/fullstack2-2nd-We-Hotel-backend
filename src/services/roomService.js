import { errorGenerator } from '../utils';
import roomDao from '../models';

const getRoomList = async () => {
  const allRooms = await roomDao.getRoomList();
  if(!allRooms) errorGenerator(404, 'ROOM_DOES_NOT_EXIST');
  return allRooms;
};

export default {
  getRoomList,
}