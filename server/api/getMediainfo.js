export default defineEventHandler(async (event) => {
    try {
        const { songName, artist } = getQuery(event);
        const searchkey = `${songName.replace('-天翔TNXG-歌曲-哔哩哔哩视频', '')} - ${artist}`;
        const searchResponse = await fetch(`https://api-ncm.prts.top/search?keywords=${searchkey}`);
        const searchData = await searchResponse.json();
        if (!searchData.result.songs || searchData.result.songs.length === 0) {
            throw new Error('No songs found');
        }
        const songId = searchData.result.songs[0].id;
        const detailResponse = await fetch(`https://api-ncm.prts.top/song/detail?ids=${songId}`);
        const detailData = await detailResponse.json();
        if (!detailData.songs || detailData.songs.length === 0) {
            throw new Error('No song details found');
        }
        const returndata = detailData.songs[0];
        const artistNames = returndata.ar.map((ar) => ar.name).join('/');
        return {
            name: returndata.name,
            artist: artistNames,
            album: returndata.al.name || null,
            image: returndata.al.picUrl || null,
            tns: returndata.tns ? returndata.tns[0] || null : null,
        };
    } catch (error) {
        console.error('Error fetching media info:', error);
        return { error: 'Failed to fetch media info' };
    }
});