const fs = require('fs');

let s4 = fs.readFileSync('temp_script_4.txt', 'utf8');

// Strip script tags
s4 = s4.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '');

// Create a simulated browser context to execute the TanStack router hydration script safely!
const vm = require('vm');

const context = {
  self: {},
  document: {
    readyState: 'complete',
    addEventListener: () => {},
    currentScript: { remove: () => {} }
  },
  $_TSR: {}
};
context.self = context;

vm.createContext(context);
vm.runInContext(s4, context);

console.log('Context router matches count:', context.$_TSR?.router?.matches?.length);
const matches = context.$_TSR?.router?.matches || [];
let promptsData = null;
for (const m of matches) {
  if (m.l && m.l.initialPrompts) {
    promptsData = m.l.initialPrompts;
    break;
  }
}

if (promptsData) {
  console.log('Found initialPrompts! Items count:', promptsData.items?.length);
  console.log('Total items in catalogue:', promptsData.total || promptsData.items?.length);
  if (promptsData.items?.length > 0) {
    console.log('Sample item 0:', JSON.stringify(promptsData.items[0], null, 2));
  }
  fs.writeFileSync('extracted_prompts_initial.json', JSON.stringify(promptsData, null, 2));
} else {
  console.log('initialPrompts not found in matches directly, exploring context:');
  console.log(Object.keys(context));
}
