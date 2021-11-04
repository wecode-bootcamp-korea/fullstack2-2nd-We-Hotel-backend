import { categoryService } from '../services';
import { asyncWrapper } from '../utils';


const getCategories = asyncWrapper(async (req, res) => {
  const categoryList = await categoryService.getCategories();
  res.status(200).json({
    message: 'SUCCESS',
    categoryList : categoryList,
  });
});


export default { getCategories }