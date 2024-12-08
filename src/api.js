// import axios from 'axios';
//
// const api = axios.create({
//     baseURL: 'http://localhost:3001/api/v1', // Замените на ваш URL API
// });
//
// // Добавление интерсептора для добавления токена
// api.interceptors.request.use(
//     config => {
//         const token = localStorage.getItem('accessToken'); // Получите токен из localStorage или другого источника
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`; // Добавьте токен в заголовок
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );
//
// export default api;
