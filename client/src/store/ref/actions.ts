// Действия с хранилищем Vuex
export enum act {
    // Действия с сокетом
    ON_USER_CONNECTED = 'ON_USER_CONNECTED', // Пользователь присоединился

    // Пользователи

    EMIT_ADD_USER = 'EMIT_ADD_USER', // Создание пользователя
    ON_ADD_USER = 'ON_ADD_USER',

    EMIT_EDIT_USER = 'EMIT_EDIT_USER', // Изменение пользователя
    ON_EDIT_USER = 'ON_EDIT_USER',

    // Доски

    EMIT_ADD_BOARD = 'EMIT_ADD_BOARD', // Создание доски
    ON_ADD_BOARD = 'ON_ADD_BOARD',

    EMIT_GET_ALL_BOARD = 'EMIT_GET_ALL_BOARD', // Получение всех досок
    ON_GET_ALL_BOARD = 'ON_GET_ALL_BOARD',
}
