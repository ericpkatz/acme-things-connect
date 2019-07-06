const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_db');

const Thing = conn.define('thing', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  name: Sequelize.STRING
});

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  await Thing.create({ name: 'foo'});
  await Thing.create({ name: 'bar'});
};

module.exports = {
  syncAndSeed,
  models: {
    Thing
  }
}
