let money = 50000;
	income = 'home';
	addExpenses = 'taxi, school, food, clothes';
	deposit = true;
	mission = 500000;
	period = 8;
	budgetDay = money / 30;
	
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log('За период ' + period + ' месяцев цель заработать ' + mission + ' рублей!');
console.log(addExpenses.toUpperCase());
console.log(addExpenses.split(' '));
console.log(budgetDay);
console.log(money % 30);

let num = 266219;
	res = 1;
num.toString().split('').forEach(function(el) {
	res *= el;
});
console.log(res);

let result = res ** 3;
console.log(result);

let str = result.toString();
console.log(str.substring(0, 2));