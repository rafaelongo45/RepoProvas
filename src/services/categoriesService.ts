import categoriesRepository from "../repositories/categoriesRepository.js";

async function findAllCategories(){
  const categories = await categoriesRepository.findAll();
  return categories;
};

const categoriesService = {
  findAllCategories
};

export default categoriesService;