import https from 'https';

const queries = [
  'grilled chicken breast menu',
  'steak broccoli',
  'beef salad plate',
  'grilled salmon dish',
  'apple juice glass',
  'orange juice glass',
  'pineapple juice glass',
  'watermelon juice glass',
  'mixed fruit juice',
  'celery juice',
  'carrot juice',
  'combo meal healthy',
  'meal prep containers box',
  'diet meal prep'
];

async function fetchImage(q) {
  return new Promise((resolve) => {
    https.get(`https://unsplash.com/napi/search/photos?query=${encodeURI(q)}&per_page=1`, {
      headers: { 'User-Agent': 'Node/scripts' }
    }, (res) => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        try {
          const d = JSON.parse(raw);
          if (d && d.results && d.results.length > 0) {
            resolve(`${q}: ${d.results[0].id}`);
          } else {
            resolve(`${q}: NO_IMAGE`);
          }
        } catch(e) { resolve(`${q}: ERROR ${e.message}`) }
      });
    });
  });
}

async function run() {
  for (const q of queries) {
    const res = await fetchImage(q);
    console.log(res);
  }
}

run();
