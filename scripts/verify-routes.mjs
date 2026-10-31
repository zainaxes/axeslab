const BASE = "http://127.0.0.1:3000";

async function runTests() {
  console.log("=== AXES LAB ROUTE & SPECIFICATION VERIFICATION ===\n");

  const routes = [
    { path: "/", expectContent: "Discover the tools behind AI" },
    { path: "/explore", expectContent: "Explore All Resources" },
    { path: "/web-design", expectContent: "Web Design Prompt Library" },
    { path: "/resource/digital-director", expectContent: "Digital Director" },
    { path: "/resource/relocation-card", expectContent: "Relocation Card" },
    { path: "/prompts", expectContent: "Prompts" },
    { path: "/prompts/image-generation", expectContent: "Image Generation" },
    { path: "/mcp", expectContent: "MCP Servers" },
    { path: "/skills", expectContent: "Agent Skills" },
    { path: "/models", expectContent: "Models & Weights" },
    { path: "/resource/mcp-server-filesystem", expectContent: "Filesystem MCP Server" },
    { path: "/resource/commercial-product-photography-prompt", expectContent: "Commercial Product Photography" },
    { path: "/collections", expectContent: "Curated Collections" },
    { path: "/collections/essential-mcp-servers-local-development", expectContent: "Essential MCP Servers" },
    { path: "/submit", expectContent: "Submit an AI Resource" },
    { path: "/saved", expectContent: "Saved Bookmarks" },
    { path: "/about", expectContent: "About Axes Lab" },
    { path: "/methodology", expectContent: "Curation Methodology" },
    { path: "/licensing", expectContent: "Licensing, Redistribution" },
    { path: "/safety-and-security", expectContent: "Safety, Security" },
    { path: "/contact", expectContent: "Contact" },
    { path: "/changelog", expectContent: "Platform Changelog" },
    { path: "/admin", expectContent: "Catalogue Overview" },
    { path: "/admin/resources", expectContent: "Resource Manager" },
    { path: "/admin/submissions", expectContent: "Community Submissions Queue" },
    { path: "/admin/reports", expectContent: "Issue Reports" },
    { path: "/admin/sources", expectContent: "Source Registry" },
    { path: "/admin/audit-log", expectContent: "Administrative Audit Log" },
    { path: "/robots.txt", expectContent: "User-agent:" },
    { path: "/sitemap.xml", expectContent: "urlset" },
    { path: "/llms.txt", expectContent: "# Axes Lab" },
  ];

  let passed = 0;
  let failed = 0;

  for (const r of routes) {
    try {
      const res = await fetch(`${BASE}${r.path}`);
      const text = await res.text();
      const statusOk = res.status === 200;
      const contentOk = text.toLowerCase().includes(r.expectContent.toLowerCase());

      if (statusOk && contentOk) {
        console.log(`[PASS] ${r.path} -> 200 OK (Contains: "${r.expectContent}")`);
        passed++;
      } else {
        console.error(`[FAIL] ${r.path} -> Status: ${res.status}, Content match: ${contentOk}`);
        failed++;
      }
    } catch (err) {
      console.error(`[ERROR] ${r.path} -> ${err.message}`);
      failed++;
    }
  }

  // Test API search
  try {
    const apiRes = await fetch(`${BASE}/api/public/resources?query=postgres`);
    const data = await apiRes.json();
    if (data.resources && data.resources.length > 0 && data.resources[0].slug.includes("postgres")) {
      console.log(`[PASS] /api/public/resources?query=postgres -> Returned matching records (${data.resources.length} found)`);
      passed++;
    } else {
      console.error(`[FAIL] /api/public/resources -> ${JSON.stringify(data)}`);
      failed++;
    }
  } catch (err) {
    console.error(`[ERROR] API Search -> ${err.message}`);
    failed++;
  }

  // Test Submission POST
  try {
    const subRes = await fetch(`${BASE}/api/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        canonical_url: "https://github.com/example/test-tool",
        resource_type: "tool",
        explanation: "Test submission verification",
        submitter_contact: "qa@axeslab.internal"
      })
    });
    const subData = await subRes.json();
    if (subData.success) {
      console.log(`[PASS] POST /api/submissions -> Successfully created submission: ${subData.id}`);
      passed++;
    } else {
      console.error(`[FAIL] POST /api/submissions -> ${JSON.stringify(subData)}`);
      failed++;
    }
  } catch (err) {
    console.error(`[ERROR] POST /api/submissions -> ${err.message}`);
    failed++;
  }

  console.log(`\n=== SUMMARY: ${passed} passed, ${failed} failed ===`);
}

runTests();
