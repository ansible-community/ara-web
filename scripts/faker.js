const results = [];
for (let i = 0; i < 200; i++) {
  const random = Math.random();
  if (random < 0.001) {
    results.push({
      id: `${i}`,
      status: "changed",
      duration: 55
    });
  } else if (random < 0.01) {
    results.push({
      id: `${i}`,
      status: "skipped",
      duration: 20
    });
  } else if (random < 0.02) {
    results.push({
      id: `${i}`,
      status: "changed",
      duration: 20
    });
  } else {
    results.push({
      id: `${i}`,
      status: "ok",
      duration: Math.random() * 20 + 20
    });
  }
}
results.push({
  id: "200",
  status: "failed",
  duration: Math.random() * 20 + 20
});
console.log(results);
