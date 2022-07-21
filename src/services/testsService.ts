import { TestBody } from "../controllers/testsController.js";
import teachersRepository from "../repositories/teacherRepository.js";
import categoriesRepository from "../repositories/categoriesRepository.js";
import disciplinesRepository from "../repositories/disciplinesRepository.js";
import testsRepository, { CreateTest } from "../repositories/testsRepository.js";
import teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";

async function checkDiscipline(name: string){
  const discipline = await disciplinesRepository.findByName(name);

  if(!discipline){
    throw { type: "disciplineError", message: "Discipline doesn't exist", code: 404 }
  }
};

async function checkProfessor(name: string) {
  const teacher = await teachersRepository.findByName(name);

  if(!teacher){
    throw { type: "teacherError", message: "Teacher doesn't exist", code: 404 }
  }
};

async function checkCategory(name: string){
  const category = await categoriesRepository.findByName(name);

  if(!category){
    throw { type: "categoryError", message: "Category doesn't exist", code: 404 }
  }

  return category.id
};

async function checkNameAndUrl(name: string, pdf: string){
  const testName = await testsRepository.findByName(name);

  if(testName){
    throw { type: "testNameError", message: "Test with this name already exists", code: 409 }
  };

  const testPdf = await testsRepository.findBypdfUrl(pdf);

  if(testPdf){
    throw { type: "testPDFError", message: "Test with this pdf url already exists", code: 409 }
  };
}

async function insertTest(body: TestBody){
  await checkDiscipline(body.discipline);
  await checkProfessor(body.professor);
  await checkNameAndUrl(body.name, body.pdfLink);
  const categoryId = await checkCategory(body.category);
  const discTeacherId = await teacherDisciplineRepository.findIdByDisciplineNameAndTeacherName(body.discipline, body.professor);
  const data : CreateTest = {
    name: body.name,
    pdfUrl: body.pdfLink,
    categoryId,
    teacherDisciplineId: discTeacherId
  }
  await testsRepository.insert(data)
};

const testsService = {
  insertTest
};

export default testsService;