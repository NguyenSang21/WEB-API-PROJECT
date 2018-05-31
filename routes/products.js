var express = require('express');
var router = express.Router();
var product = require('../controllers/products.js');
var type = require('../controllers/type.js');
var user = require('../controllers/user.js');

var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tasmanianDevil123';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    next(null, jwt_payload)
    // usually this would be a database call:
    // var user = users[_.findIndex(users, {id: jwt_payload.id})];
    // if (user) {
    //     next(null, user);
    // } else {
    //     next(null, false);
    // }
});

passport.use(strategy);





    // Create a new Note
    router.post('/products', passport.authenticate('jwt', { session: false }), product.create);

    // Retrieve all products
    router.get("/products", product.findAll);

    // Retrieve a single Note with noteId
    //router.get('/celebrities/:celebritiesId', celebrities.findOne);

    // Update a Note with noteId
    router.put('/products', passport.authenticate('jwt', { session: false }), product.update);

    // Delete a Note with noteId
    router.delete('/products/:productId', passport.authenticate('jwt', { session: false }), product.delete);

    // tìm kiếm 1 sản phẩm

    router.get('/products/:productId', product.findOneProduct);
    
    //tìm kiếm hãng sản xuất
    router.get('/hsx', product.findProductHSX);

    //tìm kiếm 1 hãng sản xuất theo tên
    router.get('/products/hsx/:nameHSX', product.findOneProductHSX);

    //tìm kiếm 1 mức giá từ giá bắt đầu -> giá kết thúc
    router.get('/products/gia/:giabd/:giakt', product.findOneProductGia);

    //tìm kiếm sản phẩm theo id loại
    router.get('/products/type/:typeId', product.findOneProductType);
    // phân trang
    router.get('/products/page/:pageId', product.findPageProduct);
    // Số lượng trang
    router.get('/products/numberPage/', product.findNumberPageProduct);
/////////////////////////////////////////Loại máy/////////////////////////
    // Create a new Note
    router.post('/type', passport.authenticate('jwt', { session: false }), type.create);

    // Retrieve all products
    router.get('/type', type.findAll);

    // Update a Note with noteId
    router.put('/type', passport.authenticate('jwt', { session: false }), type.update);

    // Delete a Note with noteId
    router.delete('/type/:typeId', passport.authenticate('jwt', { session: false }), type.delete);

    // tìm kiếm 1 type

    router.get('/type/:typeId', type.findOneType);


///////////////////////////////////Người dùng////////////////////////////////
    // Create a new Note
    router.post('/user', user.create);

    // Retrieve all products
    router.get('/user', user.findAll);

    // Update a Note with noteId
    router.put('/user', passport.authenticate('jwt', { session: false }), user.update);

    // Delete a Note with noteId
    router.delete('/user/:userId', passport.authenticate('jwt', { session: false }), user.delete);

    // tìm theo id
    router.get('/user/:userId', user.findOneUserId);
    // tìm kiếm 1 người dùng có username

    router.get('/user/:username', user.findOneUsername);


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
module.exports = router;