import { Tests } from "@prisma/client";

import prisma from "../config/database.js";

export interface CreateTest {
  name: string
  pdfUrl: string
  categoryId: number
  teacherDisciplineId: number
}

async function findByName(name: string){
  const test = await prisma.tests.findFirst({
    where: {
      name
    }
  }   
  );

  return test;
};

async function findBypdfUrl(pdfUrl: string){
  const test = await prisma.tests.findFirst({
    where:{
      pdfUrl
    }
  });

  return test;
};

async function findByNameAndTeacherDiscId(name: string, teacherDisciplineId: number) {
  const test = await prisma.tests.findFirst({
    where:{
      name, teacherDisciplineId
    }
  });

  return test;
}

async function insert(data: CreateTest){
  await prisma.tests.create({
    data
  });
};

const testsRepository = {
  insert,
  findByName,
  findBypdfUrl,
  findByNameAndTeacherDiscId
};

export default testsRepository;