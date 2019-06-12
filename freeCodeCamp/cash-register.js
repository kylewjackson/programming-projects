function checkCashRegister(price, cash, cid) {
  //floating point conversion, and array sorting
  price = Number.parseFloat((price * 100).toFixed(2));
  cash = Number.parseFloat((cash * 100).toFixed(2));
  cid.forEach(x => {
    x[1] = Number.parseFloat((x[1] * 100).toFixed(2))
  });
  cid.reverse();

  //setting up parameters
  let change = cash - price;
  let chart = {
    'PENNY': 1,
    'NICKEL': 5,
    'DIME': 10,
    'QUARTER': 25,
    'ONE': 100,
    'FIVE': 500,
    'TEN': 1000,
    'TWENTY': 2000,
    'ONE HUNDRED': 10000
  }

  //If there's not enough cid or drawer is closed after transaction
  if (change > Object.values(cid).map(x => x[1]).reduce((x, y) => x + y)) { //not enough
    return {status: "INSUFFICIENT_FUNDS", change: []};
  } else if (change === Object.values(cid).map(x => x[1]).reduce((x, y) => x + y)) { //just enough
    cid.forEach(x => {
    x[1] = Number.parseFloat((x[1] / 100).toFixed(2))
  });
    cid.reverse();
    return {status: "CLOSED", change: cid}
  }

  // making change
  let arr = [];
  while (change > 0) {
    for (let x = 0; x < cid.length; x++) {
      if (cid[x][1] > 0 && change >= chart[cid[x][0]]) {
        change -= chart[cid[x][0]];
        arr.push([cid[x][0], chart[cid[x][0]]]);
        cid[x][1] -= chart[cid[x][0]];
        break;
      }
    }
  }

  //didn't have correct change
  if (change > 0) {
    return {status: "INSUFFICIENT_FUNDS", change: []};
  }

  //bills and coins used
  let multiples = {};
  for (let i = 0; i < arr.length; i++) {
    multiples[arr[i][0]] = multiples[arr[i][0]] ? multiples[arr[i][0]] + 1 : 1;
  }
  console.log(multiples['TWENTY']);

  //final change given in array
  let finalArr = [];
  for (let x = 0; x < arr.length; x++) {
    console.log(`Round ${x + 1}: ${arr[x]} and ${arr[x+1]}`);
    if (x === arr.length - 1) {
      finalArr.push([arr[x][0], Number.parseFloat((arr[x][1] * multiples[arr[x][0]] / 100).toFixed(2))]);
      break;
    }
    if (arr[x][0] !== arr[x+1][0]) {
      console.log(true);
      finalArr.push([arr[x][0], Number.parseFloat((arr[x][1] * multiples[arr[x][0]] / 100).toFixed(2))]);
    }
  }
  let result = {status: "OPEN", change: finalArr};

  // Here is your change, ma'am.
  return result;
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);