var indexes = [];
let n = 2000000;
while (n > 0) {
  indexes.push(Math.random() * 2000000);
  n--;
}

let looper = (callback) => {
  let n = 2000000;
  while (n > 0) {
    callback(indexes[n], n);
    n--;
  }
};

let timer = (log, callback) => {
  let start = Date.now();
  callback();
  console.log(log, Date.now() - start);
};

let map = new Map();
let obj = {};
let ray = [];

timer(
  "Map int key set took: ",
  () => looper((key, index) => map.set(key, index)),
);
timer("Obj int key set took: ", () => looper((key, index) => obj[key] = index));
timer("ray int key set took: ", () => looper((key, index) => ray[key] = index));
console.log();
timer("Map int key get took: ", () =>
  looper((key, index) => {
    let dummylet = map.get(key);
  }));
timer("Obj int key get took: ", () =>
  looper((key, index) => {
    let dummylet = obj[key];
  }));
timer("ray int key get took: ", () =>
  looper((key, index) => {
    let dummylet = ray[key];
  }));

console.log("\n\n");

map = new Map();
obj = {};
ray = [];

timer(
  "Map string key set took: ",
  () => looper((key, index) => map.set("" + key, "" + index)),
);
timer(
  "Obj string key set took: ",
  () => looper((key, index) => obj["" + key] = "" + index),
);
timer(
  "ray string key set took: ",
  () => looper((key, index) => ray["" + key] = "" + index),
);
console.log();
timer("Map string key get took: ", () =>
  looper((key, index) => {
    let dummylet = map.get("" + key);
  }));
timer("Obj string key get took: ", () =>
  looper((key, index) => {
    let dummylet = obj["" + key];
  }));
timer("ray string key get took: ", () =>
  looper((key, index) => {
    let dummylet = ray["" + key];
  }));