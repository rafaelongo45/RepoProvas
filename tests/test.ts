import supertest from "supertest";
import prisma from "../src/config/database.js";

import app from "../src/index.js";
import userFactory from "./factories/userFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE tests CASCADE;`;
});

describe("signup suite", () => {
  it("creates new user, succeeds and returns code 201", async () => {
    const data = {
      email: 'user@email.com',
      password: 'senha',
      passwordConfirmation: 'senha'
    }
    const result = await supertest(app).post("/signup").send(data);
    expect(result.status).toBe(201);
  });

  it("tries to create a user without sending data, fails and returns 422", async () =>{
    const data = {};
    const result = await supertest(app).post("/signup").send(data);
    expect(result.status).toBe(422);
  })

  it("tries to create an already registered user, receive 409", async () => {
    const user = await userFactory.createUser();
    const result = await supertest(app).post('/signup').send({email: user.email, password: user.password, passwordConfirmation: user.password});
    expect(result.status).toBe(409);
  })
});

describe("signin suite", () => {
  it("tries to signin with an unregistered e-mail, receive code 404", async () => {
    const data = {
      email: 'user@email.com',
      password: 'senha'
    }
    const result = await supertest(app).post('/signin').send(data);
    expect(result.status).toBe(404);
  });

  it("tries to signin with a registered e-mail and wrong password, receive code 403", async () => {
    const user = await userFactory.createUser();
    const result = await supertest(app).post('/signin').send({email: user.email, password: 'senha-errada'});
    expect(result.status).toBe(403);
  });

  it("tries to signin with a registered e-mail and right password, receive token", async () => {
    const user = await userFactory.createUser();
    const result = await supertest(app).post('/signin').send({email: user.email, password: user.password});
    const token = result.body.token
    expect(token).not.toBeNull();
  });
});

describe("create test suite", () => {
  it("tries to create a test without sending a token, receives code 403", async () =>{
    const testData ={
      "name": "abcd",
      "pdfLink": "https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#filter-on--to-many-relationzaaazzsszas",
      "category": "Projeto",
      "discipline": "JavaScript",
      "professor": "Diego Pinho"
    };
    const result = await supertest(app).post('/create/test').send(testData)
    const status = result.statusCode;
    expect(status).toBe(403);
  });

  it("tries to create a test with an invalid token, receives code 404", async () =>{
    const session = await userFactory.createSession();
    const testData ={
      "name": "abcd",
      "pdfLink": "https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#filter-on--to-many-relationzaaazzsszas",
      "category": "Projeto",
      "discipline": "JavaScript",
      "professor": "Diego Pinho"
    };

    const result = await supertest(app).post('/create/test').send(testData).set('Authorization', `Bearer ${session.token}` + 'a')
    const status = result.statusCode;
    expect(status).toBe(404);
  });

  it("tries to create a test without sending a body, receives code 422", async () =>{
    const session = await userFactory.createSession();
    const testData ={
    };

    const result = await supertest(app).post('/create/test').send(testData).set('Authorization', `Bearer ${session.token}`)
    const status = result.statusCode;
    expect(status).toBe(422);
  });

  it("tries to create a test with an invalid category, receives code 422", async () =>{
    const session = await userFactory.createSession();
    const testData ={
      "name": "abcd",
      "pdfLink": "https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#filter-on--to-many-relationzaaazzsszas",
      "category": "Categoria",
      "discipline": "JavaScript",
      "professor": "Diego Pinho"
    };

    const result = await supertest(app).post('/create/test').send(testData).set('Authorization', `Bearer ${session.token}`)
    const status = result.statusCode;
    expect(status).toBe(422);
  });
  
  it("tries to create a test with an unregistered discipline, receives code 403", async () =>{
    const session = await userFactory.createSession()
    const testData ={
      "name": "abcd",
      "pdfLink": "https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#filter-on--to-many-relationzaaazzsszas",
      "category": "Projeto",
      "discipline": "Jojoin",
      "professor": "Diego Pinho"
    };

    const result = await supertest(app).post('/create/test').send(testData).set('Authorization', `Bearer ${session.token}`)
    const status = result.statusCode;
    expect(status).toBe(403);
  });

  it("tries to create a test with an unregistered professor, receives code 403", async () =>{
    const session = await userFactory.createSession();
    const testData ={
      "name": "abcd",
      "pdfLink": "https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#filter-on--to-many-relationzaaazzsszas",
      "category": "Projeto",
      "discipline": "JavaScript",
      "professor": "Diego"
    };

    const result = await supertest(app).post('/create/test').send(testData).set('Authorization', `Bearer ${session.token}`)
    const status = result.statusCode;
    expect(status).toBe(403);
  });

  it("tries to create a test with a professor that doesn't teach the discipline, receives code 400", async () =>{
    const session = await userFactory.createSession();
    const testData ={
      "name": "abcd",
      "pdfLink": "https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#filter-on--to-many-relationzaaazzsszaaaas",
      "category": "Projeto",
      "discipline": "JavaScript",
      "professor": "Bruna Hamori"
    };

    const result = await supertest(app).post('/create/test').send(testData).auth(session.token, { type: 'bearer'})
    const status = result.statusCode;
    expect(status).toBe(400);
  });
  
  it("tries to create a test with the right data, succeeds and receives code 201", async () =>{
    const session = await userFactory.createSession();
    const testData ={
      "name": "abcd",
      "pdfLink": "https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#filter-on--to-many-relationzaaazzsszaaaas",
      "category": "Projeto",
      "discipline": "JavaScript",
      "professor": "Diego Pinho"
    };

    const result = await supertest(app).post('/create/test').send(testData).auth(session.token, { type: 'bearer'})
    const status = result.statusCode;
    expect(status).toBe(201);
  });

  it("tries to create a test already registered with the name for the professor, fails and receives code 409", async () =>{
    const session = await userFactory.createSession();
    const testData ={
      "name": "abcd",
      "pdfLink": "https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#filter-on--to-many-relationzaaazzsszaaaas",
      "category": "Projeto",
      "discipline": "JavaScript",
      "professor": "Diego Pinho"
    };
    await supertest(app).post('/create/test').send(testData).auth(session.token, { type: 'bearer'})
    const result = await supertest(app).post('/create/test').send(testData).auth(session.token, { type: 'bearer'})
    const status = result.statusCode;
    expect(status).toBe(409);
  });

  it("tries to create a test with the same name and different link for a different professor and discipline, succeeds and receives code 201", async () =>{
    const session = await userFactory.createSession();
    const testData ={
      "name": "abcd",
      "pdfLink": "https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#filter-on--to-many-relations",
      "category": "Projeto",
      "discipline": "JavaScript",
      "professor": "Diego Pinho"
    };

    const testData2 ={
      "name": "abcd",
      "pdfLink": "https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#filter-on--to-many-relationzaaazzsszaaaas",
      "category": "Projeto",
      "discipline": "Humildade",
      "professor": "Bruna Hamori"
    };
    await supertest(app).post('/create/test').send(testData).auth(session.token, { type: 'bearer'})
    const result = await supertest(app).post('/create/test').send(testData2).auth(session.token, { type: 'bearer'})
    const status = result.statusCode;
    expect(status).toBe(201);
  });

  it("tries to create a test with the same link and same name for a different professor and discipline, fails and receives code 409", async () =>{
    const session = await userFactory.createSession();
    const testData ={
      "name": "abcd",
      "pdfLink": "https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#filter-on--to-many-relations",
      "category": "Projeto",
      "discipline": "JavaScript",
      "professor": "Diego Pinho"
    };

    const testData2 ={
      "name": "abcd",
      "pdfLink": "https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#filter-on--to-many-relations",
      "category": "Projeto",
      "discipline": "Humildade",
      "professor": "Bruna Hamori"
    };
    await supertest(app).post('/create/test').send(testData).auth(session.token, { type: 'bearer'})
    const result = await supertest(app).post('/create/test').send(testData2).auth(session.token, { type: 'bearer'})
    const status = result.statusCode;
    expect(status).toBe(409);
  });
});

describe("find all tests suite", () => {
  it("tries to find tests without sending a token, fails and receives code 403", async () => {
    const result = await supertest(app).get("/tests");
    expect(result.status).toBe(403)
  });

  it("tries to find tests sending an invalid token, fails and receives code 404", async () => {
    const session = await userFactory.createSession();
    const result = await supertest(app).get("/tests").auth(session.token + 'invalid', {type: 'bearer'});
    expect(result.status).toBe(404)
  });

  it("tries to find tests sending a valid token, succeeds and receives code 200", async () => {
    const session = await userFactory.createSession();
    const result = await supertest(app).get("/tests").auth(session.token, {type: 'bearer'});
    expect(result.status).toBe(200)
  });
})

describe("find terms suite", () => {
  it("tries to find terms without sending a token, fails and receives code 403", async () => {
    const result = await supertest(app).get("/terms");
    expect(result.status).toBe(403)
  });

  it("tries to find terms sending an invalid token, fails and receives code 404", async () => {
    const session = await userFactory.createSession();
    const result = await supertest(app).get("/terms").auth(session.token + 'invalid', {type: 'bearer'});
    expect(result.status).toBe(404)
  });

  it("tries to find terms sending a valid token, succeeds and receives code 200", async () => {
    const session = await userFactory.createSession();
    const result = await supertest(app).get("/terms").auth(session.token, {type: 'bearer'});
    expect(result.status).toBe(200)
  });
});

describe("find all teachers with disciplines suite", () => {
  it("tries to find teachers with disciplines without sending a token, fails and receives code 403", async () => {
    const result = await supertest(app).get("/teacher/disciplines");
    expect(result.status).toBe(403)
  });

  it("tries to find teachers with disciplines sending an invalid token, fails and receives code 404", async () => {
    const session = await userFactory.createSession();
    const result = await supertest(app).get("/teacher/disciplines").auth(session.token + 'invalid', {type: 'bearer'});
    expect(result.status).toBe(404)
  });

  it("tries to find teachers with disciplines sending a valid token, succeeds and receives code 200", async () => {
    const session = await userFactory.createSession(); 
    const result = await supertest(app).get("/teacher/disciplines").auth(session.token, {type: 'bearer'});
    expect(result.status).toBe(200)
  });
})