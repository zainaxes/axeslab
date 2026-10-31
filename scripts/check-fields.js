const fs = require('fs');

const data = JSON.parse(fs.readFileSync('extracted_prompts_initial.json', 'utf8'));
console.log('Total items:', data.items.length);

const freePrompts = data.items.filter(i => i.canView === true || i.accessLevel === 'free');
console.log('Free / viewable items:', freePrompts.length);
if (freePrompts.length > 0) {
  console.log('Sample free item:', JSON.stringify(freePrompts[0], null, 2));
}

// Check viewer.freePromptIds
const sampleWithPromptText = data.items.find(i => i.prompt || i.content || i.promptText);
console.log('Sample with prompt property:', sampleWithPromptText ? Object.keys(sampleWithPromptText) : 'None in list');
