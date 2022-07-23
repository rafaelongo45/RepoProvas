import { teachersDisciplines } from "@prisma/client";

import { TestBody } from "../controllers/testsController.js";
import teachersRepository from "../repositories/teacherRepository.js";
import categoriesRepository from "../repositories/categoriesRepository.js";
import disciplinesRepository from "../repositories/disciplinesRepository.js";
import testsRepository, { CreateTest } from "../repositories/testsRepository.js";
import teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";

async function checkDiscipline(name: string){
  const discipline = await disciplinesRepository.findByName(name);

  if(!discipline){
    throw { type: "disciplineError", message: "Discipline doesn't exist", code: 403 }
  };

  return discipline;
};

async function checkProfessor(name: string) {
  const teacher = await teachersRepository.findByName(name);

  if(!teacher){
    throw { type: "teacherError", message: "Teacher doesn't exist", code: 403 }
  };

  return teacher;
};

async function checkCategory(name: string){
  const category = await categoriesRepository.findByName(name);

  if(!category){
    throw { type: "categoryError", message: "Category doesn't exist", code: 404 }
  }

  return category.id
};

async function checkUrl(pdf: string){
  const testPdf = await testsRepository.findBypdfUrl(pdf);

  if(testPdf){
    throw { type: "testPDFError", message: "Test with this pdf url already exists", code: 409 }
  };
};

async function checkTeacherDiscName(teachDiscId: number, name: string){
  const test = await testsRepository.findByNameAndTeacherDiscId(name, teachDiscId);
  
  if(test){
    const validName = test.teacherDisciplineId !== teachDiscId && test.name === name || test.teacherDisciplineId === teachDiscId && test.name !== name;
    if(!validName){
      throw { type: "nameError", message: "This name is already in use in this discipline for this teacher", code: 409};
    }
  }
};

async function checkTeacherTeachesDiscipline(teachDisc: teachersDisciplines){
  if(!teachDisc){
    throw { type: "teacherDisciplineError", message: "This teacher doesn't teach this discipline", code: 400 };
  }
}

async function insertTest(body: TestBody){
  await checkDiscipline(body.discipline);
  await checkProfessor(body.professor);
  await checkUrl(body.pdfLink);
  const categoryId = await checkCategory(body.category);
  const discTeacher = await teacherDisciplineRepository.findIdByDisciplineNameAndTeacherName(body.discipline, body.professor);
  await checkTeacherTeachesDiscipline(discTeacher);
  await checkTeacherDiscName(discTeacher.id, body.name);

  const data : CreateTest = {
    name: body.name,
    pdfUrl: body.pdfLink,
    categoryId,
    teacherDisciplineId: discTeacher.id
  }
  await testsRepository.insert(data)
};

async function findTests(){
  const tests = await testsRepository.findAllTests();
  return tests;
}

async function findTestsCategories(){
  const categories = await categoriesRepository.findAll();
  return {categories: categories};
}

const testsService = {
  insertTest,
  findTests,
  findTestsCategories
};

export default testsService;