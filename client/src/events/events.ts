import Vue from 'vue'

// Проводник для кастомных ивентов
export default new Vue()

// Enum хранилище событий
export enum EventNames {
    ON_CANVAS_SAVE = 'ON_CANVAS_SAVE', // Событие сохранения холста
    ON_GET_BOARDS = 'ON_GET_BOARDS', // Событие получения досок
    ON_USER_EDIT = 'ON_USER_EDIT', // Событие получения изменения пользователя
}
