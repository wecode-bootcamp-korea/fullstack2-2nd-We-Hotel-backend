import { accommodationService } from '../services';
import { asyncWrapper } from '../utils';

const getAccommodationList = asyncWrapper(async (req, res) => {
    const { subcategoryId } = req.params;
   
    const accommodationList = await accommodationService.getAccommodationList(subcategoryId);
    res.status(200).json({
        DATA: accommodationList,
    })
});

const getMainPageAccommodation = asyncWrapper(async (req, res) => {
    const MainSliderAccommodation = await accommodationService.getMainSliderAccommodation();
    res.status(200).json({
        DATA: MainSliderAccommodation,
    })
})


export default {
    getAccommodationList,
    getMainPageAccommodation
}
