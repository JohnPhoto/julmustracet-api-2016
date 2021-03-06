

const fs = require('fs');
const path = require('path');

const ADMIN = 'admin';

const adminPath = '../../config/admin.json';
const absoluteAdminPath = path.join(__dirname, adminPath);

function checkFileLocation(filepath) {
  try {
    return !!fs.statSync(filepath);
  } catch (e) {
    return false;
  }
}

module.exports = (app, callback) => {
  const Player = app.models.Player;
  const Role = app.models.Role;
  const RoleMapping = app.models.RoleMapping;
  if (!checkFileLocation(absoluteAdminPath)) {
    const exampleAdmin = {
      username: 'admin',
      email: 'admin@example.com',
      firstName: 'Ad',
      lastName: 'Min',
      password: 'admin',
    };
    throw new Error(`Create an admin user JSON at ${absoluteAdminPath}\n Example:\n ${JSON.stringify(exampleAdmin, null, 2)}`);
  }
  const defaultPlayer = require(adminPath); // eslint-disable-line
  const searchPlayerTerm = { where: { email: defaultPlayer.email }, limit: 1 };
  const searchRoleTerm = { where: { name: ADMIN }, limit: 1 };

  console.log('Init Admin Creation.');

  return Promise.all([
    Player.find(searchPlayerTerm),
    Role.find(searchRoleTerm),
  ])
  .then(([players, roles]) => {
    if (!roles.length) {
      throw new Error('No Admin Role, Please fix');
    }
    if (players.length) {
      console.info('Default admin already exists.');
      return players[0];
    }
    return Player.create(defaultPlayer)

      .then(admin => ({ admin, role: roles[0] }))
      .then(({ admin, role }) => role.principals.create({
        principalType: RoleMapping.USER,
        principalId: admin.id,
      }).then(() => admin));
  })
  .then((admin) => {
    console.log('Admin Ready: ', admin.username);
  })
  .catch(console.error.bind(console))

  .then(() => callback());
};
