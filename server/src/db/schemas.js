const mongoose = require("mongoose");
const { Schema } = require("mongoose");
// Схемы
const userScheme = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String, // Имя, фамилия, псевдоним
    color: String, // Цвет пользователя
    canvas: String, // Холст
});

const boardScheme = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String, // Название доски
    description: String, // Краткое описание
    subject_id: Number, // Тематика
    is_private: Boolean, // Приватня ли доска?
    password: String, // Пароль
    owner: { type: Schema.Types.ObjectId, ref: "User" }, // Владелец
    members: [{ type: Schema.Types.ObjectId, ref: "User" }], // Участники
});

module.exports.user = userScheme;
module.exports.board = boardScheme;
