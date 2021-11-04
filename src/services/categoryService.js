import { categoryDAO } from "../models"
import { errorGenerator } from '../utils';

const getCategories = async () => {
  const categoryList = await categoryDAO.getMainCategories();
  if(!categoryList) errorGenerator(404, 'MAIN_CATEGORY_DOES_NOT_EXIST');
 
  const subCategories = await categoryDAO.getSubCategoryList();
  if(!subCategories) errorGenerator(404, 'SUB_CATEGORY_DOES_NOT_EXIST');

  for (let i in categoryList) {
    categoryList[i].subCategory = [];
    for(let j in subCategories) {
      if (categoryList[i].id === subCategories[j].main_category_id)
      categoryList[i].subCategory.push(subCategories[j]);
    }
  return categoryList;
  }
}

export default { getCategories };