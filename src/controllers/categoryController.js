import { asyncWrapper } from '../utils';
import CategoryService from '../services'

const getMainCategoryList = asyncWrapper(async (req, res) => {
    const mainCategories = await CategoryService.getMainCategoryList();
    res.status(200).json({
        mainCategory: mainCategories,
    });
});

const getSubCategoryList = asyncWrapper(async (req, res) => {
  const subCategories = await CategoryService.getSubCategoryList();
  res.status.json({
    subCategory: subCategories,
  })
})

export default {
  getMainCategoryList,
  getSubCategoryList,
}