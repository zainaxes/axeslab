const { spawn } = require("child_process");

function start() {
  console.log("[Runner] Starting Next.js production server on port 3000...");
  const child = spawn("npx.cmd", ["next", "start", "-p", "3000"], {
    stdio: "inherit",
    shell: true,
  });

  child.on("exit", (code, signal) => {
    console.log(`[Runner] Process exited with code ${code}, signal ${signal}. Restarting in 1s...`);
    setTimeout(start, 1000);
  });
}

start();
