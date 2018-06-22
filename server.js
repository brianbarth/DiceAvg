'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');
const Vision = require('vision');
const fs = require('fs');
const Dice = require('./dice.js');


const server = Hapi.server({
  port: 3000,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, 'strict')
    }
  },
  debug: { request: '*' }
});

const viewOptions = { layout: 'mainLayout' };

const start = async () => {
  await server.register(Inert);
  await server.register(Vision);

  server.views({
    engines: {
      handlebars: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'templates',
    layoutPath: 'templates/layout',
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: function(request, h) {
     
      return h.view('index', {}, viewOptions);
    }
  });

  server.route({
    method: 'POST',
    path: '/',
    handler: function(request, h) {

      let rolls = request.payload.numRolls;
      console.log(rolls);
      return h.view('index', {rolls}, viewOptions);
    }
  });

  await server.start();
  console.log('Server started listening on %s', server.info.uri);
};

start();