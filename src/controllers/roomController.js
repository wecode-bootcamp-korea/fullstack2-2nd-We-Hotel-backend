import { asyncWrapper } from '../utils';
import roomService from '../services'

const getRoomList = asyncWrapper(async (req, res) => {
    const rooms = await roomService.getRoomList();
    res.status(200).json({
        myRoom: rooms,
    });
});


export default {
  getRoomList,
}