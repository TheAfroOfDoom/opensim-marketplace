var DataTypes = require("sequelize").DataTypes;
var _assets = require("./assets");
var _auth = require("./auth");
var _avatars = require("./avatars");
var _estate_groups = require("./estate_groups");
var _estate_managers = require("./estate_managers");
var _estate_map = require("./estate_map");
var _estate_settings = require("./estate_settings");
var _estate_users = require("./estate_users");
var _estateban = require("./estateban");
var _friends = require("./friends");
var _griduser = require("./griduser");
var _im_offline = require("./im_offline");
var _inventoryfolders = require("./inventoryfolders");
var _inventoryitems = require("./inventoryitems");
var _land = require("./land");
var _landaccesslist = require("./landaccesslist");
var _migrations = require("./migrations");
var _os_groups_groups = require("./os_groups_groups");
var _os_groups_invites = require("./os_groups_invites");
var _os_groups_membership = require("./os_groups_membership");
var _os_groups_notices = require("./os_groups_notices");
var _os_groups_principals = require("./os_groups_principals");
var _os_groups_rolemembership = require("./os_groups_rolemembership");
var _os_groups_roles = require("./os_groups_roles");
var _presence = require("./presence");
var _primitems = require("./primitems");
var _prims = require("./prims");
var _primshapes = require("./primshapes");
var _regionban = require("./regionban");
var _regionenvironment = require("./regionenvironment");
var _regionextra = require("./regionextra");
var _regions = require("./regions");
var _regionsettings = require("./regionsettings");
var _regionwindlight = require("./regionwindlight");
var _spawn_points = require("./spawn_points");
var _terrain = require("./terrain");
var _tokens = require("./tokens");
var _useraccounts = require("./useraccounts");

function initModels(sequelize) {
  var assets = _assets(sequelize, DataTypes);
  var auth = _auth(sequelize, DataTypes);
  var avatars = _avatars(sequelize, DataTypes);
  var estate_groups = _estate_groups(sequelize, DataTypes);
  var estate_managers = _estate_managers(sequelize, DataTypes);
  var estate_map = _estate_map(sequelize, DataTypes);
  var estate_settings = _estate_settings(sequelize, DataTypes);
  var estate_users = _estate_users(sequelize, DataTypes);
  var estateban = _estateban(sequelize, DataTypes);
  var friends = _friends(sequelize, DataTypes);
  var griduser = _griduser(sequelize, DataTypes);
  var im_offline = _im_offline(sequelize, DataTypes);
  var inventoryfolders = _inventoryfolders(sequelize, DataTypes);
  var inventoryitems = _inventoryitems(sequelize, DataTypes);
  var land = _land(sequelize, DataTypes);
  var landaccesslist = _landaccesslist(sequelize, DataTypes);
  var migrations = _migrations(sequelize, DataTypes);
  var os_groups_groups = _os_groups_groups(sequelize, DataTypes);
  var os_groups_invites = _os_groups_invites(sequelize, DataTypes);
  var os_groups_membership = _os_groups_membership(sequelize, DataTypes);
  var os_groups_notices = _os_groups_notices(sequelize, DataTypes);
  var os_groups_principals = _os_groups_principals(sequelize, DataTypes);
  var os_groups_rolemembership = _os_groups_rolemembership(sequelize, DataTypes);
  var os_groups_roles = _os_groups_roles(sequelize, DataTypes);
  var presence = _presence(sequelize, DataTypes);
  var primitems = _primitems(sequelize, DataTypes);
  var prims = _prims(sequelize, DataTypes);
  var primshapes = _primshapes(sequelize, DataTypes);
  var regionban = _regionban(sequelize, DataTypes);
  var regionenvironment = _regionenvironment(sequelize, DataTypes);
  var regionextra = _regionextra(sequelize, DataTypes);
  var regions = _regions(sequelize, DataTypes);
  var regionsettings = _regionsettings(sequelize, DataTypes);
  var regionwindlight = _regionwindlight(sequelize, DataTypes);
  var spawn_points = _spawn_points(sequelize, DataTypes);
  var terrain = _terrain(sequelize, DataTypes);
  var tokens = _tokens(sequelize, DataTypes);
  var useraccounts = _useraccounts(sequelize, DataTypes);


  return {
    assets,
    auth,
    avatars,
    estate_groups,
    estate_managers,
    estate_map,
    estate_settings,
    estate_users,
    estateban,
    friends,
    griduser,
    im_offline,
    inventoryfolders,
    inventoryitems,
    land,
    landaccesslist,
    migrations,
    os_groups_groups,
    os_groups_invites,
    os_groups_membership,
    os_groups_notices,
    os_groups_principals,
    os_groups_rolemembership,
    os_groups_roles,
    presence,
    primitems,
    prims,
    primshapes,
    regionban,
    regionenvironment,
    regionextra,
    regions,
    regionsettings,
    regionwindlight,
    spawn_points,
    terrain,
    tokens,
    useraccounts,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
