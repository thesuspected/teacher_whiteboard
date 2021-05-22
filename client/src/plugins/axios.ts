import axios from "axios";

/** Базовая конфигурация axios */
export const config = {
    // Базовый URL-адрес api сервера
    baseURL: "localhost:8081",
};

/** Создание экземпляра axios */
const api = axios.create(config);

export default api;
