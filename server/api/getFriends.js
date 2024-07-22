export default defineEventHandler(() => {
    return fetch('https://mx.tnxg.top/api/v2/links?page=1&size=50')
        .then((response) => response.json())
        .then((data) => {
            return data.data;
        });
});