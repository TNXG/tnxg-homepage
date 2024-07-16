export default defineEventHandler(() => {
    return fetch('https://mx.tnxg.top/api/v2/fn/ps/update', {
        method: 'POST',
    }).then((response) => response.json())
        .then((data) => {
            return data;
        });
});