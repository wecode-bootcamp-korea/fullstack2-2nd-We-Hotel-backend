import { asyncWrapper } from '../utils';
import accommodationService from '../services'

const getAccommodationList = asyncWrapper(async (req, res) => {
    const accommodations = await accommodationService.getAccommodationList();
    res.status(200).json({
        myAccommodation: accommodations,
    });
});


export default {
    getAccommodationList,
}