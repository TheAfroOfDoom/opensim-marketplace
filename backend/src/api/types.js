assetTypes = {
  MATERIAL: -2,
  TEXTURE: 0,
  SOUND: 1,
  CALLING_CARD: 2,
  LANDMARK: 3,
  CLOTHING: 5,
  OBJECT: 6,
  NOTECARD: 7,
  FOLDER: 8,
  SCRIPT: 10,
  BODY_PART: 13,
  ANIMATION: 20,
  GESTURE: 21,
  LINK: 24,
  LINK_FOLDER: 25,
  MARKETPLACE_FOLDER: 26,
  MESH: 49,
  SETTING: 56,
};

folderTypes = {
  USER_DEFINED: -1,
  TEXTURES: 0,
  SOUNDS: 1,
  CALLING_CARDS: 2,
  LANDMARKS: 3,
  CLOTHING: 5,
  OBJECTS: 6,
  NOTECARDS: 7,
  MY_INVENTORY: 8,
  MY_INVENTORY_OLD: 9,
  SCRIPTS: 10,
  BODY_PARTS: 13,
  TRASH: 14,
  PHOTO_ALBUM: 15,
  LOST_AND_FOUND: 16,
  ANIMATIONS: 20,
  GESTURES: 21,
  FAVORITES: 23,
  CURRENT_OUTFIT: 46,
  OUTFITS: 47,
  MESHES: 49,
  MY_SUITCASE: 100,
};

regionFlags = {
  DEFAULT_REGION: 1,
  FALLBACK_REGION: 2,
  REGION_ONLINE: 4,
  NO_DIRECT_LOGIN: 8,
  PERSISTENT: 16,
  LOCKED_OUT: 32,
  NO_MOVE: 64,
  RESERVATION: 128,
  AUTHENTICATE: 256,
  HYPERLINK: 512,
  DEFAULT_HG_REGION: 1024,
};

module.exports = { assetTypes, folderTypes, regionFlags };
