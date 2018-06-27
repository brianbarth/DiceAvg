'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');
const Vision = require('vision');
const fs = require('fs');
const doDiceThing = require('./dice.js');

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
    
      request.payload.numRolls == null;
    
      const data = fs.readFileSync('./static/percentageData.txt', "utf8");

      const rows = data.split('\n').slice(1);
      const rollData = rows.map( row => row.split(',').map( value => parseFloat(value) ) );
    
      return h.view('index', {rollData}, viewOptions);
     
    }
  });

  server.route({
    method: 'POST',
    path: '/',
    handler: function(request, h) {
      
      let rolls = request.payload.numRolls;

      doDiceThing(rolls);
      
      const data = fs.readFileSync('./static/percentageData.txt', "utf8");
      
      const rows = data.split('\n').slice(1);
      const rollData = rows.map( row => row.split(',').map( value => parseFloat(value) ) );
      
      return h.view('index', { rolls, rollData }, viewOptions);
    }
  });

  server.route({
    method: 'GET',
    path: '/remove.handlebars',
    handler: function(request, h) {
      
      function deleteAll() {
        fs.unlinkSync('./static/percentageData.txt', null);
        console.log('File Deleted!');
        fs.openSync('./static/percentageData.txt', 'w');
        console.log('New File Created!');
      }
      deleteAll();

      return h.view('remove', {}, viewOptions);
    }
  });

  await server.start();
  console.log('Server started listening on %s', server.info.uri);
};

start();