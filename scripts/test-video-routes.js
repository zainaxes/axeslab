const https = require('https');

https.get('https://meez.design/web/media/preview_videos/creative-studio.mp4', res => {
  console.log('Status of /web/media/preview_videos/creative-studio.mp4:', res.statusCode);
});

https.get('https://meez.design/web/prompt-previews/creative-studio-preview.mp4', res => {
  console.log('Status of /web/prompt-previews/creative-studio-preview.mp4:', res.statusCode);
});
