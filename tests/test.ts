import supertest from "supertest";
import prisma from "../src/config/database.js";

import app from "../src/index.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
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

  it("tries to create an already registered user, receive 409", async () => {
    const data = {
      email: 'admin@admin.com',
      password: 'senha',
      passwordConfirmation: 'senha'
    }
    await supertest(app).post('/signup').send(data);
    const result = await supertest(app).post('/signup').send(data);
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

  it("tries to signin with an registered e-mail and wrong password, receive code 403", async () => {
    const data = {
      email: 'user@email.com',
      password: 'senha',
      passwordConfirmation: 'senha'
    }
    await supertest(app).post('/signup').send(data);

    const wrongData = {
      email: 'user@email.com', 
      password: 'senhaerrada'
    }
    const result = await supertest(app).post('/signin').send(wrongData);
    expect(result.status).toBe(403);
  });

  it("tries to signin with an registered e-mail and right password, receive token", async () => {
    const data = {
      email: 'user@email.com',
      password: 'senha',
      passwordConfirmation: 'senha'
    }
    await supertest(app).post('/signup').send(data);

    const correctData = {
      email: 'user@email.com', 
      password: 'senha'
    }
    const result = await supertest(app).post('/signin').send(correctData);
    const token = result.body.token
    expect(token).not.toBeNull();
  });
})