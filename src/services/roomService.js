import { roomDAO } from '../models';
import { asyncWrapper, errorGenerator } from '../utils';


const getRoomList = async (accommodationId) => {
  const roomList = await roomDAO.getRoomList(accommodationId);
  if(!roomList) errorGenerator(404, 'CAN_NOT_FIND_ROOM');

  return roomList;
}

const getRoomImage =async () => {
  const roomImage=await roomDAO.getRoomImage();
  if(!roomImage) errorGenerator(404, 'CAN_NOT_FIND_ROOM_IMAGE');
  return roomImage
}
export default { getRoomList, getRoomImage };