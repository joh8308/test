var require = meteorInstall({"lib":{"collections":{"comment.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/collections/comment.js                                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
  Meteor: function (v) {                                                                                             // 1
    Meteor = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
module.exportDefault(new Meteor.Collection("comment"));                                                              // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"connection.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/collections/connection.js                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
  Meteor: function (v) {                                                                                             // 1
    Meteor = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
module.exportDefault(new Meteor.Collection("connection"));                                                           // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/collections/index.js                                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
    User: function () {                                                                                              // 1
        return User;                                                                                                 // 1
    },                                                                                                               // 1
    Connection: function () {                                                                                        // 1
        return Connection;                                                                                           // 1
    },                                                                                                               // 1
    Comment: function () {                                                                                           // 1
        return Comment;                                                                                              // 1
    }                                                                                                                // 1
});                                                                                                                  // 1
var User = void 0;                                                                                                   // 1
module.watch(require("./user"), {                                                                                    // 1
    "default": function (v) {                                                                                        // 1
        User = v;                                                                                                    // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Connection = void 0;                                                                                             // 1
module.watch(require("./connection"), {                                                                              // 1
    "default": function (v) {                                                                                        // 1
        Connection = v;                                                                                              // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Comment = void 0;                                                                                                // 1
module.watch(require("./comment"), {                                                                                 // 1
    "default": function (v) {                                                                                        // 1
        Comment = v;                                                                                                 // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"user.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/collections/user.js                                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
  Meteor: function (v) {                                                                                             // 1
    Meteor = v;                                                                                                      // 1
  }                                                                                                                  // 1
}, 0);                                                                                                               // 1
module.exportDefault(Meteor.users);                                                                                  // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"modules":{"account":{"components":{"AccountForm.jsx":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/account/components/AccountForm.jsx                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
module.export({                                                                                                      // 1
    "default": function () {                                                                                         // 1
        return Component;                                                                                            // 1
    },                                                                                                               // 1
    Container: function () {                                                                                         // 1
        return Container;                                                                                            // 1
    },                                                                                                               // 1
    Component: function () {                                                                                         // 1
        return Component;                                                                                            // 1
    }                                                                                                                // 1
});                                                                                                                  // 1
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
    "default": function (v) {                                                                                        // 1
        React = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
    Meteor: function (v) {                                                                                           // 1
        Meteor = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var FlowRouter = void 0;                                                                                             // 1
module.watch(require("meteor/kadira:flow-router"), {                                                                 // 1
    FlowRouter: function (v) {                                                                                       // 1
        FlowRouter = v;                                                                                              // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var createContainer = void 0;                                                                                        // 1
module.watch(require("meteor/react-meteor-data"), {                                                                  // 1
    createContainer: function (v) {                                                                                  // 1
        createContainer = v;                                                                                         // 1
    }                                                                                                                // 1
}, 3);                                                                                                               // 1
var Layout = void 0,                                                                                                 // 1
    Card = void 0,                                                                                                   // 1
    Row = void 0;                                                                                                    // 1
module.watch(require("antd"), {                                                                                      // 1
    Layout: function (v) {                                                                                           // 1
        Layout = v;                                                                                                  // 1
    },                                                                                                               // 1
    Card: function (v) {                                                                                             // 1
        Card = v;                                                                                                    // 1
    },                                                                                                               // 1
    Row: function (v) {                                                                                              // 1
        Row = v;                                                                                                     // 1
    }                                                                                                                // 1
}, 4);                                                                                                               // 1
var _Layout = Layout,                                                                                                //
    Content = _Layout.Content;                                                                                       //
                                                                                                                     //
var Component = function (_React$Component) {                                                                        //
    (0, _inherits3.default)(Component, _React$Component);                                                            //
                                                                                                                     //
    function Component() {                                                                                           // 10
        (0, _classCallCheck3.default)(this, Component);                                                              // 10
                                                                                                                     //
        var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this));                     // 10
                                                                                                                     //
        _this.state = {                                                                                              // 12
            newUser: false                                                                                           // 13
        };                                                                                                           // 12
        return _this;                                                                                                // 10
    }                                                                                                                // 15
                                                                                                                     //
    Component.prototype.render = function () {                                                                       //
        function render() {                                                                                          //
            var WrapperContent = this.props.WrapperContent;                                                          // 17
            return React.createElement(                                                                              // 19
                Layout,                                                                                              // 20
                null,                                                                                                // 20
                React.createElement(                                                                                 // 21
                    Content,                                                                                         // 21
                    null,                                                                                            // 21
                    React.createElement(                                                                             // 22
                        Card,                                                                                        // 22
                        {                                                                                            // 22
                            className: "form-login-register"                                                         // 22
                        },                                                                                           // 22
                        React.createElement(                                                                         // 23
                            Row,                                                                                     // 23
                            {                                                                                        // 23
                                style: {                                                                             // 23
                                    textAlign: 'center',                                                             // 23
                                    paddingBottom: '20px'                                                            // 23
                                }                                                                                    // 23
                            },                                                                                       // 23
                            React.createElement("img", {                                                             // 24
                                src: "https://via.placeholder.com/100x100"                                           // 24
                            })                                                                                       // 24
                        ),                                                                                           // 23
                        React.createElement(                                                                         // 26
                            Row,                                                                                     // 26
                            {                                                                                        // 26
                                className: "main_content"                                                            // 26
                            },                                                                                       // 26
                            React.createElement(WrapperContent, null)                                                // 27
                        )                                                                                            // 26
                    )                                                                                                // 22
                )                                                                                                    // 21
            );                                                                                                       // 20
        }                                                                                                            // 33
                                                                                                                     //
        return render;                                                                                               //
    }();                                                                                                             //
                                                                                                                     //
    return Component;                                                                                                //
}(React.Component);                                                                                                  //
                                                                                                                     //
var Container = createContainer(function () {                                                                        // 36
    var loggedIn = Meteor.user();                                                                                    // 37
    if (loggedIn) FlowRouter.go("/");                                                                                // 38
    return {};                                                                                                       // 40
}, Component);                                                                                                       // 41
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Login.jsx":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/account/components/Login.jsx                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
    "default": function (v) {                                                                                        // 1
        React = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Layout = void 0,                                                                                                 // 1
    Form = void 0,                                                                                                   // 1
    Icon = void 0,                                                                                                   // 1
    Input = void 0,                                                                                                  // 1
    Button = void 0,                                                                                                 // 1
    Checkbox = void 0,                                                                                               // 1
    notification = void 0;                                                                                           // 1
module.watch(require("antd"), {                                                                                      // 1
    Layout: function (v) {                                                                                           // 1
        Layout = v;                                                                                                  // 1
    },                                                                                                               // 1
    Form: function (v) {                                                                                             // 1
        Form = v;                                                                                                    // 1
    },                                                                                                               // 1
    Icon: function (v) {                                                                                             // 1
        Icon = v;                                                                                                    // 1
    },                                                                                                               // 1
    Input: function (v) {                                                                                            // 1
        Input = v;                                                                                                   // 1
    },                                                                                                               // 1
    Button: function (v) {                                                                                           // 1
        Button = v;                                                                                                  // 1
    },                                                                                                               // 1
    Checkbox: function (v) {                                                                                         // 1
        Checkbox = v;                                                                                                // 1
    },                                                                                                               // 1
    notification: function (v) {                                                                                     // 1
        notification = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var FormItem = Form.Item;                                                                                            // 3
var _Layout = Layout,                                                                                                //
    Content = _Layout.Content;                                                                                       //
                                                                                                                     //
var LoginForm = function (_React$Component) {                                                                        //
    (0, _inherits3.default)(LoginForm, _React$Component);                                                            //
                                                                                                                     //
    function LoginForm() {                                                                                           // 6
        (0, _classCallCheck3.default)(this, LoginForm);                                                              // 6
                                                                                                                     //
        var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this));                     // 6
                                                                                                                     //
        _this.handleSubmit = function (e) {                                                                          // 6
            _this.setState({                                                                                         // 13
                submitLoading: true                                                                                  // 14
            });                                                                                                      // 13
                                                                                                                     //
            e.preventDefault();                                                                                      // 16
                                                                                                                     //
            _this.props.form.validateFields(function (err, values) {                                                 // 17
                if (err) {                                                                                           // 18
                    _this.setState({                                                                                 // 19
                        submitLoading: false                                                                         // 20
                    });                                                                                              // 19
                                                                                                                     //
                    return notification.error(err);                                                                  // 22
                }                                                                                                    // 23
                                                                                                                     //
                Meteor.loginWithPassword(values.username, values.password, function (loginError) {                   // 24
                    _this.setState({                                                                                 // 25
                        submitLoading: false                                                                         // 26
                    });                                                                                              // 25
                                                                                                                     //
                    if (loginError) notification.error(loginError);                                                  // 28
                });                                                                                                  // 30
            });                                                                                                      // 31
        };                                                                                                           // 32
                                                                                                                     //
        _this.state = {                                                                                              // 8
            submitLoading: false                                                                                     // 9
        };                                                                                                           // 8
        return _this;                                                                                                // 6
    }                                                                                                                // 11
                                                                                                                     //
    LoginForm.prototype.render = function () {                                                                       //
        function render() {                                                                                          //
            var getFieldDecorator = this.props.form.getFieldDecorator;                                               // 33
            return React.createElement(                                                                              // 35
                Form,                                                                                                // 36
                {                                                                                                    // 36
                    onSubmit: this.handleSubmit,                                                                     // 36
                    className: "login-form"                                                                          // 36
                },                                                                                                   // 36
                React.createElement(                                                                                 // 37
                    FormItem,                                                                                        // 37
                    null,                                                                                            // 37
                    getFieldDecorator('username', {                                                                  // 38
                        rules: [{                                                                                    // 39
                            required: true,                                                                          // 39
                            message: 'Please enter your username'                                                    // 39
                        }]                                                                                           // 39
                    })(React.createElement(Input, {                                                                  // 38
                        prefix: React.createElement(Icon, {                                                          // 41
                            type: "copy",                                                                            // 41
                            style: {                                                                                 // 41
                                fontSize: 13                                                                         // 41
                            }                                                                                        // 41
                        }),                                                                                          // 41
                        placeholder: "Username"                                                                      // 41
                    }))                                                                                              // 41
                ),                                                                                                   // 37
                React.createElement(                                                                                 // 44
                    FormItem,                                                                                        // 44
                    null,                                                                                            // 44
                    getFieldDecorator('password', {                                                                  // 45
                        rules: [{                                                                                    // 46
                            required: true,                                                                          // 46
                            message: 'Please enter your password'                                                    // 46
                        }]                                                                                           // 46
                    })(React.createElement(Input, {                                                                  // 45
                        prefix: React.createElement(Icon, {                                                          // 48
                            type: "lock",                                                                            // 48
                            style: {                                                                                 // 48
                                fontSize: 13                                                                         // 48
                            }                                                                                        // 48
                        }),                                                                                          // 48
                        type: "password",                                                                            // 48
                        placeholder: "Password"                                                                      // 48
                    }))                                                                                              // 48
                ),                                                                                                   // 44
                React.createElement(                                                                                 // 51
                    FormItem,                                                                                        // 51
                    null,                                                                                            // 51
                    getFieldDecorator('remember', {                                                                  // 52
                        valuePropName: 'checked',                                                                    // 53
                        initialValue: true                                                                           // 54
                    })(React.createElement(                                                                          // 52
                        Checkbox,                                                                                    // 56
                        null,                                                                                        // 56
                        "Remember me"                                                                                // 56
                    )),                                                                                              // 56
                    React.createElement(                                                                             // 58
                        Button,                                                                                      // 58
                        {                                                                                            // 58
                            loading: this.state.submitLoading,                                                       // 58
                            type: "primary",                                                                         // 58
                            htmlType: "submit",                                                                      // 58
                            style: {                                                                                 // 58
                                width: "100%"                                                                        // 58
                            }                                                                                        // 58
                        },                                                                                           // 58
                        "Log in"                                                                                     // 58
                    ),                                                                                               // 58
                    "Or ",                                                                                           // 51
                    React.createElement(                                                                             // 61
                        "a",                                                                                         // 61
                        {                                                                                            // 61
                            href: "/register"                                                                        // 61
                        },                                                                                           // 61
                        "register now!"                                                                              // 61
                    )                                                                                                // 61
                )                                                                                                    // 51
            );                                                                                                       // 36
        }                                                                                                            // 65
                                                                                                                     //
        return render;                                                                                               //
    }();                                                                                                             //
                                                                                                                     //
    return LoginForm;                                                                                                //
}(React.Component);                                                                                                  //
                                                                                                                     //
module.exportDefault(Form.create()(LoginForm));                                                                      // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Preferences.jsx":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/account/components/Preferences.jsx                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
    "default": function (v) {                                                                                        // 1
        React = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Form = void 0,                                                                                                   // 1
    Input = void 0,                                                                                                  // 1
    Button = void 0,                                                                                                 // 1
    Row = void 0,                                                                                                    // 1
    Col = void 0,                                                                                                    // 1
    Icon = void 0,                                                                                                   // 1
    notification = void 0;                                                                                           // 1
module.watch(require("antd"), {                                                                                      // 1
    Form: function (v) {                                                                                             // 1
        Form = v;                                                                                                    // 1
    },                                                                                                               // 1
    Input: function (v) {                                                                                            // 1
        Input = v;                                                                                                   // 1
    },                                                                                                               // 1
    Button: function (v) {                                                                                           // 1
        Button = v;                                                                                                  // 1
    },                                                                                                               // 1
    Row: function (v) {                                                                                              // 1
        Row = v;                                                                                                     // 1
    },                                                                                                               // 1
    Col: function (v) {                                                                                              // 1
        Col = v;                                                                                                     // 1
    },                                                                                                               // 1
    Icon: function (v) {                                                                                             // 1
        Icon = v;                                                                                                    // 1
    },                                                                                                               // 1
    notification: function (v) {                                                                                     // 1
        notification = v;                                                                                            // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Accounts = void 0;                                                                                               // 1
module.watch(require("meteor/accounts-base"), {                                                                      // 1
    Accounts: function (v) {                                                                                         // 1
        Accounts = v;                                                                                                // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var FormItem = Form.Item;                                                                                            // 4
                                                                                                                     //
var NormalLoginForm = function (_React$Component) {                                                                  //
    (0, _inherits3.default)(NormalLoginForm, _React$Component);                                                      //
                                                                                                                     //
    function NormalLoginForm() {                                                                                     //
        (0, _classCallCheck3.default)(this, NormalLoginForm);                                                        //
        return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));              //
    }                                                                                                                //
                                                                                                                     //
    NormalLoginForm.prototype.handleSubmit = function () {                                                           //
        function handleSubmit(e) {                                                                                   //
            e.preventDefault();                                                                                      // 8
            this.props.form.validateFields(function (err, values) {                                                  // 9
                if (!err) {                                                                                          // 10
                    Accounts.changePassword(values.oldPassword, values.newPassword, function (error) {               // 11
                        if (error) return notification.error(error);                                                 // 12
                        notification.success({                                                                       // 14
                            message: "Password updated"                                                              // 15
                        });                                                                                          // 14
                    });                                                                                              // 17
                }                                                                                                    // 18
            });                                                                                                      // 19
        }                                                                                                            // 20
                                                                                                                     //
        return handleSubmit;                                                                                         //
    }();                                                                                                             //
                                                                                                                     //
    NormalLoginForm.prototype.render = function () {                                                                 //
        function render() {                                                                                          //
            var getFieldDecorator = this.props.form.getFieldDecorator;                                               // 21
            return React.createElement(                                                                              // 23
                Row,                                                                                                 // 24
                null,                                                                                                // 24
                React.createElement(                                                                                 // 25
                    Col,                                                                                             // 25
                    {                                                                                                // 25
                        sm: 12                                                                                       // 25
                    },                                                                                               // 25
                    React.createElement(                                                                             // 26
                        Form,                                                                                        // 26
                        {                                                                                            // 26
                            onSubmit: this.handleSubmit.bind(this),                                                  // 26
                            className: "login-form"                                                                  // 26
                        },                                                                                           // 26
                        React.createElement(                                                                         // 27
                            FormItem,                                                                                // 27
                            null,                                                                                    // 27
                            getFieldDecorator('oldPassword', {                                                       // 28
                                rules: [{                                                                            // 29
                                    required: true,                                                                  // 29
                                    message: 'Please enter your old password'                                        // 29
                                }]                                                                                   // 29
                            })(React.createElement(Input, {                                                          // 28
                                prefix: React.createElement(Icon, {                                                  // 31
                                    type: "lock",                                                                    // 31
                                    style: {                                                                         // 31
                                        fontSize: 13                                                                 // 31
                                    }                                                                                // 31
                                }),                                                                                  // 31
                                type: "password",                                                                    // 31
                                placeholder: "Old Password"                                                          // 31
                            }))                                                                                      // 31
                        ),                                                                                           // 27
                        React.createElement(                                                                         // 34
                            FormItem,                                                                                // 34
                            null,                                                                                    // 34
                            getFieldDecorator('newPassword', {                                                       // 35
                                rules: [{                                                                            // 36
                                    required: true,                                                                  // 36
                                    message: 'Please enter your new password'                                        // 36
                                }]                                                                                   // 36
                            })(React.createElement(Input, {                                                          // 35
                                prefix: React.createElement(Icon, {                                                  // 38
                                    type: "lock",                                                                    // 38
                                    style: {                                                                         // 38
                                        fontSize: 13                                                                 // 38
                                    }                                                                                // 38
                                }),                                                                                  // 38
                                type: "password",                                                                    // 38
                                placeholder: "New Password"                                                          // 38
                            }))                                                                                      // 38
                        ),                                                                                           // 34
                        React.createElement(                                                                         // 41
                            FormItem,                                                                                // 41
                            null,                                                                                    // 41
                            React.createElement(                                                                     // 42
                                Button,                                                                              // 42
                                {                                                                                    // 42
                                    type: "primary",                                                                 // 42
                                    htmlType: "submit",                                                              // 42
                                    className: "login-form-button"                                                   // 42
                                },                                                                                   // 42
                                "Update password"                                                                    // 42
                            )                                                                                        // 42
                        )                                                                                            // 41
                    )                                                                                                // 26
                )                                                                                                    // 25
            );                                                                                                       // 24
        }                                                                                                            // 50
                                                                                                                     //
        return render;                                                                                               //
    }();                                                                                                             //
                                                                                                                     //
    return NormalLoginForm;                                                                                          //
}(React.Component);                                                                                                  //
                                                                                                                     //
module.exportDefault(Form.create()(NormalLoginForm));                                                                // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Register.jsx":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/account/components/Register.jsx                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
    "default": function (v) {                                                                                        // 1
        React = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
    Meteor: function (v) {                                                                                           // 1
        Meteor = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Form = void 0,                                                                                                   // 1
    Icon = void 0,                                                                                                   // 1
    Input = void 0,                                                                                                  // 1
    Button = void 0,                                                                                                 // 1
    Checkbox = void 0,                                                                                               // 1
    notification = void 0;                                                                                           // 1
module.watch(require("antd"), {                                                                                      // 1
    Form: function (v) {                                                                                             // 1
        Form = v;                                                                                                    // 1
    },                                                                                                               // 1
    Icon: function (v) {                                                                                             // 1
        Icon = v;                                                                                                    // 1
    },                                                                                                               // 1
    Input: function (v) {                                                                                            // 1
        Input = v;                                                                                                   // 1
    },                                                                                                               // 1
    Button: function (v) {                                                                                           // 1
        Button = v;                                                                                                  // 1
    },                                                                                                               // 1
    Checkbox: function (v) {                                                                                         // 1
        Checkbox = v;                                                                                                // 1
    },                                                                                                               // 1
    notification: function (v) {                                                                                     // 1
        notification = v;                                                                                            // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var FormItem = Form.Item;                                                                                            // 4
                                                                                                                     //
var Register = function (_React$Component) {                                                                         //
    (0, _inherits3.default)(Register, _React$Component);                                                             //
                                                                                                                     //
    function Register() {                                                                                            // 6
        (0, _classCallCheck3.default)(this, Register);                                                               // 6
                                                                                                                     //
        var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this));                     // 6
                                                                                                                     //
        _this.handleSubmit = function (e) {                                                                          // 6
            e.preventDefault();                                                                                      // 13
                                                                                                                     //
            _this.setState({                                                                                         // 14
                submitLoading: true                                                                                  // 15
            });                                                                                                      // 14
                                                                                                                     //
            _this.props.form.validateFields(function (err, values) {                                                 // 17
                if (err) {                                                                                           // 18
                    _this.setState({                                                                                 // 19
                        submitLoading: false                                                                         // 20
                    });                                                                                              // 19
                                                                                                                     //
                    return notification.error(err);                                                                  // 22
                }                                                                                                    // 23
                                                                                                                     //
                Meteor.call("accounts/create", values, function (error) {                                            // 24
                    if (error) {                                                                                     // 25
                        _this.setState({                                                                             // 26
                            submitLoading: false                                                                     // 27
                        });                                                                                          // 26
                                                                                                                     //
                        return notification.error(error);                                                            // 29
                    }                                                                                                // 30
                                                                                                                     //
                    Meteor.loginWithPassword(values.username, values.password, function (loginError) {               // 31
                        if (loginError) notification.error(loginError);                                              // 32
                    });                                                                                              // 34
                });                                                                                                  // 35
            });                                                                                                      // 36
        };                                                                                                           // 37
                                                                                                                     //
        _this.state = {                                                                                              // 8
            submitLoading: false                                                                                     // 9
        };                                                                                                           // 8
        return _this;                                                                                                // 6
    }                                                                                                                // 11
                                                                                                                     //
    Register.prototype.render = function () {                                                                        //
        function render() {                                                                                          //
            var getFieldDecorator = this.props.form.getFieldDecorator;                                               // 39
            return React.createElement(                                                                              // 41
                Form,                                                                                                // 42
                {                                                                                                    // 42
                    onSubmit: this.handleSubmit,                                                                     // 42
                    className: "login-form"                                                                          // 42
                },                                                                                                   // 42
                React.createElement(                                                                                 // 43
                    FormItem,                                                                                        // 43
                    null,                                                                                            // 43
                    getFieldDecorator('username', {                                                                  // 44
                        rules: [{                                                                                    // 45
                            required: true,                                                                          // 45
                            message: 'Please enter your username'                                                    // 45
                        }]                                                                                           // 45
                    })(React.createElement(Input, {                                                                  // 44
                        prefix: React.createElement(Icon, {                                                          // 47
                            type: "copy",                                                                            // 47
                            style: {                                                                                 // 47
                                fontSize: 13                                                                         // 47
                            }                                                                                        // 47
                        }),                                                                                          // 47
                        placeholder: "Username"                                                                      // 47
                    }))                                                                                              // 47
                ),                                                                                                   // 43
                React.createElement(                                                                                 // 50
                    FormItem,                                                                                        // 50
                    null,                                                                                            // 50
                    getFieldDecorator('password', {                                                                  // 51
                        rules: [{                                                                                    // 52
                            required: true,                                                                          // 52
                            message: 'Please enter your password'                                                    // 52
                        }]                                                                                           // 52
                    })(React.createElement(Input, {                                                                  // 51
                        prefix: React.createElement(Icon, {                                                          // 54
                            type: "lock",                                                                            // 54
                            style: {                                                                                 // 54
                                fontSize: 13                                                                         // 54
                            }                                                                                        // 54
                        }),                                                                                          // 54
                        type: "password",                                                                            // 54
                        placeholder: "Password"                                                                      // 55
                    }))                                                                                              // 54
                ),                                                                                                   // 50
                React.createElement(                                                                                 // 58
                    FormItem,                                                                                        // 58
                    null,                                                                                            // 58
                    getFieldDecorator('remember', {                                                                  // 59
                        valuePropName: 'checked',                                                                    // 60
                        initialValue: true                                                                           // 61
                    })(React.createElement(                                                                          // 59
                        Checkbox,                                                                                    // 63
                        null,                                                                                        // 63
                        "Remember me"                                                                                // 63
                    )),                                                                                              // 63
                    React.createElement(                                                                             // 65
                        Button,                                                                                      // 65
                        {                                                                                            // 65
                            loading: this.state.submitLoading,                                                       // 65
                            type: "primary",                                                                         // 65
                            htmlType: "submit",                                                                      // 65
                            style: {                                                                                 // 65
                                width: "100%"                                                                        // 65
                            }                                                                                        // 65
                        },                                                                                           // 65
                        "Register"                                                                                   // 65
                    ),                                                                                               // 65
                    "Or ",                                                                                           // 58
                    React.createElement(                                                                             // 68
                        "a",                                                                                         // 68
                        {                                                                                            // 68
                            href: "/login"                                                                           // 68
                        },                                                                                           // 68
                        "login now!"                                                                                 // 68
                    )                                                                                                // 68
                )                                                                                                    // 58
            );                                                                                                       // 42
        }                                                                                                            // 72
                                                                                                                     //
        return render;                                                                                               //
    }();                                                                                                             //
                                                                                                                     //
    return Register;                                                                                                 //
}(React.Component);                                                                                                  //
                                                                                                                     //
module.exportDefault(Form.create()(Register));                                                                       // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"account.route.jsx":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/account/account.route.jsx                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
    "default": function (v) {                                                                                        // 1
        React = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var FlowRouter = void 0;                                                                                             // 1
module.watch(require("meteor/kadira:flow-router"), {                                                                 // 1
    FlowRouter: function (v) {                                                                                       // 1
        FlowRouter = v;                                                                                              // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var mount = void 0;                                                                                                  // 1
module.watch(require("react-mounter"), {                                                                             // 1
    mount: function (v) {                                                                                            // 1
        mount = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var AccountForm = void 0,                                                                                            // 1
    Login = void 0,                                                                                                  // 1
    Register = void 0,                                                                                               // 1
    Preferences = void 0,                                                                                            // 1
    ForgotPassword = void 0,                                                                                         // 1
    ResetPassword = void 0;                                                                                          // 1
module.watch(require("./"), {                                                                                        // 1
    AccountForm: function (v) {                                                                                      // 1
        AccountForm = v;                                                                                             // 1
    },                                                                                                               // 1
    Login: function (v) {                                                                                            // 1
        Login = v;                                                                                                   // 1
    },                                                                                                               // 1
    Register: function (v) {                                                                                         // 1
        Register = v;                                                                                                // 1
    },                                                                                                               // 1
    Preferences: function (v) {                                                                                      // 1
        Preferences = v;                                                                                             // 1
    },                                                                                                               // 1
    ForgotPassword: function (v) {                                                                                   // 1
        ForgotPassword = v;                                                                                          // 1
    },                                                                                                               // 1
    ResetPassword: function (v) {                                                                                    // 1
        ResetPassword = v;                                                                                           // 1
    }                                                                                                                // 1
}, 3);                                                                                                               // 1
var Wrapper = void 0;                                                                                                // 1
module.watch(require("../layout"), {                                                                                 // 1
    Wrapper: function (v) {                                                                                          // 1
        Wrapper = v;                                                                                                 // 1
    }                                                                                                                // 1
}, 4);                                                                                                               // 1
FlowRouter.route("/login", {                                                                                         // 7
    name: 'login',                                                                                                   // 8
    action: function () {                                                                                            // 9
        mount(AccountForm, {                                                                                         // 10
            WrapperContent: Login                                                                                    // 11
        });                                                                                                          // 10
    }                                                                                                                // 13
});                                                                                                                  // 7
FlowRouter.route("/register", {                                                                                      // 16
    name: 'register',                                                                                                // 17
    action: function () {                                                                                            // 18
        mount(AccountForm, {                                                                                         // 19
            WrapperContent: Register                                                                                 // 20
        });                                                                                                          // 19
    }                                                                                                                // 22
});                                                                                                                  // 16
FlowRouter.route("/preferences", {                                                                                   // 24
    name: 'preferences',                                                                                             // 25
    action: function () {                                                                                            // 26
        mount(Wrapper, {                                                                                             // 27
            WrapperContent: Preferences                                                                              // 28
        });                                                                                                          // 27
    }                                                                                                                // 30
});                                                                                                                  // 24
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/account/index.js                                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
    AccountForm: function () {                                                                                       // 1
        return AccountForm;                                                                                          // 1
    },                                                                                                               // 1
    Login: function () {                                                                                             // 1
        return Login;                                                                                                // 1
    },                                                                                                               // 1
    Register: function () {                                                                                          // 1
        return Register;                                                                                             // 1
    },                                                                                                               // 1
    Preferences: function () {                                                                                       // 1
        return Preferences;                                                                                          // 1
    }                                                                                                                // 1
});                                                                                                                  // 1
var AccountForm = void 0;                                                                                            // 1
module.watch(require("./components/AccountForm"), {                                                                  // 1
    Container: function (v) {                                                                                        // 1
        AccountForm = v;                                                                                             // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Login = void 0;                                                                                                  // 1
module.watch(require("./components/Login"), {                                                                        // 1
    "default": function (v) {                                                                                        // 1
        Login = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Register = void 0;                                                                                               // 1
module.watch(require("./components/Register"), {                                                                     // 1
    "default": function (v) {                                                                                        // 1
        Register = v;                                                                                                // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var Preferences = void 0;                                                                                            // 1
module.watch(require("./components/Preferences"), {                                                                  // 1
    "default": function (v) {                                                                                        // 1
        Preferences = v;                                                                                             // 1
    }                                                                                                                // 1
}, 3);                                                                                                               // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"dashboard":{"components":{"Admin.jsx":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/dashboard/components/Admin.jsx                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
    "default": function (v) {                                                                                        // 1
        React = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
    Meteor: function (v) {                                                                                           // 1
        Meteor = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Roles = void 0;                                                                                                  // 1
module.watch(require("meteor/alanning:roles"), {                                                                     // 1
    Roles: function (v) {                                                                                            // 1
        Roles = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var FlowRouter = void 0;                                                                                             // 1
module.watch(require("meteor/kadira:flow-router"), {                                                                 // 1
    FlowRouter: function (v) {                                                                                       // 1
        FlowRouter = v;                                                                                              // 1
    }                                                                                                                // 1
}, 3);                                                                                                               // 1
var createContainer = void 0;                                                                                        // 1
module.watch(require("meteor/react-meteor-data"), {                                                                  // 1
    createContainer: function (v) {                                                                                  // 1
        createContainer = v;                                                                                         // 1
    }                                                                                                                // 1
}, 4);                                                                                                               // 1
var Row = void 0,                                                                                                    // 1
    Col = void 0,                                                                                                    // 1
    Card = void 0;                                                                                                   // 1
module.watch(require("antd"), {                                                                                      // 1
    Row: function (v) {                                                                                              // 1
        Row = v;                                                                                                     // 1
    },                                                                                                               // 1
    Col: function (v) {                                                                                              // 1
        Col = v;                                                                                                     // 1
    },                                                                                                               // 1
    Card: function (v) {                                                                                             // 1
        Card = v;                                                                                                    // 1
    }                                                                                                                // 1
}, 5);                                                                                                               // 1
module.exportDefault(function (_React$Component) {                                                                   // 1
    (0, _inherits3.default)(_class, _React$Component);                                                               // 1
                                                                                                                     //
    function _class() {                                                                                              // 1
        (0, _classCallCheck3.default)(this, _class);                                                                 // 1
        return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));              // 1
    }                                                                                                                // 1
                                                                                                                     //
    _class.prototype.goTo = function () {                                                                            // 1
        function goTo(path) {                                                                                        // 1
            FlowRouter.go(path);                                                                                     // 9
        }                                                                                                            // 10
                                                                                                                     //
        return goTo;                                                                                                 // 1
    }();                                                                                                             // 1
                                                                                                                     //
    _class.prototype.render = function () {                                                                          // 1
        function render() {                                                                                          // 1
            return React.createElement(                                                                              // 12
                Row,                                                                                                 // 13
                {                                                                                                    // 13
                    gutter: 16                                                                                       // 13
                },                                                                                                   // 13
                React.createElement(                                                                                 // 14
                    Col,                                                                                             // 14
                    {                                                                                                // 14
                        span: 6                                                                                      // 14
                    },                                                                                               // 14
                    React.createElement(                                                                             // 15
                        Card,                                                                                        // 15
                        {                                                                                            // 15
                            title: "Edit users",                                                                     // 15
                            style: {                                                                                 // 15
                                cursor: 'pointer',                                                                   // 15
                                minHeight: "150px"                                                                   // 15
                            },                                                                                       // 15
                            onClick: this.goTo.bind(this, "/users")                                                  // 15
                        },                                                                                           // 15
                        React.createElement(                                                                         // 16
                            "p",                                                                                     // 16
                            null,                                                                                    // 16
                            "Create, edit and view information about all users"                                      // 16
                        ),                                                                                           // 16
                        React.createElement(                                                                         // 19
                            "p",                                                                                     // 19
                            {                                                                                        // 19
                                className: "danger"                                                                  // 19
                            },                                                                                       // 19
                            "Admin only"                                                                             // 19
                        )                                                                                            // 19
                    )                                                                                                // 15
                ),                                                                                                   // 14
                React.createElement(                                                                                 // 24
                    Col,                                                                                             // 24
                    {                                                                                                // 24
                        span: 6                                                                                      // 24
                    },                                                                                               // 24
                    React.createElement(                                                                             // 25
                        Card,                                                                                        // 25
                        {                                                                                            // 25
                            title: "View profile",                                                                   // 25
                            style: {                                                                                 // 25
                                cursor: 'pointer',                                                                   // 25
                                minHeight: "150px"                                                                   // 25
                            },                                                                                       // 25
                            onClick: this.goTo.bind(this, "/profile")                                                // 25
                        },                                                                                           // 25
                        React.createElement(                                                                         // 26
                            "p",                                                                                     // 26
                            null,                                                                                    // 26
                            "View your profile"                                                                      // 26
                        )                                                                                            // 26
                    )                                                                                                // 25
                ),                                                                                                   // 24
                React.createElement(                                                                                 // 32
                    Col,                                                                                             // 32
                    {                                                                                                // 32
                        span: 6                                                                                      // 32
                    },                                                                                               // 32
                    React.createElement(Card, {                                                                      // 33
                        title: "View users",                                                                         // 33
                        style: {                                                                                     // 33
                            cursor: 'pointer',                                                                       // 33
                            minHeight: "150px"                                                                       // 33
                        },                                                                                           // 33
                        onClick: this.goTo.bind(this, "/users_list")                                                 // 33
                    })                                                                                               // 33
                )                                                                                                    // 32
            );                                                                                                       // 13
        }                                                                                                            // 39
                                                                                                                     //
        return render;                                                                                               // 1
    }();                                                                                                             // 1
                                                                                                                     //
    return _class;                                                                                                   // 1
}(React.Component));                                                                                                 // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Dashboard.jsx":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/dashboard/components/Dashboard.jsx                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
module.export({                                                                                                      // 1
    Container: function () {                                                                                         // 1
        return Container;                                                                                            // 1
    },                                                                                                               // 1
    Component: function () {                                                                                         // 1
        return Component;                                                                                            // 1
    }                                                                                                                // 1
});                                                                                                                  // 1
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
    "default": function (v) {                                                                                        // 1
        React = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Admin = void 0,                                                                                                  // 1
    User = void 0;                                                                                                   // 1
module.watch(require("../"), {                                                                                       // 1
    Admin: function (v) {                                                                                            // 1
        Admin = v;                                                                                                   // 1
    },                                                                                                               // 1
    User: function (v) {                                                                                             // 1
        User = v;                                                                                                    // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var DashboardComponent = void 0;                                                                                     // 1
module.watch(require("../"), {                                                                                       // 1
    DashboardComponent: function (v) {                                                                               // 1
        DashboardComponent = v;                                                                                      // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var Roles = void 0;                                                                                                  // 1
module.watch(require("meteor/alanning:roles"), {                                                                     // 1
    Roles: function (v) {                                                                                            // 1
        Roles = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 3);                                                                                                               // 1
var createContainer = void 0;                                                                                        // 1
module.watch(require("meteor/react-meteor-data"), {                                                                  // 1
    createContainer: function (v) {                                                                                  // 1
        createContainer = v;                                                                                         // 1
    }                                                                                                                // 1
}, 4);                                                                                                               // 1
                                                                                                                     //
var Component = function (_React$Component) {                                                                        //
    (0, _inherits3.default)(Component, _React$Component);                                                            //
                                                                                                                     //
    function Component() {                                                                                           //
        (0, _classCallCheck3.default)(this, Component);                                                              //
        return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));              //
    }                                                                                                                //
                                                                                                                     //
    Component.prototype.render = function () {                                                                       //
        function render() {                                                                                          //
            if (this.props.isAdmin) return React.createElement(Admin, null);else return React.createElement(User, null);
        }                                                                                                            // 13
                                                                                                                     //
        return render;                                                                                               //
    }();                                                                                                             //
                                                                                                                     //
    return Component;                                                                                                //
}(React.Component);                                                                                                  //
                                                                                                                     //
var Container = createContainer(function () {                                                                        // 18
    var isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP);                                  // 19
    return {                                                                                                         // 20
        isAdmin: isAdmin                                                                                             // 21
    };                                                                                                               // 20
}, Component);                                                                                                       // 23
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"User.jsx":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/dashboard/components/User.jsx                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
    "default": function (v) {                                                                                        // 1
        React = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
    Meteor: function (v) {                                                                                           // 1
        Meteor = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Roles = void 0;                                                                                                  // 1
module.watch(require("meteor/alanning:roles"), {                                                                     // 1
    Roles: function (v) {                                                                                            // 1
        Roles = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var FlowRouter = void 0;                                                                                             // 1
module.watch(require("meteor/kadira:flow-router"), {                                                                 // 1
    FlowRouter: function (v) {                                                                                       // 1
        FlowRouter = v;                                                                                              // 1
    }                                                                                                                // 1
}, 3);                                                                                                               // 1
var createContainer = void 0;                                                                                        // 1
module.watch(require("meteor/react-meteor-data"), {                                                                  // 1
    createContainer: function (v) {                                                                                  // 1
        createContainer = v;                                                                                         // 1
    }                                                                                                                // 1
}, 4);                                                                                                               // 1
var Row = void 0,                                                                                                    // 1
    Col = void 0,                                                                                                    // 1
    Card = void 0;                                                                                                   // 1
module.watch(require("antd"), {                                                                                      // 1
    Row: function (v) {                                                                                              // 1
        Row = v;                                                                                                     // 1
    },                                                                                                               // 1
    Col: function (v) {                                                                                              // 1
        Col = v;                                                                                                     // 1
    },                                                                                                               // 1
    Card: function (v) {                                                                                             // 1
        Card = v;                                                                                                    // 1
    }                                                                                                                // 1
}, 5);                                                                                                               // 1
var CallUsers = void 0;                                                                                              // 1
module.watch(require("../../users"), {                                                                               // 1
    CallUsers: function (v) {                                                                                        // 1
        CallUsers = v;                                                                                               // 1
    }                                                                                                                // 1
}, 6);                                                                                                               // 1
module.exportDefault(function (_React$Component) {                                                                   // 1
    (0, _inherits3.default)(_class, _React$Component);                                                               // 1
                                                                                                                     //
    function _class() {                                                                                              // 1
        (0, _classCallCheck3.default)(this, _class);                                                                 // 1
        return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));              // 1
    }                                                                                                                // 1
                                                                                                                     //
    _class.prototype.goTo = function () {                                                                            // 1
        function goTo(path) {                                                                                        // 1
            FlowRouter.go(path);                                                                                     // 10
        }                                                                                                            // 11
                                                                                                                     //
        return goTo;                                                                                                 // 1
    }();                                                                                                             // 1
                                                                                                                     //
    _class.prototype.render = function () {                                                                          // 1
        function render() {                                                                                          // 1
            return React.createElement(CallUsers, null);                                                             // 13
        }                                                                                                            // 16
                                                                                                                     //
        return render;                                                                                               // 1
    }();                                                                                                             // 1
                                                                                                                     //
    return _class;                                                                                                   // 1
}(React.Component));                                                                                                 // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"dashboard.route.jsx":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/dashboard/dashboard.route.jsx                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
    "default": function (v) {                                                                                        // 1
        React = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var FlowRouter = void 0;                                                                                             // 1
module.watch(require("meteor/kadira:flow-router"), {                                                                 // 1
    FlowRouter: function (v) {                                                                                       // 1
        FlowRouter = v;                                                                                              // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var mount = void 0;                                                                                                  // 1
module.watch(require("react-mounter"), {                                                                             // 1
    mount: function (v) {                                                                                            // 1
        mount = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var Wrapper = void 0;                                                                                                // 1
module.watch(require("../layout"), {                                                                                 // 1
    Wrapper: function (v) {                                                                                          // 1
        Wrapper = v;                                                                                                 // 1
    }                                                                                                                // 1
}, 3);                                                                                                               // 1
var Dashboard = void 0;                                                                                              // 1
module.watch(require("./"), {                                                                                        // 1
    Dashboard: function (v) {                                                                                        // 1
        Dashboard = v;                                                                                               // 1
    }                                                                                                                // 1
}, 4);                                                                                                               // 1
FlowRouter.route("/", {                                                                                              // 6
    name: "dashboard",                                                                                               // 7
    action: function () {                                                                                            // 8
        mount(Wrapper, {                                                                                             // 9
            WrapperContent: Dashboard                                                                                // 10
        });                                                                                                          // 9
    }                                                                                                                // 12
});                                                                                                                  // 6
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/dashboard/index.js                                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
    Admin: function () {                                                                                             // 1
        return Admin;                                                                                                // 1
    },                                                                                                               // 1
    User: function () {                                                                                              // 1
        return User;                                                                                                 // 1
    },                                                                                                               // 1
    Dashboard: function () {                                                                                         // 1
        return Dashboard;                                                                                            // 1
    }                                                                                                                // 1
});                                                                                                                  // 1
var Admin = void 0;                                                                                                  // 1
module.watch(require("./components/Admin"), {                                                                        // 1
    "default": function (v) {                                                                                        // 1
        Admin = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var User = void 0;                                                                                                   // 1
module.watch(require("./components/User"), {                                                                         // 1
    "default": function (v) {                                                                                        // 1
        User = v;                                                                                                    // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Dashboard = void 0;                                                                                              // 1
module.watch(require("./components/Dashboard"), {                                                                    // 1
    Container: function (v) {                                                                                        // 1
        Dashboard = v;                                                                                               // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"data":{"components":{"Table.jsx":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/data/components/Table.jsx                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
    "default": function (v) {                                                                                        // 1
        React = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
    Meteor: function (v) {                                                                                           // 1
        Meteor = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var createContainer = void 0;                                                                                        // 1
module.watch(require("meteor/react-meteor-data"), {                                                                  // 1
    createContainer: function (v) {                                                                                  // 1
        createContainer = v;                                                                                         // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var Counts = void 0;                                                                                                 // 1
module.watch(require("meteor/tmeasday:publish-counts"), {                                                            // 1
    Counts: function (v) {                                                                                           // 1
        Counts = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 3);                                                                                                               // 1
var ReactiveVar = void 0;                                                                                            // 1
module.watch(require("meteor/reactive-var"), {                                                                       // 1
    ReactiveVar: function (v) {                                                                                      // 1
        ReactiveVar = v;                                                                                             // 1
    }                                                                                                                // 1
}, 4);                                                                                                               // 1
var Table = void 0,                                                                                                  // 1
    Spin = void 0,                                                                                                   // 1
    Row = void 0,                                                                                                    // 1
    Input = void 0;                                                                                                  // 1
module.watch(require("antd"), {                                                                                      // 1
    Table: function (v) {                                                                                            // 1
        Table = v;                                                                                                   // 1
    },                                                                                                               // 1
    Spin: function (v) {                                                                                             // 1
        Spin = v;                                                                                                    // 1
    },                                                                                                               // 1
    Row: function (v) {                                                                                              // 1
        Row = v;                                                                                                     // 1
    },                                                                                                               // 1
    Input: function (v) {                                                                                            // 1
        Input = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 5);                                                                                                               // 1
var currentPage = new ReactiveVar(1);                                                                                // 7
                                                                                                                     //
var DataTable = function (_React$Component) {                                                                        //
    (0, _inherits3.default)(DataTable, _React$Component);                                                            //
                                                                                                                     //
    function DataTable() {                                                                                           // 9
        (0, _classCallCheck3.default)(this, DataTable);                                                              // 9
                                                                                                                     //
        var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this));                     // 9
                                                                                                                     //
        currentPage.set(1);                                                                                          // 11
        return _this;                                                                                                // 9
    }                                                                                                                // 12
                                                                                                                     //
    DataTable.prototype.changePage = function () {                                                                   //
        function changePage(_ref) {                                                                                  //
            var total = _ref.total,                                                                                  // 13
                current = _ref.current,                                                                              // 13
                pageSize = _ref.pageSize;                                                                            // 13
            currentPage.set(current);                                                                                // 14
        }                                                                                                            // 15
                                                                                                                     //
        return changePage;                                                                                           //
    }();                                                                                                             //
                                                                                                                     //
    DataTable.prototype.searchUsers = function () {                                                                  //
        function searchUsers(e) {                                                                                    //
            e.persist();                                                                                             // 17
            e.preventDefault();                                                                                      // 18
            currentPage.set(1);                                                                                      // 19
            this.props.onSearchChange(e.target.value);                                                               // 20
        }                                                                                                            // 21
                                                                                                                     //
        return searchUsers;                                                                                          //
    }();                                                                                                             //
                                                                                                                     //
    DataTable.prototype.render = function () {                                                                       //
        function render() {                                                                                          //
            var pagination = {                                                                                       // 23
                total: this.props.count,                                                                             // 24
                current: currentPage.get()                                                                           // 25
            };                                                                                                       // 23
            var tableData = this.props.mapTableData();                                                               // 27
            return React.createElement(                                                                              // 28
                Row,                                                                                                 // 29
                null,                                                                                                // 29
                React.createElement(                                                                                 // 30
                    Row,                                                                                             // 30
                    null,                                                                                            // 30
                    React.createElement(Input, {                                                                     // 31
                        onPressEnter: this.searchUsers.bind(this)                                                    // 31
                    })                                                                                               // 31
                ),                                                                                                   // 30
                React.createElement(                                                                                 // 33
                    Row,                                                                                             // 33
                    null,                                                                                            // 33
                    React.createElement(Table, {                                                                     // 34
                        loading: !this.props.subReady,                                                               // 34
                        onChange: this.changePage.bind(this),                                                        // 34
                        pagination: pagination,                                                                      // 34
                        columns: this.props.columns,                                                                 // 34
                        dataSource: tableData                                                                        // 34
                    })                                                                                               // 34
                )                                                                                                    // 33
            );                                                                                                       // 29
        }                                                                                                            // 38
                                                                                                                     //
        return render;                                                                                               //
    }();                                                                                                             //
                                                                                                                     //
    return DataTable;                                                                                                //
}(React.Component);                                                                                                  //
                                                                                                                     //
DataTable.PropTypes = {                                                                                              // 40
    columns: Array,                                                                                                  // 41
    subscription: String,                                                                                            // 42
    mapTableData: Function,                                                                                          // 43
    onSearchChange: Function                                                                                         // 44
};                                                                                                                   // 40
module.exportDefault(createContainer(function (props) {                                                              // 1
    var subReady = Meteor.subscribe(props.subscription, currentPage.get(), props.searchValue).ready();               // 47
    var count = Counts.get(props.subscription + ".count");                                                           // 48
    return {                                                                                                         // 49
        subReady: subReady,                                                                                          // 50
        count: count                                                                                                 // 51
    };                                                                                                               // 49
}, DataTable));                                                                                                      // 53
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"index.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/data/index.js                                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
    Table: function () {                                                                                             // 1
        return Table;                                                                                                // 1
    }                                                                                                                // 1
});                                                                                                                  // 1
var Table = void 0;                                                                                                  // 1
module.watch(require("./components/Table"), {                                                                        // 1
    "default": function (v) {                                                                                        // 1
        Table = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"layout":{"components":{"Footer.jsx":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/layout/components/Footer.jsx                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
    "default": function (v) {                                                                                        // 1
        React = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Layout = void 0;                                                                                                 // 1
module.watch(require("antd"), {                                                                                      // 1
    Layout: function (v) {                                                                                           // 1
        Layout = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var _Layout = Layout,                                                                                                //
    Footer = _Layout.Footer;                                                                                         //
module.exportDefault(function (_React$Component) {                                                                   // 1
    (0, _inherits3.default)(_class, _React$Component);                                                               // 1
                                                                                                                     //
    function _class() {                                                                                              // 1
        (0, _classCallCheck3.default)(this, _class);                                                                 // 1
        return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));              // 1
    }                                                                                                                // 1
                                                                                                                     //
    _class.prototype.render = function () {                                                                          // 1
        function render() {                                                                                          // 1
            return React.createElement(                                                                              // 7
                Footer,                                                                                              // 7
                {                                                                                                    // 7
                    style: {                                                                                         // 7
                        textAlign: 'center'                                                                          // 7
                    }                                                                                                // 7
                },                                                                                                   // 7
                "AntD Meteor Boilerplate"                                                                            // 7
            );                                                                                                       // 7
        }                                                                                                            // 10
                                                                                                                     //
        return render;                                                                                               // 1
    }();                                                                                                             // 1
                                                                                                                     //
    return _class;                                                                                                   // 1
}(React.Component));                                                                                                 // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Header.jsx":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/layout/components/Header.jsx                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
    "default": function (v) {                                                                                        // 1
        React = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
    Meteor: function (v) {                                                                                           // 1
        Meteor = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var FlowRouter = void 0;                                                                                             // 1
module.watch(require("meteor/kadira:flow-router"), {                                                                 // 1
    FlowRouter: function (v) {                                                                                       // 1
        FlowRouter = v;                                                                                              // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var Layout = void 0,                                                                                                 // 1
    Menu = void 0,                                                                                                   // 1
    Row = void 0,                                                                                                    // 1
    Col = void 0;                                                                                                    // 1
module.watch(require("antd"), {                                                                                      // 1
    Layout: function (v) {                                                                                           // 1
        Layout = v;                                                                                                  // 1
    },                                                                                                               // 1
    Menu: function (v) {                                                                                             // 1
        Menu = v;                                                                                                    // 1
    },                                                                                                               // 1
    Row: function (v) {                                                                                              // 1
        Row = v;                                                                                                     // 1
    },                                                                                                               // 1
    Col: function (v) {                                                                                              // 1
        Col = v;                                                                                                     // 1
    }                                                                                                                // 1
}, 3);                                                                                                               // 1
var _Layout = Layout,                                                                                                //
    Header = _Layout.Header;                                                                                         //
var SubMenu = Menu.SubMenu;                                                                                          // 6
module.exportDefault(function (_React$Component) {                                                                   // 1
    (0, _inherits3.default)(_class, _React$Component);                                                               // 1
                                                                                                                     //
    function _class() {                                                                                              // 1
        (0, _classCallCheck3.default)(this, _class);                                                                 // 1
        return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));              // 1
    }                                                                                                                // 1
                                                                                                                     //
    _class.prototype.click = function () {                                                                           // 1
        function click(_ref) {                                                                                       // 1
            var key = _ref.key;                                                                                      // 9
                                                                                                                     //
            switch (key) {                                                                                           // 10
                case "logout":                                                                                       // 11
                    Meteor.logout();                                                                                 // 12
                    break;                                                                                           // 13
                                                                                                                     //
                case "preferences":                                                                                  // 14
                    FlowRouter.go("/preferences");                                                                   // 15
                    break;                                                                                           // 16
            }                                                                                                        // 10
        }                                                                                                            // 18
                                                                                                                     //
        return click;                                                                                                // 1
    }();                                                                                                             // 1
                                                                                                                     //
    _class.prototype.render = function () {                                                                          // 1
        function render() {                                                                                          // 1
            return React.createElement(                                                                              // 20
                Header,                                                                                              // 20
                null,                                                                                                // 20
                React.createElement("div", {                                                                         // 21
                    className: "logo"                                                                                // 21
                }),                                                                                                  // 21
                React.createElement(                                                                                 // 22
                    Menu,                                                                                            // 22
                    {                                                                                                // 22
                        onClick: this.click.bind(this),                                                              // 23
                        theme: "dark",                                                                               // 24
                        mode: "horizontal",                                                                          // 25
                        style: {                                                                                     // 26
                            lineHeight: '64px',                                                                      // 26
                            float: 'right'                                                                           // 26
                        }                                                                                            // 26
                    },                                                                                               // 22
                    React.createElement(                                                                             // 28
                        SubMenu,                                                                                     // 28
                        {                                                                                            // 28
                            key: "sub1",                                                                             // 28
                            title: "Account"                                                                         // 28
                        },                                                                                           // 28
                        React.createElement(                                                                         // 29
                            Menu.Item,                                                                               // 29
                            {                                                                                        // 29
                                key: "preferences"                                                                   // 29
                            },                                                                                       // 29
                            "Preferences"                                                                            // 29
                        ),                                                                                           // 29
                        React.createElement(                                                                         // 30
                            Menu.Item,                                                                               // 30
                            {                                                                                        // 30
                                key: "logout"                                                                        // 30
                            },                                                                                       // 30
                            "Logout"                                                                                 // 30
                        )                                                                                            // 30
                    )                                                                                                // 28
                )                                                                                                    // 22
            );                                                                                                       // 20
        }                                                                                                            // 34
                                                                                                                     //
        return render;                                                                                               // 1
    }();                                                                                                             // 1
                                                                                                                     //
    return _class;                                                                                                   // 1
}(React.Component));                                                                                                 // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Wrapper.jsx":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/layout/components/Wrapper.jsx                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
    "default": function (v) {                                                                                        // 1
        React = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
    Meteor: function (v) {                                                                                           // 1
        Meteor = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var createContainer = void 0;                                                                                        // 1
module.watch(require("meteor/react-meteor-data"), {                                                                  // 1
    createContainer: function (v) {                                                                                  // 1
        createContainer = v;                                                                                         // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var FlowRouter = void 0;                                                                                             // 1
module.watch(require("meteor/kadira:flow-router"), {                                                                 // 1
    FlowRouter: function (v) {                                                                                       // 1
        FlowRouter = v;                                                                                              // 1
    }                                                                                                                // 1
}, 3);                                                                                                               // 1
var Layout = void 0,                                                                                                 // 1
    Icon = void 0,                                                                                                   // 1
    Modal = void 0,                                                                                                  // 1
    Row = void 0,                                                                                                    // 1
    Col = void 0,                                                                                                    // 1
    Card = void 0;                                                                                                   // 1
module.watch(require("antd"), {                                                                                      // 1
    Layout: function (v) {                                                                                           // 1
        Layout = v;                                                                                                  // 1
    },                                                                                                               // 1
    Icon: function (v) {                                                                                             // 1
        Icon = v;                                                                                                    // 1
    },                                                                                                               // 1
    Modal: function (v) {                                                                                            // 1
        Modal = v;                                                                                                   // 1
    },                                                                                                               // 1
    Row: function (v) {                                                                                              // 1
        Row = v;                                                                                                     // 1
    },                                                                                                               // 1
    Col: function (v) {                                                                                              // 1
        Col = v;                                                                                                     // 1
    },                                                                                                               // 1
    Card: function (v) {                                                                                             // 1
        Card = v;                                                                                                    // 1
    }                                                                                                                // 1
}, 4);                                                                                                               // 1
var Header = void 0,                                                                                                 // 1
    Footer = void 0;                                                                                                 // 1
module.watch(require("../"), {                                                                                       // 1
    Header: function (v) {                                                                                           // 1
        Header = v;                                                                                                  // 1
    },                                                                                                               // 1
    Footer: function (v) {                                                                                           // 1
        Footer = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 5);                                                                                                               // 1
var CallUsers = void 0;                                                                                              // 1
module.watch(require("../../users"), {                                                                               // 1
    CallUsers: function (v) {                                                                                        // 1
        CallUsers = v;                                                                                               // 1
    }                                                                                                                // 1
}, 6);                                                                                                               // 1
var _Layout = Layout,                                                                                                //
    Content = _Layout.Content;                                                                                       //
var confirm = Modal.confirm;                                                                                         // 9
var error = Modal.error;                                                                                             // 10
var info = Modal.info;                                                                                               // 11
                                                                                                                     //
var Wrapper = function (_React$Component) {                                                                          //
    (0, _inherits3.default)(Wrapper, _React$Component);                                                              //
                                                                                                                     //
    function Wrapper() {                                                                                             // 14
        (0, _classCallCheck3.default)(this, Wrapper);                                                                // 14
                                                                                                                     //
        var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this));                     // 14
                                                                                                                     //
        Meteor.VideoCallServices.RTCConfiguration = {                                                                // 17
            "iceServers": [{                                                                                         // 17
                urls: 'stun:stun.l.google.com:19302'                                                                 // 17
            }]                                                                                                       // 17
        };                                                                                                           // 17
                                                                                                                     //
        Meteor.VideoCallServices.onError = function (err, data) {                                                    // 18
            switch (err.name) {                                                                                      // 19
                case "NotFoundError":                                                                                // 20
                    error({                                                                                          // 21
                        title: "Could not find webcam",                                                              // 22
                        content: "Please ensure a webcam is connected",                                              // 23
                        okText: "OK"                                                                                 // 24
                    });                                                                                              // 21
                    Meteor.VideoCallServices.endPhoneCall();                                                         // 26
                    break;                                                                                           // 27
                                                                                                                     //
                case "NotAllowedError":                                                                              // 28
                    error({                                                                                          // 29
                        title: "Not allowed error",                                                                  // 30
                        content: "Could not access media device",                                                    // 31
                        okText: "OK"                                                                                 // 32
                    });                                                                                              // 29
                    Meteor.VideoCallServices.endPhoneCall();                                                         // 34
                    break;                                                                                           // 35
                                                                                                                     //
                case "NotReadableError":                                                                             // 36
                    error({                                                                                          // 37
                        title: "Hardware error",                                                                     // 38
                        content: "Could not access your device.",                                                    // 39
                        okText: "OK"                                                                                 // 40
                    });                                                                                              // 37
                    Meteor.VideoCallServices.endPhoneCall();                                                         // 42
                    break;                                                                                           // 43
                                                                                                                     //
                case "SecurityError":                                                                                // 44
                    error({                                                                                          // 45
                        title: "Security error",                                                                     // 46
                        content: "Media support is disabled in this browser.",                                       // 47
                        okText: "OK"                                                                                 // 48
                    });                                                                                              // 45
                    Meteor.VideoCallServices.endPhoneCall();                                                         // 50
                    break;                                                                                           // 51
                                                                                                                     //
                default:                                                                                             // 52
                    console.log(err, data);                                                                          // 53
            }                                                                                                        // 19
        };                                                                                                           // 55
                                                                                                                     //
        Meteor.VideoCallServices.onReceivePhoneCall = function (_id) {                                               // 56
            _this.setState({                                                                                         // 57
                showChat: _id                                                                                        // 58
            });                                                                                                      // 57
                                                                                                                     //
            var _this$refs = _this.refs,                                                                             // 56
                caller = _this$refs.caller,                                                                          // 56
                target = _this$refs.target;                                                                          // 56
            confirm({                                                                                                // 61
                title: 'You are receiving a phone call',                                                             // 62
                onOk: function () {                                                                                  // 63
                    Meteor.VideoCallServices.answerPhoneCall(caller, target);                                        // 64
                },                                                                                                   // 65
                okText: "Answer",                                                                                    // 66
                cancelText: "Ignore",                                                                                // 67
                onCancel: function () {                                                                              // 68
                    Meteor.VideoCallServices.endPhoneCall();                                                         // 69
                }                                                                                                    // 70
            });                                                                                                      // 61
        };                                                                                                           // 72
                                                                                                                     //
        Meteor.VideoCallServices.onTerminateCall = function () {                                                     // 73
            Modal.info({                                                                                             // 74
                title: "Call ended",                                                                                 // 75
                okText: "OK"                                                                                         // 76
            });                                                                                                      // 74
        };                                                                                                           // 78
                                                                                                                     //
        _this.state = {                                                                                              // 79
            showChat: false                                                                                          // 80
        };                                                                                                           // 79
        return _this;                                                                                                // 14
    }                                                                                                                // 82
                                                                                                                     //
    Wrapper.prototype.callUser = function () {                                                                       //
        function callUser(showChat) {                                                                                //
            var user = Meteor.users.findOne({                                                                        // 84
                _id: showChat                                                                                        // 85
            });                                                                                                      // 84
            if (!user || !user.status.online) throw new Meteor.Error(500, "user offline");                           // 87
            this.setState({                                                                                          // 89
                showChat: showChat                                                                                   // 90
            });                                                                                                      // 89
            Meteor.VideoCallServices.call(showChat, this.refs.caller, this.refs.target);                             // 92
        }                                                                                                            // 93
                                                                                                                     //
        return callUser;                                                                                             //
    }();                                                                                                             //
                                                                                                                     //
    Wrapper.prototype.render = function () {                                                                         //
        function render() {                                                                                          //
            var WrapperContent = this.props.WrapperContent;                                                          // 94
            return React.createElement(                                                                              // 97
                Layout,                                                                                              // 97
                {                                                                                                    // 97
                    className: "layout"                                                                              // 97
                },                                                                                                   // 97
                React.createElement(Header, null),                                                                   // 98
                React.createElement(                                                                                 // 99
                    Content,                                                                                         // 99
                    {                                                                                                // 99
                        style: {                                                                                     // 99
                            padding: '0 50px'                                                                        // 99
                        }                                                                                            // 99
                    },                                                                                               // 99
                    React.createElement(                                                                             // 100
                        Row,                                                                                         // 100
                        {                                                                                            // 100
                            style: {                                                                                 // 100
                                background: '#fff',                                                                  // 100
                                padding: 24,                                                                         // 100
                                minHeight: 280                                                                       // 100
                            }                                                                                        // 100
                        },                                                                                           // 100
                        React.createElement(                                                                         // 101
                            Col,                                                                                     // 101
                            {                                                                                        // 101
                                span: "11"                                                                           // 101
                            },                                                                                       // 101
                            React.createElement(CallUsers, {                                                         // 102
                                callUser: this.callUser.bind(this)                                                   // 102
                            })                                                                                       // 102
                        ),                                                                                           // 101
                        React.createElement(Col, {                                                                   // 104
                            span: "2"                                                                                // 104
                        }),                                                                                          // 104
                        React.createElement(                                                                         // 105
                            Col,                                                                                     // 105
                            {                                                                                        // 105
                                span: "11"                                                                           // 105
                            },                                                                                       // 105
                            React.createElement(                                                                     // 106
                                Card,                                                                                // 106
                                {                                                                                    // 106
                                    title: "Extension overview"                                                      // 106
                                },                                                                                   // 106
                                React.createElement(                                                                 // 107
                                    Row,                                                                             // 107
                                    null,                                                                            // 107
                                    "Hey there, thanks for taking a look at this project! I really want to make it the best choice for WebRTC video chat in Meteor, so if you find any issues or want to request any features, do so ",
                                    React.createElement(                                                             // 108
                                        "a",                                                                         // 108
                                        {                                                                            // 108
                                            href: "https://github.com/elmarti/meteor-video-chat/issues"              // 108
                                        },                                                                           // 108
                                        "here"                                                                       // 108
                                    ),                                                                               // 108
                                    "."                                                                              // 107
                                ),                                                                                   // 107
                                React.createElement(                                                                 // 110
                                    Row,                                                                             // 110
                                    null,                                                                            // 110
                                    "If you find any bugs or have any suggestions for this template, log an issue ",
                                    React.createElement(                                                             // 111
                                        "a",                                                                         // 111
                                        {                                                                            // 111
                                            href: "https://github.com/elmarti/meteor-video-chat-example"             // 111
                                        },                                                                           // 111
                                        "here"                                                                       // 111
                                    ),                                                                               // 111
                                    "."                                                                              // 110
                                ),                                                                                   // 110
                                React.createElement(                                                                 // 113
                                    Row,                                                                             // 113
                                    null,                                                                            // 113
                                    "To test video calling, you'll need 2 users and 2 browsers. Once you've logged in to both, you will be able to click the user name to dial the other browser."
                                ),                                                                                   // 113
                                React.createElement(                                                                 // 116
                                    "p",                                                                             // 116
                                    null,                                                                            // 116
                                    React.createElement(Icon, {                                                      // 116
                                        style: {                                                                     // 116
                                            color: "blue"                                                            // 116
                                        },                                                                           // 116
                                        type: "user"                                                                 // 116
                                    }),                                                                              // 116
                                    ": never logged in"                                                              // 116
                                ),                                                                                   // 116
                                React.createElement(                                                                 // 117
                                    "p",                                                                             // 117
                                    null,                                                                            // 117
                                    React.createElement(Icon, {                                                      // 117
                                        style: {                                                                     // 117
                                            color: "red"                                                             // 117
                                        },                                                                           // 117
                                        type: "user"                                                                 // 117
                                    }),                                                                              // 117
                                    ": offline"                                                                      // 117
                                ),                                                                                   // 117
                                React.createElement(                                                                 // 118
                                    "p",                                                                             // 118
                                    null,                                                                            // 118
                                    React.createElement(Icon, {                                                      // 118
                                        style: {                                                                     // 118
                                            color: "green"                                                           // 118
                                        },                                                                           // 118
                                        type: "user"                                                                 // 118
                                    }),                                                                              // 118
                                    ": online"                                                                       // 118
                                ),                                                                                   // 118
                                React.createElement(                                                                 // 119
                                    Row,                                                                             // 119
                                    null,                                                                            // 119
                                    "User accounts are automatically deleted every day."                             // 119
                                )                                                                                    // 119
                            )                                                                                        // 106
                        )                                                                                            // 105
                    )                                                                                                // 100
                ),                                                                                                   // 99
                React.createElement(Footer, null),                                                                   // 127
                React.createElement("video", {                                                                       // 128
                    ref: "caller"                                                                                    // 128
                }),                                                                                                  // 128
                React.createElement("video", {                                                                       // 129
                    ref: "target"                                                                                    // 129
                })                                                                                                   // 129
            );                                                                                                       // 97
        }                                                                                                            // 131
                                                                                                                     //
        return render;                                                                                               //
    }();                                                                                                             //
                                                                                                                     //
    return Wrapper;                                                                                                  //
}(React.Component);                                                                                                  //
                                                                                                                     //
module.exportDefault(createContainer(function () {                                                                   // 1
    if (!(Meteor.loggingIn() || Meteor.user())) FlowRouter.go("/login");                                             // 134
    return {};                                                                                                       // 136
}, Wrapper));                                                                                                        // 139
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"index.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/layout/index.js                                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
    Footer: function () {                                                                                            // 1
        return Footer;                                                                                               // 1
    },                                                                                                               // 1
    Header: function () {                                                                                            // 1
        return Header;                                                                                               // 1
    },                                                                                                               // 1
    Wrapper: function () {                                                                                           // 1
        return Wrapper;                                                                                              // 1
    }                                                                                                                // 1
});                                                                                                                  // 1
var Footer = void 0;                                                                                                 // 1
module.watch(require("./components/Footer"), {                                                                       // 1
    "default": function (v) {                                                                                        // 1
        Footer = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Header = void 0;                                                                                                 // 1
module.watch(require("./components/Header"), {                                                                       // 1
    "default": function (v) {                                                                                        // 1
        Header = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Wrapper = void 0;                                                                                                // 1
module.watch(require("./components/Wrapper"), {                                                                      // 1
    "default": function (v) {                                                                                        // 1
        Wrapper = v;                                                                                                 // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"users":{"components":{"CallUsers.jsx":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/users/components/CallUsers.jsx                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
    "default": function (v) {                                                                                        // 1
        React = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var createContainer = void 0;                                                                                        // 1
module.watch(require("meteor/react-meteor-data"), {                                                                  // 1
    createContainer: function (v) {                                                                                  // 1
        createContainer = v;                                                                                         // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
    Meteor: function (v) {                                                                                           // 1
        Meteor = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var User = void 0;                                                                                                   // 1
module.watch(require("../../../lib/collections"), {                                                                  // 1
    User: function (v) {                                                                                             // 1
        User = v;                                                                                                    // 1
    }                                                                                                                // 1
}, 3);                                                                                                               // 1
var Menu = void 0,                                                                                                   // 1
    Icon = void 0,                                                                                                   // 1
    Spin = void 0;                                                                                                   // 1
module.watch(require("antd"), {                                                                                      // 1
    Menu: function (v) {                                                                                             // 1
        Menu = v;                                                                                                    // 1
    },                                                                                                               // 1
    Icon: function (v) {                                                                                             // 1
        Icon = v;                                                                                                    // 1
    },                                                                                                               // 1
    Spin: function (v) {                                                                                             // 1
        Spin = v;                                                                                                    // 1
    }                                                                                                                // 1
}, 4);                                                                                                               // 1
                                                                                                                     //
var CallUsers = function (_React$Component) {                                                                        //
    (0, _inherits3.default)(CallUsers, _React$Component);                                                            //
                                                                                                                     //
    function CallUsers() {                                                                                           // 8
        (0, _classCallCheck3.default)(this, CallUsers);                                                              // 8
        return (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this));                          // 8
    }                                                                                                                // 10
                                                                                                                     //
    CallUsers.prototype.callUser = function () {                                                                     //
        function callUser(_ref) {                                                                                    //
            var key = _ref.key;                                                                                      // 11
            this.props.callUser(key);                                                                                // 12
        }                                                                                                            // 13
                                                                                                                     //
        return callUser;                                                                                             //
    }();                                                                                                             //
                                                                                                                     //
    CallUsers.prototype.render = function () {                                                                       //
        function render() {                                                                                          //
            return React.createElement(                                                                              // 15
                Spin,                                                                                                // 16
                {                                                                                                    // 16
                    spinning: this.props.usersLoading                                                                // 16
                },                                                                                                   // 16
                React.createElement(                                                                                 // 17
                    Menu,                                                                                            // 17
                    {                                                                                                // 17
                        onClick: this.callUser.bind(this)                                                            // 17
                    },                                                                                               // 17
                    this.props.users.map(function (user) {                                                           // 19
                        return React.createElement(                                                                  // 19
                            Menu.Item,                                                                               // 20
                            {                                                                                        // 20
                                key: user._id                                                                        // 20
                            },                                                                                       // 20
                            React.createElement(Icon, {                                                              // 21
                                style: {                                                                             // 21
                                    color: user.status ? user.status.online ? "green" : "red" : "blue"               // 21
                                },                                                                                   // 21
                                type: "user"                                                                         // 22
                            }),                                                                                      // 21
                            user.username                                                                            // 23
                        );                                                                                           // 20
                    })                                                                                               // 19
                )                                                                                                    // 17
            );                                                                                                       // 16
        }                                                                                                            // 30
                                                                                                                     //
        return render;                                                                                               //
    }();                                                                                                             //
                                                                                                                     //
    return CallUsers;                                                                                                //
}(React.Component);                                                                                                  //
                                                                                                                     //
module.exportDefault(createContainer(function () {                                                                   // 1
    var usersLoading = !Meteor.subscribe("all_users").ready();                                                       // 34
    var users = User.find({                                                                                          // 35
        _id: {                                                                                                       // 36
            $ne: Meteor.userId()                                                                                     // 37
        }                                                                                                            // 36
    }).fetch();                                                                                                      // 35
    return {                                                                                                         // 40
        usersLoading: usersLoading,                                                                                  // 41
        users: users                                                                                                 // 42
    };                                                                                                               // 40
}, CallUsers));                                                                                                      // 44
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Users.jsx":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/users/components/Users.jsx                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
module.export({                                                                                                      // 1
    "default": function () {                                                                                         // 1
        return Users;                                                                                                // 1
    }                                                                                                                // 1
});                                                                                                                  // 1
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
    "default": function (v) {                                                                                        // 1
        React = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
    Meteor: function (v) {                                                                                           // 1
        Meteor = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var createContainer = void 0;                                                                                        // 1
module.watch(require("meteor/react-meteor-data"), {                                                                  // 1
    createContainer: function (v) {                                                                                  // 1
        createContainer = v;                                                                                         // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var Table = void 0;                                                                                                  // 1
module.watch(require("../../data"), {                                                                                // 1
    Table: function (v) {                                                                                            // 1
        Table = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 3);                                                                                                               // 1
var Icon = void 0,                                                                                                   // 1
    Spin = void 0,                                                                                                   // 1
    Popconfirm = void 0,                                                                                             // 1
    notification = void 0;                                                                                           // 1
module.watch(require("antd"), {                                                                                      // 1
    Icon: function (v) {                                                                                             // 1
        Icon = v;                                                                                                    // 1
    },                                                                                                               // 1
    Spin: function (v) {                                                                                             // 1
        Spin = v;                                                                                                    // 1
    },                                                                                                               // 1
    Popconfirm: function (v) {                                                                                       // 1
        Popconfirm = v;                                                                                              // 1
    },                                                                                                               // 1
    notification: function (v) {                                                                                     // 1
        notification = v;                                                                                            // 1
    }                                                                                                                // 1
}, 4);                                                                                                               // 1
                                                                                                                     //
var Users = function (_React$Component) {                                                                            //
    (0, _inherits3.default)(Users, _React$Component);                                                                //
                                                                                                                     //
    function Users() {                                                                                               // 7
        (0, _classCallCheck3.default)(this, Users);                                                                  // 7
                                                                                                                     //
        var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this));                     // 7
                                                                                                                     //
        _this.state = {                                                                                              // 9
            search: "",                                                                                              // 10
            submitClicked: ""                                                                                        // 11
        };                                                                                                           // 9
        _this.columns = [{                                                                                           // 14
            title: 'Email',                                                                                          // 15
            dataIndex: 'email',                                                                                      // 16
            key: 'email'                                                                                             // 17
        }, {                                                                                                         // 14
            title: 'Created',                                                                                        // 19
            dataIndex: 'createdAt',                                                                                  // 20
            key: 'createdAt'                                                                                         // 21
        }, {                                                                                                         // 18
            title: 'Roles',                                                                                          // 23
            dataIndex: 'roles',                                                                                      // 24
            key: 'roles'                                                                                             // 25
        }, {                                                                                                         // 22
            title: 'Actions',                                                                                        // 27
            key: 'actions',                                                                                          // 28
            render: function (data) {                                                                                // 29
                return React.createElement(                                                                          // 30
                    Spin,                                                                                            // 31
                    {                                                                                                // 31
                        spinning: data.key === _this.state.submitClicked                                             // 31
                    },                                                                                               // 31
                    data.verified ? React.createElement(                                                             // 32
                        Popconfirm,                                                                                  // 33
                        {                                                                                            // 33
                            onConfirm: _this.toggleVerification.bind(_this, data.key),                               // 33
                            title: "Are you sure you want to unverify this user?",                                   // 33
                            okText: "Yes",                                                                           // 33
                            cancelText: "No"                                                                         // 33
                        },                                                                                           // 33
                        React.createElement(                                                                         // 33
                            "a",                                                                                     // 33
                            null,                                                                                    // 33
                            "Unverify"                                                                               // 33
                        )                                                                                            // 33
                    ) : React.createElement(                                                                         // 33
                        Popconfirm,                                                                                  // 34
                        {                                                                                            // 34
                            onConfirm: _this.toggleVerification.bind(_this, data.key),                               // 34
                            title: "Are you sure you want to verify this user?",                                     // 34
                            okText: "Yes",                                                                           // 34
                            cancelText: "No"                                                                         // 34
                        },                                                                                           // 34
                        React.createElement(                                                                         // 34
                            "a",                                                                                     // 34
                            null,                                                                                    // 34
                            "Verify"                                                                                 // 34
                        )                                                                                            // 34
                    ),                                                                                               // 34
                    React.createElement("span", {                                                                    // 36
                        className: "ant-divider"                                                                     // 36
                    }),                                                                                              // 36
                    React.createElement(                                                                             // 37
                        Popconfirm,                                                                                  // 37
                        {                                                                                            // 37
                            onConfirm: _this.deleteUser.bind(_this, data.key),                                       // 37
                            title: "Are you sure you want to delete this user?",                                     // 37
                            okText: "Yes",                                                                           // 37
                            cancelText: "No"                                                                         // 37
                        },                                                                                           // 37
                        " ",                                                                                         // 37
                        React.createElement(                                                                         // 37
                            "a",                                                                                     // 37
                            {                                                                                        // 37
                                href: "#"                                                                            // 37
                            },                                                                                       // 37
                            "Delete"                                                                                 // 37
                        )                                                                                            // 37
                    )                                                                                                // 37
                );                                                                                                   // 31
            }                                                                                                        // 40
        }];                                                                                                          // 26
        return _this;                                                                                                // 7
    }                                                                                                                // 43
                                                                                                                     //
    Users.prototype.deleteUser = function () {                                                                       //
        function deleteUser(key) {                                                                                   //
            var _this2 = this;                                                                                       // 44
                                                                                                                     //
            this.setState({                                                                                          // 45
                submitClicked: key                                                                                   // 46
            });                                                                                                      // 45
            Meteor.call("accounts/deleteUser", key, function (err) {                                                 // 48
                _this2.setState({                                                                                    // 49
                    submitClicked: ""                                                                                // 50
                });                                                                                                  // 49
                                                                                                                     //
                if (err) return notification.error(err);else notification.success({                                  // 52
                    message: "Account deleted"                                                                       // 53
                });                                                                                                  // 53
            });                                                                                                      // 54
        }                                                                                                            // 55
                                                                                                                     //
        return deleteUser;                                                                                           //
    }();                                                                                                             //
                                                                                                                     //
    Users.prototype.toggleVerification = function () {                                                               //
        function toggleVerification(key) {                                                                           //
            var _this3 = this;                                                                                       // 56
                                                                                                                     //
            this.setState({                                                                                          // 57
                submitClicked: key                                                                                   // 58
            });                                                                                                      // 57
            Meteor.call("accounts/toggleVerification", key, function (err) {                                         // 60
                _this3.setState({                                                                                    // 61
                    submitClicked: ""                                                                                // 62
                });                                                                                                  // 61
                                                                                                                     //
                if (err) return notification.error(err);else notification.success({                                  // 64
                    message: "Account verified"                                                                      // 65
                });                                                                                                  // 65
            });                                                                                                      // 66
        }                                                                                                            // 67
                                                                                                                     //
        return toggleVerification;                                                                                   //
    }();                                                                                                             //
                                                                                                                     //
    Users.prototype.onSearchChange = function () {                                                                   //
        function onSearchChange(search) {                                                                            //
            this.setState({                                                                                          // 69
                search: search                                                                                       // 70
            });                                                                                                      // 69
        }                                                                                                            // 72
                                                                                                                     //
        return onSearchChange;                                                                                       //
    }();                                                                                                             //
                                                                                                                     //
    Users.prototype.mapTableData = function () {                                                                     //
        function mapTableData() {                                                                                    //
            var search = this.state ? this.state.search : "";                                                        // 74
            var users = Meteor.users.find({                                                                          // 75
                "emails.0.address": {                                                                                // 76
                    $regex: search,                                                                                  // 76
                    $options: "i"                                                                                    // 76
                }                                                                                                    // 76
            }).fetch();                                                                                              // 75
            return users.map(function (user) {                                                                       // 78
                return {                                                                                             // 79
                    key: user._id,                                                                                   // 80
                    email: user.emails[0].address,                                                                   // 81
                    roles: Roles.getRolesForUser(user._id).join(" ,"),                                               // 82
                    verified: user.emails[0].verified,                                                               // 83
                    createdAt: user.profile ? user.profile.createdAt.toDateString() : ""                             // 84
                };                                                                                                   // 79
            });                                                                                                      // 86
        }                                                                                                            // 87
                                                                                                                     //
        return mapTableData;                                                                                         //
    }();                                                                                                             //
                                                                                                                     //
    Users.prototype.render = function () {                                                                           //
        function render() {                                                                                          //
            return React.createElement(Table, {                                                                      // 90
                onSearchChange: this.onSearchChange.bind(this),                                                      // 90
                searchValue: this.state.search,                                                                      // 90
                subscription: "users/list",                                                                          // 90
                columns: this.columns,                                                                               // 90
                mapTableData: this.mapTableData.bind(this)                                                           // 90
            });                                                                                                      // 90
        }                                                                                                            // 91
                                                                                                                     //
        return render;                                                                                               //
    }();                                                                                                             //
                                                                                                                     //
    return Users;                                                                                                    //
}(React.Component);                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"index.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/users/index.js                                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
    Users: function () {                                                                                             // 1
        return Users;                                                                                                // 1
    },                                                                                                               // 1
    CallUsers: function () {                                                                                         // 1
        return CallUsers;                                                                                            // 1
    }                                                                                                                // 1
});                                                                                                                  // 1
var Users = void 0;                                                                                                  // 1
module.watch(require("./components/Users"), {                                                                        // 1
    "default": function (v) {                                                                                        // 1
        Users = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var CallUsers = void 0;                                                                                              // 1
module.watch(require("./components/CallUsers"), {                                                                    // 1
    "default": function (v) {                                                                                        // 1
        CallUsers = v;                                                                                               // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"users.route.jsx":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// modules/users/users.route.jsx                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React = void 0;                                                                                                  // 1
module.watch(require("react"), {                                                                                     // 1
    "default": function (v) {                                                                                        // 1
        React = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var FlowRouter = void 0;                                                                                             // 1
module.watch(require("meteor/kadira:flow-router"), {                                                                 // 1
    FlowRouter: function (v) {                                                                                       // 1
        FlowRouter = v;                                                                                              // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var mount = void 0;                                                                                                  // 1
module.watch(require("react-mounter"), {                                                                             // 1
    mount: function (v) {                                                                                            // 1
        mount = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var Wrapper = void 0;                                                                                                // 1
module.watch(require("../layout"), {                                                                                 // 1
    Wrapper: function (v) {                                                                                          // 1
        Wrapper = v;                                                                                                 // 1
    }                                                                                                                // 1
}, 3);                                                                                                               // 1
var Users = void 0,                                                                                                  // 1
    CallUsers = void 0;                                                                                              // 1
module.watch(require("./"), {                                                                                        // 1
    Users: function (v) {                                                                                            // 1
        Users = v;                                                                                                   // 1
    },                                                                                                               // 1
    CallUsers: function (v) {                                                                                        // 1
        CallUsers = v;                                                                                               // 1
    }                                                                                                                // 1
}, 4);                                                                                                               // 1
FlowRouter.route("/users", {                                                                                         // 6
    name: "users",                                                                                                   // 7
    action: function () {                                                                                            // 8
        mount(Wrapper, {                                                                                             // 9
            WrapperContent: Users                                                                                    // 10
        });                                                                                                          // 9
    }                                                                                                                // 12
});                                                                                                                  // 6
FlowRouter.route("/users_list", {                                                                                    // 14
    name: "users_list",                                                                                              // 15
    action: function () {                                                                                            // 16
        mount(Wrapper, {                                                                                             // 17
            WrapperContent: CallUsers                                                                                // 18
        });                                                                                                          // 17
    }                                                                                                                // 20
});                                                                                                                  // 14
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"server":{"accounts":{"methods.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/accounts/methods.js                                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Accounts = void 0;                                                                                               // 1
module.watch(require("meteor/accounts-base"), {                                                                      // 1
    Accounts: function (v) {                                                                                         // 1
        Accounts = v;                                                                                                // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Check = void 0;                                                                                                  // 1
module.watch(require("meteor/check"), {                                                                              // 1
    Check: function (v) {                                                                                            // 1
        Check = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Roles = void 0;                                                                                                  // 1
module.watch(require("meteor/alanning:roles"), {                                                                     // 1
    Roles: function (v) {                                                                                            // 1
        Roles = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
module.exportDefault({                                                                                               // 1
    /**                                                                                                              // 5
     * Create a new user account                                                                                     //
     * @method create                                                                                                //
     * @param email                                                                                                  //
     * @param password                                                                                               //
     * @returns {String} the generated user _id                                                                      //
     */create: function (values) {                                                                                   //
        check(values, Object);                                                                                       // 13
        check(values.username, String);                                                                              // 14
        check(values.password, String);                                                                              // 15
                                                                                                                     //
        var _id = Accounts.createUser({                                                                              // 16
            username: values.username,                                                                               // 17
            password: values.password                                                                                // 18
        });                                                                                                          // 16
                                                                                                                     //
        Roles.addUsersToRoles(_id, 'user', Roles.GLOBAL_GROUP);                                                      // 20
        return _id;                                                                                                  // 21
    },                                                                                                               // 22
    /**                                                                                                              // 23
     * Send a password reset email                                                                                   //
     * Ensure that SMTP is configured, else emails will be printed to the console                                    //
     * How do I configure SMTP? https://gist.github.com/LeCoupa/9879221                                              //
     * @method sendResetEmao                                                                                         //
     * @param email                                                                                                  //
     * @returns undefined                                                                                            //
     */sendResetEmail: function (email) {                                                                            //
        check(email, String);                                                                                        // 32
        var user = Meteor.users.findOne({                                                                            // 33
            "emails.0.address": email                                                                                // 34
        }); //don't throw error if user not found to avoid username farming                                          // 33
                                                                                                                     //
        if (user) Accounts.sendResetPasswordEmail(user._id, email);                                                  // 37
    },                                                                                                               // 39
    /**                                                                                                              // 40
     * As an admin, toggle a user's account verification                                                             //
     * @method toggleVerification                                                                                    //
     * @param _id                                                                                                    //
     * @returns undefined                                                                                            //
     */toggleVerification: function (_id) {                                                                          //
        check(_id, String);                                                                                          // 47
                                                                                                                     //
        if (Roles.userIsInRole(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP)) {                                      // 48
            var user = Meteor.users.findOne({                                                                        // 49
                _id: _id                                                                                             // 50
            });                                                                                                      // 49
                                                                                                                     //
            if (user) {                                                                                              // 52
                Meteor.users.update({                                                                                // 53
                    _id: _id                                                                                         // 54
                }, {                                                                                                 // 53
                    $set: {                                                                                          // 56
                        "emails.0.verified": !user.emails[0].verified                                                // 57
                    }                                                                                                // 56
                });                                                                                                  // 55
            }                                                                                                        // 60
        } else {                                                                                                     // 61
            throw new Meteor.Error(401, "You are not an admin");                                                     // 62
        }                                                                                                            // 63
    },                                                                                                               // 65
    deleteUser: function (_id) {                                                                                     // 66
        check(_id, String);                                                                                          // 67
                                                                                                                     //
        if (Roles.userIsInRole(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP)) {                                      // 68
            Meteor.users.remove({                                                                                    // 69
                _id: _id                                                                                             // 69
            });                                                                                                      // 69
        }                                                                                                            // 70
    }                                                                                                                // 71
});                                                                                                                  // 4
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"profile":{"methods.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/profile/methods.js                                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Check = void 0;                                                                                                  // 1
module.watch(require("meteor/check"), {                                                                              // 1
    Check: function (v) {                                                                                            // 1
        Check = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Roles = void 0;                                                                                                  // 1
module.watch(require("meteor/alanning:roles"), {                                                                     // 1
    Roles: function (v) {                                                                                            // 1
        Roles = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Comment = void 0;                                                                                                // 1
module.watch(require("../../lib/collections"), {                                                                     // 1
    Comment: function (v) {                                                                                          // 1
        Comment = v;                                                                                                 // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
module.exportDefault({                                                                                               // 1
    /**                                                                                                              // 5
     * Comment on a profile                                                                                          //
     * @method addComment                                                                                            //
     * @param profileId                                                                                              //
     * @param comment                                                                                                //
     * @returns undefined                                                                                            //
     */addComment: function (profileId, comment) {                                                                   //
        console.log(profileId, comment);                                                                             // 13
        check(profileId, String);                                                                                    // 14
        check(comment, String);                                                                                      // 15
        if (!Meteor.user()) throw new Meteor.Error(403, "Could not comment on profile");                             // 16
        Comment.insert({                                                                                             // 18
            receiver: profileId,                                                                                     // 19
            comment: comment,                                                                                        // 20
            sender: Meteor.userId(),                                                                                 // 21
            createdAt: new Date()                                                                                    // 22
        });                                                                                                          // 18
    }                                                                                                                // 24
});                                                                                                                  // 4
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"publications.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/profile/publications.js                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
    Meteor: function (v) {                                                                                           // 1
        Meteor = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Check = void 0;                                                                                                  // 1
module.watch(require("meteor/check"), {                                                                              // 1
    Check: function (v) {                                                                                            // 1
        Check = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Connection = void 0,                                                                                             // 1
    Comment = void 0,                                                                                                // 1
    User = void 0;                                                                                                   // 1
module.watch(require("../../lib/collections"), {                                                                     // 1
    Connection: function (v) {                                                                                       // 1
        Connection = v;                                                                                              // 1
    },                                                                                                               // 1
    Comment: function (v) {                                                                                          // 1
        Comment = v;                                                                                                 // 1
    },                                                                                                               // 1
    User: function (v) {                                                                                             // 1
        User = v;                                                                                                    // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
Meteor.publishComposite("profile", function (_id) {                                                                  // 6
    if (!_id) _id = this.userId;                                                                                     // 7
    check(_id, String);                                                                                              // 9
    return {                                                                                                         // 10
        find: function () {                                                                                          // 11
            return User.find({                                                                                       // 12
                _id: _id                                                                                             // 13
            }, {                                                                                                     // 12
                fields: {                                                                                            // 15
                    username: 1,                                                                                     // 16
                    profile: 1                                                                                       // 17
                }                                                                                                    // 15
            });                                                                                                      // 14
        },                                                                                                           // 20
        children: [{                                                                                                 // 21
            find: function (user) {                                                                                  // 22
                return Connection.find({                                                                             // 23
                    "users.0._id": user._id                                                                          // 24
                });                                                                                                  // 23
            },                                                                                                       // 26
            children: [{                                                                                             // 27
                find: function (connection, user) {                                                                  // 28
                    return Comment.find({                                                                            // 29
                        receiver: _id                                                                                // 30
                    });                                                                                              // 29
                },                                                                                                   // 32
                children: [{                                                                                         // 33
                    find: function (comment, connection, user) {                                                     // 34
                        return User.find({                                                                           // 35
                            _id: comment.sender                                                                      // 36
                        });                                                                                          // 35
                    }                                                                                                // 38
                }]                                                                                                   // 33
            }, {                                                                                                     // 27
                find: function (connection, user) {                                                                  // 41
                    //fix this shit                                                                                  // 42
                    var _id = [];                                                                                    // 43
                    connection.users.forEach(function (thisUser) {                                                   // 44
                        return _id.push(thisUser._id);                                                               // 44
                    });                                                                                              // 44
                    return User.find({                                                                               // 45
                        _id: _id                                                                                     // 46
                    });                                                                                              // 45
                }                                                                                                    // 48
            }]                                                                                                       // 40
        }]                                                                                                           // 21
    };                                                                                                               // 10
});                                                                                                                  // 53
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"users":{"publications.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/users/publications.js                                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
    Meteor: function (v) {                                                                                           // 1
        Meteor = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Roles = void 0;                                                                                                  // 1
module.watch(require("meteor/alanning:roles"), {                                                                     // 1
    Roles: function (v) {                                                                                            // 1
        Roles = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var tablePublish = void 0;                                                                                           // 1
module.watch(require("../helpers"), {                                                                                // 1
    tablePublish: function (v) {                                                                                     // 1
        tablePublish = v;                                                                                            // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var User = void 0;                                                                                                   // 1
module.watch(require("../../lib/collections"), {                                                                     // 1
    User: function (v) {                                                                                             // 1
        User = v;                                                                                                    // 1
    }                                                                                                                // 1
}, 3);                                                                                                               // 1
tablePublish('users/list', 'User', {}, {                                                                             // 5
    fields: {                                                                                                        // 6
        "profile.createdAt": 1,                                                                                      // 7
        _id: 1,                                                                                                      // 8
        username: 1,                                                                                                 // 9
        roles: 1,                                                                                                    // 10
        profile: 1                                                                                                   // 11
    }                                                                                                                // 6
}, 'admin');                                                                                                         // 5
Meteor.publish("all_users", function () {                                                                            // 14
    return User.find({}, {                                                                                           // 15
        fields: {                                                                                                    // 16
            username: 1,                                                                                             // 17
            _id: 1,                                                                                                  // 18
            status: 1                                                                                                // 19
        }                                                                                                            // 16
    });                                                                                                              // 15
});                                                                                                                  // 22
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"helpers.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/helpers.js                                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({                                                                                                      // 1
    tablePublish: function () {                                                                                      // 1
        return tablePublish;                                                                                         // 1
    }                                                                                                                // 1
});                                                                                                                  // 1
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
    Meteor: function (v) {                                                                                           // 1
        Meteor = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var Counts = void 0;                                                                                                 // 1
module.watch(require("meteor/tmeasday:publish-counts"), {                                                            // 1
    Counts: function (v) {                                                                                           // 1
        Counts = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var Roles = void 0;                                                                                                  // 1
module.watch(require("meteor/alanning:roles"), {                                                                     // 1
    Roles: function (v) {                                                                                            // 1
        Roles = v;                                                                                                   // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
var Collections = void 0;                                                                                            // 1
module.watch(require("../lib/collections"), {                                                                        // 1
    "default": function (v) {                                                                                        // 1
        Collections = v;                                                                                             // 1
    }                                                                                                                // 1
}, 3);                                                                                                               // 1
                                                                                                                     //
var tablePublish = function (name, collection, query, projection, role) {                                            // 5
    Meteor.publish(name, function (start, search) {                                                                  // 7
        if (!role || Roles.userIsInRole(this.userId, role, Roles.GLOBAL_GROUP)) {                                    // 8
            projection.skip = start * 10;                                                                            // 9
            projection.limit = projection.skip + 10;                                                                 // 10
            query["emails.0.address"] = {                                                                            // 11
                $regex: search,                                                                                      // 11
                $options: "i"                                                                                        // 11
            };                                                                                                       // 11
            return Collections[collection].find(query, projection);                                                  // 12
        } else return this.ready();                                                                                  // 13
    });                                                                                                              // 15
    Meteor.publish(name + ".counts", function () {                                                                   // 16
        if (!role || Roles.userIsInRole(this.userId, role, Roles.GLOBAL_GROUP)) return Counts.publish(this, collection + ".count", Collections[collection].find(query));else return this.ready();
    });                                                                                                              // 20
};                                                                                                                   // 21
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"methods.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/methods.js                                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var Meteor = void 0;                                                                                                 // 1
module.watch(require("meteor/meteor"), {                                                                             // 1
    Meteor: function (v) {                                                                                           // 1
        Meteor = v;                                                                                                  // 1
    }                                                                                                                // 1
}, 0);                                                                                                               // 1
var accounts = void 0;                                                                                               // 1
module.watch(require("./accounts/methods"), {                                                                        // 1
    "default": function (v) {                                                                                        // 1
        accounts = v;                                                                                                // 1
    }                                                                                                                // 1
}, 1);                                                                                                               // 1
var profile = void 0;                                                                                                // 1
module.watch(require("./profile/methods"), {                                                                         // 1
    "default": function (v) {                                                                                        // 1
        profile = v;                                                                                                 // 1
    }                                                                                                                // 1
}, 2);                                                                                                               // 1
//Accounts                                                                                                           // 4
Meteor.methods({                                                                                                     // 5
    'accounts/create': accounts.create,                                                                              // 6
    'accounts/sendResetEmail': accounts.sendResetEmail,                                                              // 7
    'accounts/toggleVerification': accounts.toggleVerification,                                                      // 8
    'accounts/deleteUser': accounts.deleteUser                                                                       // 9
}); //Profile                                                                                                        // 5
                                                                                                                     //
Meteor.methods({                                                                                                     // 12
    "profile/addComment": profile.addComment                                                                         // 13
});                                                                                                                  // 12
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"startup.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/startup.js                                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// import { Meteor } from 'meteor/meteor';                                                                           // 1
// import { Accounts } from 'meteor/accounts-base';                                                                  // 2
// import { Roles } from 'meteor/alanning:roles';                                                                    // 3
// import { Random } from 'meteor/random';                                                                           // 4
//                                                                                                                   // 5
Meteor.startup(function () {                                                                                         // 6
    Accounts.onCreateUser(function (options, user) {                                                                 // 7
        user["profile"] = {                                                                                          // 8
            createdAt: new Date()                                                                                    // 9
        };                                                                                                           // 8
        return user;                                                                                                 // 11
    });                                                                                                              // 12
    console.log('running data init');                                                                                // 13
                                                                                                                     //
    if (!Meteor.users.findOne()) {                                                                                   // 14
        console.log('No users found, creating admin');                                                               // 15
        var userId = Accounts.createUser({                                                                           // 16
            username: 'admin',                                                                                       // 17
            password: 'password'                                                                                     // 18
        });                                                                                                          // 16
        console.log('Admin user created, _id: %s', userId);                                                          // 20
        Roles.addUsersToRoles(userId, ['admin', 'user'], Roles.GLOBAL_GROUP);                                        // 21
    }                                                                                                                // 22
                                                                                                                     //
    Accounts.urls.resetPassword = function (token) {                                                                 // 23
        return Meteor.absoluteUrl("reset-password/" + token);                                                        // 24
    };                                                                                                               // 25
});                                                                                                                  // 26
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".jsx"
  ]
});
require("./lib/collections/comment.js");
require("./lib/collections/connection.js");
require("./lib/collections/index.js");
require("./lib/collections/user.js");
require("./modules/account/components/AccountForm.jsx");
require("./modules/account/components/Login.jsx");
require("./modules/account/components/Preferences.jsx");
require("./modules/account/components/Register.jsx");
require("./modules/dashboard/components/Admin.jsx");
require("./modules/dashboard/components/Dashboard.jsx");
require("./modules/dashboard/components/User.jsx");
require("./modules/data/components/Table.jsx");
require("./modules/layout/components/Footer.jsx");
require("./modules/layout/components/Header.jsx");
require("./modules/layout/components/Wrapper.jsx");
require("./modules/users/components/CallUsers.jsx");
require("./modules/users/components/Users.jsx");
require("./modules/account/account.route.jsx");
require("./modules/account/index.js");
require("./modules/dashboard/dashboard.route.jsx");
require("./modules/dashboard/index.js");
require("./modules/data/index.js");
require("./modules/layout/index.js");
require("./modules/users/index.js");
require("./modules/users/users.route.jsx");
require("./server/accounts/methods.js");
require("./server/profile/methods.js");
require("./server/profile/publications.js");
require("./server/users/publications.js");
require("./server/helpers.js");
require("./server/methods.js");
require("./server/startup.js");
//# sourceMappingURL=app.js.map
