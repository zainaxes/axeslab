const fs = require('fs');

const prompts = JSON.parse(fs.readFileSync('src/lib/generated-prompts.json', 'utf8'));

let withVideo = 0;
let withPoster = 0;
let emptyMedia = 0;
const sampleVideos = [];
const samplePosters = [];

prompts.forEach(p => {
  let meta = {};
  try { meta = JSON.parse(p.metadata_json); } catch {}
  const video = meta.custom_video_url || meta.effectUrl || meta.default_video_url;
  const poster = meta.posterUrl;
  if (video) {
    withVideo++;
    if (sampleVideos.length < 5) sampleVideos.push({ title: p.title, video });
  }
  if (poster) {
    withPoster++;
    if (samplePosters.length < 5) samplePosters.push({ title: p.title, poster });
  }
  if (!video && !poster) emptyMedia++;
});

console.log('Total prompts:', prompts.length);
console.log('Prompts with video in metadata:', withVideo);
console.log('Prompts with poster in metadata:', withPoster);
console.log('Prompts with NO video and NO poster in metadata:', emptyMedia);
console.log('\nSample videos:', sampleVideos);
console.log('\nSample posters:', samplePosters);
