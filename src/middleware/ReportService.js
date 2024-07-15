const endponit = "https://cdn.jsdelivr.net/gh/Innei/reporter-assets@main"

export const getReportMsg = async () => {
    let songInfo = await fetch('https://mx.tnxg.top/api/v2/fn/ps/update', {
        method: 'POST',
    });
    songInfo = await songInfo.json();
    return songInfo
}

export const getAppdesc = async (AppName) => {
    let appdesc = await fetch(`${endponit}/app-desc.json`);
    appdesc = await appdesc.json();
    try {
        return appdesc[AppName]
    } catch (error) {
        return
    };
}