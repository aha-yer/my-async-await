/*
 * @Author: yer
 * @Date: 2023-01-16 15:58:49
 * @LastEditors: yer
 * @LastEditTime: 2023-01-16 16:00:24
 * @FilePath: /my-async-await/my-async-await.js
 * @Description:
 *
 * Copyright (c) 2023 by yer yerb993@gmail.com, All Rights Reserved.
 */
function step(generator) {
  const gen = generator();
  // 由于其传值，返回步骤交错的特性，记录上一次 yield 传过来的值，在下一个 next 返回过去
  let lastValue;
  // 包裹为 Promise，并执行表达式
  return () =>
    Promise.resolve(gen.next(lastValue).value).then((value) => {
      lastValue = value;
      return lastValue;
    });
}

const timeOut = (time = 0) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time + 200);
    }, time);
  });

function* main() {
  const result1 = yield timeOut(200);
  console.log(result1);
  const result2 = yield timeOut(result1);
  console.log(result2);
  const result3 = yield timeOut(result2);
  console.log(result3);
}

const run = step(main);

function recursive(promise) {
  promise().then((result) => {
    if (result) {
      recursive(promise);
    }
  });
}

recursive(run);
