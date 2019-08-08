var inputs = [124, 48, 268];
var tips = [];

function tipCalculator(bill) {
  if (bill < 50) {
    return bill * 0.2
  } else if (bill > 50 && bill < 200) {
    return bill * 0.15
  } else if (bill > 200) {
    return bill * 0.1
  }
}

for (var i = 0; i < inputs.length; i++) {
  tip = tipCalculator(inputs[i]);
  tips.push(tip.toFixed(2));
  finalbills.push((tip+inputs[i]).toFixed(2));
}

console.log(tips);
console.log(finalbills);