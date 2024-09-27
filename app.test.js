const REQUEST = require('supertest');
const EXPRESS = require('express');
const ROUTES = require('./routes/routes.js');
const POST_MODEL = require('./models/post');

jest.mock('./models/post', () => ({
  find: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});




describe('/', () => {
  let APP;

  beforeEach(() => {
    APP = EXPRESS();
    APP.use('/', ROUTES);
  });

  it('debe retornar un arreglo de posts', async () => {
    POST_MODEL.find.mockResolvedValue([]);

    const RESPONSE = await REQUEST(APP).get('/');
    expect(RESPONSE.status).toBe(200);
    expect(RESPONSE.body).toBeInstanceOf(Array);
  });

  it('debe retornar un mensaje de error si hay un problema', async () => {
  POST_MODEL.find.mockRejectedValue(new Error('Error en la base de datos'));

    const RESPONSE = await REQUEST(APP).get('/');
    expect(RESPONSE.status).toBe(500);
    expect(RESPONSE.body).toEqual({ message: 'Hubo un problema al obtener los posts' });
  });
});


jest.mock('./models/post', () => ({
  find: jest.fn(),
  save: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('/create', () => {
  let APP;

  beforeEach(() => {
    APP = EXPRESS();
    APP.use(EXPRESS.json());
    APP.use('/', ROUTES);
  });

  it('debe crear un nuevo post con datos válidos', async () => {
    POST_MODEL.save.mockImplementation(() => Promise.resolve({ title: 'Título del post', body: 'Cuerpo del post' }));
  
    const POST_DATA = {
      title: 'Título del post',
      body: 'Cuerpo del post',
    };
  
    try {
      const RESPONSE = await REQUEST(APP).post('/create').send(POST_DATA);
      expect(RESPONSE.status).toBe(201);
      expect(RESPONSE.body).toHaveProperty('title', POST_DATA.title);
      expect(RESPONSE.body).toHaveProperty('body', POST_DATA.body);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
  
  it('debe retornar un error 400 con datos inválidos', async () => {
    POST_MODEL.save.mockImplementation(() => Promise.reject(new Error('Datos inválidos')));
  
    const POST_DATA = {
      title: '',
      body: 'Cuerpo del post',
    };
  
    try {
      const RESPONSE = await REQUEST(APP).post('/create').send(POST_DATA);
      expect(RESPONSE.status).toBe(400);
      expect(RESPONSE.body).toHaveProperty('message', 'Datos inválidos');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('debe retornar un error 500 si hay un problema al crear el post', async () => {
    POST_MODEL.save.mockImplementation(() => Promise.reject(new Error('Error al crear el post')));

    const POST_DATA = {
      title: 'Título del post',
      body: 'Cuerpo del post',
    };

    try {
      const RESPONSE = await REQUEST(APP).post('/create').send(POST_DATA);
      expect(RESPONSE.status).toBe(500);
      expect(RESPONSE.body).toHaveProperty('message', 'Hubo un problema al crear el post');
    } catch (error) {
      console.error(error);
    }
  });
});
