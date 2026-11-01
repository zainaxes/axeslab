const fpsList = [24, 25, 30, 60];
const dims = ['uhd_3840_2160', 'uhd_2560_1440', 'hd_1920_1080', 'hd_1280_720', 'sd_960_540', 'sd_640_360'];
const urls = [];
for (const d of dims) {
  for (const f of fpsList) {
    urls.push(`https://videos.pexels.com/video-files/27980029/27980029-${d}_${f}fps.mp4`);
  }
}

async function findValid() {
  for (const u of urls) {
    try {
      const res = await fetch(u, { method: 'HEAD' });
      if (res.status === 200) {
        console.log('FOUND PEXELS VIDEO URL:', u);
        return;
      }
    } catch {}
  }
  console.log('None found in standard list, tested ' + urls.length + ' combinations.');
}
findValid();
