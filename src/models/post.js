'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            Post.belongsTo(models.User, {
                foreignKey: 'userId',
                targetKey: 'id',
                as: 'userDataofPost',
            });
            Post.hasMany(models.Comment, {
                foreignKey: 'postId',
                as: 'commentDataofPost',
            });
        }
    }
    Post.init(
        {
            userId: DataTypes.INTEGER,
            content: DataTypes.TEXT('long'),
            status: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Post',
        },
    );
    return Post;
};
