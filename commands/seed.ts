const { Seeder } = require('mongo-seeding');
import * as path  from 'path' ;
import { getConnection } from 'typeorm';

const seeder =  new Seeder(getConnection);

const collections  = seeder.readCollectionsFromPath(path.resolve('src/api/models'));

seeder
  .import(collections)
  .then((data) => {
       console.log('data seeded ')
    // Do whatever you want after successful import
  })
  .catch(err => {
    // Handle errors
  });