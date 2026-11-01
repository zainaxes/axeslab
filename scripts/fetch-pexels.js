async function run() {
  try {
    const res = await fetch('https://www.pexels.com/video/vibrant-abstract-tunnel-with-neon-glow-29850449/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    console.log('Status:', res.status, 'HTML length:', html.length);
    
    // Check for mp4 links
    const mp4Regex = /https:\/\/[^"']+\.mp4[^"']*/gi;
    const mp4s = html.match(mp4Regex) || [];
    console.log('MP4 count:', mp4s.length);
    if (mp4s.length > 0) {
      console.log('First MP4:', mp4s[0]);
    }

    // Check for poster or preview image
    const posterRegex = /https:\/\/[^"']+(?:preview|poster|thumb)[^"']*\.(?:jpe?g|webp)/gi;
    const posters = html.match(posterRegex) || [];
    console.log('Poster count:', posters.length);
    if (posters.length > 0) {
      console.log('First poster:', posters[0]);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}
run();
