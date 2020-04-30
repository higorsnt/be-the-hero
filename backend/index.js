const express = require('express');

const app = express();

app.get('/', (request, response) => {
  return response.json({
    event: 'Semana OmniStack 11.0',
    aluno: 'Higor Santos'
  });
});

app.listen(3333);