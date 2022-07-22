import teachersRepository from "../repositories/teacherRepository.js";

async function findAllTeacherDiscipline(){
  const teacherDisc = await teachersRepository.findAll();
  return teacherDisc;
};

const teacherDiscService = {
  findAllTeacherDiscipline
};

export default teacherDiscService;