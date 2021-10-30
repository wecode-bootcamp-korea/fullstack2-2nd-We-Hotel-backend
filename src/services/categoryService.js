import { errorGenerator } from '../utils';
import categoryDao from '../models';

const getCategoryList = async () => {
  const mainCategories = await categoryDao.getMainCategoryList();
  if(!mainCategories) errorGenerator(404, 'MAIN_CATEGORY_DOES_NOT_EXIST');

  const subCategories = await categoryDao.getSubCategoryList();
  if(!subCategories) errorGenerator(404, 'SUB_CATEGORY_DOES_NOT_EXIST');
  
  return getCategoryList;
};

export default {
  getCategoryList,
}