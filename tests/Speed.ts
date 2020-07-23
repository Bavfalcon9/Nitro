const indexes: number[] = [];
for (let i = 0; i < 3000000; i++) {
     indexes.push(Math.random() * 30000000);
}
function TestLoop(callback: (key: number, index: number) => void): void {
     let iterations: number = 3000000;
     while (iterations > 0) {
          callback(indexes[iterations] || 0, iterations);
          iterations--;
     }
}
function Timings(msg: string, action: (...args: any[]) => void): void {
     let start: number = Date.now();
     action();
     msg = msg.split('{time}').join(`${Date.now() - start}`);
     console.log(msg);
}

let map: Map<any, number> = new Map();
let set: Set<number> = new Set();
let arr: number[] = [];

console.log('\nNow using number as key\n');
Timings('Map key as number took: {time} ms', () => {
     TestLoop((k: number, i: number) => {
          map.set(k, i);
     });
});
Timings('Set as number entries took: {time} ms', () => {
     TestLoop((k: number, i: number) => {
          set.add(i);
     });
});
Timings('Array key as number took: {time} ms', () => {
     TestLoop((k: number, i: number) => {
          arr[k] = i;
     });
});
map = new Map();
set = new Set();
arr = [];
console.log('\nNow using string as key\n');
Timings('Map key as string took: {time} ms', () => {
       TestLoop((k: number, i: number) => {
          map.set(k.toString(), i);
     });   
});
Timings('Array key as string took: {time} ms', () => {
       TestLoop((k: number, i: number) => {
          (arr as any)[k.toString()] = i;
     });   
});