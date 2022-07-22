import termsRepository from "../repositories/termsRepository.js";

async function getTermsWithDisciplines(){
  const terms = await termsRepository.findAll();
  return terms;
};

const termsService = {
  getTermsWithDisciplines
};

export default termsService;