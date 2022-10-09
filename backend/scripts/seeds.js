//TODO: seeds script should come here, so we'll be able to put some data in our local env
var mongoose = require('mongoose');
var UserModel = require('../models/User');
var ItemModel = require('../models/Item')
var CommentModel = require('../models/Comment')
var User = mongoose.model('User');
var Item = mongoose.model('Item');
var Comment = mongoose.model('Comment');
const { faker } = require('@faker-js/faker');

const MONGODB_URI = "mongodb://localhost:27017";
mongoose.connect(MONGODB_URI);

async function insertRecords(){
	const randomName = faker.internet.userName(); // Rowan Nikolaus
	const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

    var username = randomName;
    var mail = randomEmail;


    var user = new User({
        username: username,
        email: mail,
    });
    await user
        .save().then(console.log).catch(console.error);


    var item = new Item({
        title: faker.random.word(),
        description: 'good stuff',
        image: faker.image.avatar(),
        tagList: 'nice',
    });
    await item
        .save().then(console.log).catch(console.error);


    var comment = new Comment({ body: faker.random.words() });
    await comment
        .save().then(console.log).catch(console.error);
}
let promises = [];
for (let i = 0; i < 100; i++) {
	promises.push(insertRecords());
}

Promise.all(promises).then((res) => mongoose.disconnect());