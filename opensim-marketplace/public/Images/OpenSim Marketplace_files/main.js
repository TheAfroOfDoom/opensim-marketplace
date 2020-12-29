webpackHotUpdate("main",{

/***/ "./src/components/ItemScreen/ItemScreen.jsx":
/*!**************************************************!*\
  !*** ./src/components/ItemScreen/ItemScreen.jsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ItemScreen; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-moment */ "./node_modules/react-moment/dist/index.js");
/* harmony import */ var react_moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ItemScreen_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ItemScreen.css */ "./src/components/ItemScreen/ItemScreen.css");
/* harmony import */ var _ItemScreen_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ItemScreen_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _material_ui_core_Container__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Container */ "./node_modules/@material-ui/core/esm/Container/index.js");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Paper */ "./node_modules/@material-ui/core/esm/Paper/index.js");
var _jsxFileName = "C:\\Users\\Ryan\\Documents\\Programming\\opensim-marketplace\\opensim-marketplace\\src\\components\\ItemScreen\\ItemScreen.jsx";








let texture_default = "Images/Texture_Default.png";
let animation_default = "Images/Animation_Default.png";
let attachment_default = "Images/Attachment_Default.png";
let bodyparts_default = "Images/BodyParts_Default.png";
let callingcard_default = "Images/CallingCard_Default.png";
let cloths_default = "Images/Cloths_Default.png";
let gesture_default = "Images/Gesture_Default.png";
let landmark_default = "Images/Landmark_Default.png";
let material_default = "Images/Material_Default.png";
let mesh_default = "Images/Mesh_Default.png";
let notecard_default = "Images/NoteCard_Default.png";
let object_default = "Images/Object_Default.png";
let script_default = "Images/Script_Default.png";
let sound_default = "Images/Sound_Default.png";
class ItemScreen extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    this.handleAdd = async () => {
      const response = await axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/api/inventory/add", {
        assetID: this.props.match.params.assetId
      });
    };

    this.getAssetType = assetType => {
      let info = {
        type: "",
        pic: ""
      };

      switch (assetType) {
        case -2:
          info.type = "Material";
          info.pic = material_default;
          break;

        case 0:
          info.type = "Texture in JPEG2000 J2C stream format";
          info.pic = texture_default;
          break;

        case 1:
          info.type = "Sound";
          info.pic = sound_default;
          break;

        case 2:
          info.type = "Calling Card";
          info.pic = callingcard_default;
          break;

        case 3:
          info.type = "Landmark";
          info.pic = landmark_default;
          break;

        case 5:
          info.type = "Clothing";
          info.pic = cloths_default;
          break;

        case 6:
          info.type = "Object";
          info.pic = object_default;
          break;

        case 7:
          info.type = "Notecard";
          info.pic = notecard_default;
          break;

        case 10:
          info.type = "LSLText (aka a script)";
          info.pic = script_default;
          break;

        case 13:
          info.type = "Body Part";
          info.pic = bodyparts_default;
          break;

        case 20:
          info.type = "Animation";
          info.pic = animation_default;
          break;

        case 21:
          info.type = "Gesture";
          info.pic = gesture_default;
          break;

        case 49:
          info.type = "Mesh";
          info.pic = mesh_default;
          break;

        default:
          info.type = "Invalid Type";
          info.pic = attachment_default;
          break;
      }

      return info;
    };

    this.state = {
      data: null,
      dataString: ""
    };
  }

  async componentDidMount() {
    console.log("Hey::");
    let error;

    try {
      const response = await axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/api/item", {
        params: {
          id: this.props.match.params.assetId
        }
      }).catch(err => {
        if (err.response.status === 401) {
          throw new Error(`${err.config.url} Unauthorized`);
        }

        if (err.response.status === 400) {
          throw new Error(`${err.config.url} not found:2`);
        }

        throw err;
      });
      this.setState({
        data: response.data
      });
    } catch (err) {
      error = err;
      console.log(error.message);
    }
  }

  render() {
    if (this.state.data == null) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        "data-testid": "items",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 136,
          columnNumber: 14
        }
      });
    } else {
      const {
        itemInfo,
        userInfo,
        invInfo
      } = this.state.data;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Container__WEBPACK_IMPORTED_MODULE_5__["default"], {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 141,
          columnNumber: 9
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_6__["default"], {
        container: true,
        justify: "center",
        direction: "row",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 142,
          columnNumber: 11
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_6__["default"], {
        item: true,
        container: true,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 143,
          columnNumber: 13
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_6__["default"], {
        container: true,
        direction: "column",
        justify: "center",
        spacing: 2,
        className: "item-form",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 144,
          columnNumber: 15
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_7__["default"], {
        className: "item-background",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 151,
          columnNumber: 17
        }
      })))));
    }
  }

}
/*

<body className="page">
  <div>
    <img />
    <div className="container">
      <div className="left-column">
        <Image
          data-testid="itemss"
          src={this.getAssetType(itemInfo.assetType).pic}
          fluid
        />
      </div>

      <div className="right-column">
        <div className="asset-description">
          <h1>{itemInfo.name}</h1>
          <p>{this.getAssetType(itemInfo.assetType).type}</p>
        </div>
        <div className="user-description">
          <h3>Creator Information</h3>
          <p>First Name: {userInfo.FirstName}</p>
          <p>Last Name: {userInfo.LastName}</p>
        </div>
        <div className="asset-download">
          <h3>Download & Details</h3>
          <p>
            Create Time:{" "}
            {
              <Moment format="MM/DD/YYYY HH:mm" unix>
                {itemInfo.create_time}
              </Moment>
            }
          </p>
          {console.log(invInfo.inInventory)}
          {!invInfo.inInventory ? (
            <Link to={`/inventory#${itemInfo.name}`}>
              <Button onClick={this.handleAdd}>Add To Inventory</Button>
            </Link>
          ) : (
            <Link to={`/inventory#${itemInfo.name}`}>
              <Button>View In Inventory</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
</body>
 */

/***/ })

})
//# sourceMappingURL=main.bda5685c79de00f104b4.hot-update.js.map