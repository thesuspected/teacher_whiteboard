export interface MongoDB {
    // Пользователи
    users: User[]
    // Доски
    boards: Board[]
}

export interface User {
    _id?: string
    name: string // Имя, фамилия, псевдоним
    color: string // Цвет пользователя
    canvas: string // Холст
}

export interface Board {
    _id?: string
    name: string // Название доски
    description: string // Краткое описание
    subject_id: number // Тематика
    is_private: boolean // Приватная ли доска?
    password: string // Пароль
    owner: User // Владелец
    members: User[] // Участники
}

export interface MainState {
    me: User
    currentBoard: Board
    allBoards: Board[]
}

export interface Ctx {
    commit: Function
    dispatch: Function
    getters: Function
}
