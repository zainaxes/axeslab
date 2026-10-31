const fs = require('fs');

async function testFreeIds() {
  const data = JSON.parse(fs.readFileSync('extracted_prompts_initial.json', 'utf8'));
  const freeIds = [
    "digital-director", "ai-trip-planner", "ai-workflow-agents", "liquid-glass-agency",
    "lumina-footer", "layered-depth", "neuralyn-hero", "no-code-waitlist",
    "rivr-defi-landing", "slam-dunk-hero", "taskly-hero", "price-calculator",
    "scroll-marquee", "rocket-pricing", "velorix-iic", "bloom-ai-hero",
    "datacore-booking-hero", "digitwist-hero", "velorah-hero", "yoga-coach"
  ];

  console.log('Testing all 20 free IDs...');
  const results = [];
  for (const id of freeIds) {
    try {
      const res = await fetch(`https://heydesign.ai/api/design-prompts/${id}`);
      const json = await res.json();
      if (json.code === 0 && json.data?.promptText) {
        console.log(`[OK] ${id}: prompt length ${json.data.promptText.length}`);
        results.push(json.data);
      } else {
        console.log(`[MISSING] ${id}: code ${json.code}`);
      }
    } catch (err) {
      console.error(`[ERR] ${id}: ${err.message}`);
    }
  }

  fs.writeFileSync('free_prompts_detailed.json', JSON.stringify(results, null, 2));
  console.log(`Saved ${results.length} detailed prompts.`);
}

testFreeIds();
