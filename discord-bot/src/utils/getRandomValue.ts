export default (obj: {[key: string]: any}): any =>  {
    // Получаем массив ключей объекта
    const keys = Object.keys(obj);
    // Выбираем случайный ключ из массива
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    // Возвращаем значение объекта по выбранному случайному ключу
    return obj[randomKey];
};