const { spawn } = require("child_process");

const exec = require("child_process").exec;

const main = async () => {
  const data = await new Promise((resolve) => {
    exec("node ./buckets/lambda/k.js", (err, stdout, stderr) => {
      if (err) {
        console.log(err.message, "err");
        return;
      }
      if (stderr) {
        console.log(stderr);
        return;
      }
      resolve(stdout);
    });
  });

  console.log(data, "data");
};

main();

// spawn("node", ["./buckets/lambda/k.js"], {
//   stdio: "inherit",
//   shell: true,
// });
