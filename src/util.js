export function calDistance(start, end) {
  const d1 = 0.01745329251994329;
  const d2 = d1 * start[0];
  const d3 = d1 * start[1];
  const d4 = d1 * end[0];
  const d5 = d1 * end[1];
  const d6 = Math.sin(d2);
  const d7 = Math.sin(d3);
  const d8 = Math.cos(d2);
  const d9 = Math.cos(d3);
  const d10 = Math.sin(d4);
  const d11 = Math.sin(d5);
  const d12 = Math.cos(d4);
  const d13 = Math.cos(d5);
  const arr1 = [];
  const arr2 = [];
  arr1.push(d9 * d8);
  arr1.push(d9 * d6);
  arr1.push(d7);
  arr2.push(d13 * d12);
  arr2.push(d13 * d10);
  arr2.push(d11);
  const d14 = Math.sqrt(
    (arr1[0] - arr2[0]) * (arr1[0] - arr2[0]) +
      (arr1[1] - arr2[1]) * (arr1[1] - arr2[1]) +
      (arr1[2] - arr2[2]) * (arr1[2] - arr2[2])
  );
  return Math.asin(d14 / 2.0) * 12742001.579854401;
}
