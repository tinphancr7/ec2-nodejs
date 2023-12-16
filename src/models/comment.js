'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            Comment.belongsTo(models.User, {
                foreignKey: 'userId',
                targetKey: 'id',
                as: 'userDataofComment',
            });
            Comment.belongsTo(models.Post, {
                foreignKey: 'postId',
                targetKey: 'id',
                as: 'postData',
            });
        }
    }
    Comment.init(
        {
            userId: DataTypes.INTEGER,
            postId: DataTypes.INTEGER,
            content: DataTypes.TEXT('long'),
        },
        {
            sequelize,
            modelName: 'Comment',
        },
    );
    return Comment;
};
