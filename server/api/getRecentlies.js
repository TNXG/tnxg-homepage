export default defineEventHandler(() => {
    return fetch('https://mx.tnxg.top/api/v2/recently/all')
        .then((response) => response.json())
        .then((data) => {
            return data.data;
        });
});