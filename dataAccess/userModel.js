const Sequelize = require('sequelize');
const sequelize = require('../dataAccess/da');
const Person = sequelize.define('person', {
name: {
    type: Sequelize.STRING,
    notNull: true
},
imgUrl: {
    type: Sequelize.STRING
}
});

const Parent = sequelize.define('parent', {});
Person.belongsToMany(Person, { through: Parent, as: 'Parents', foreignKey: 'personId' });
Person.belongsToMany(Person, { through: Parent, as: 'Children', foreignKey: 'parentId' });


// Parent.sync()
// Person.sync()
module.exports = {Person : Person, Parent : Parent};

