const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
    email : {type : String},
    routeName : {type : String},
    startPoint : {type : String},
    endPoint : {type : String}
});

module.exports = Post;