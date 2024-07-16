const headers = {
    'Authorization': `Bearer ${process.env.HA_TOKEN}`,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Content-Type': 'application/json'
};
const apis = ['sensor.xiaomiwatch_heartrate', 'sensor.xiaomiwatch_spo2', 'sensor.xiaomiwatch_stress'];
export default defineEventHandler(async () => {
    try {
        const response = await fetch('https://ha.tnxg.top/api/states', {
            method: 'GET',
            headers: headers
        });
        if (!response.ok) {
            console.error(response);
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const filteredEntries = data.filter((entry) => apis.includes(entry.entity_id));
        const result = {};
        filteredEntries.forEach(entry => {
            result[(entry.entity_id).replace('sensor.', '')] = entry;
        });
        return result;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return { error: 'Fetch operation failed' };
    }
});