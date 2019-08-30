//УРОК 2

// let money = 50000;
// 	income = 'home';
// 	addExpenses = 'taxi, school, food, clothes';
// 	deposit = true;
// 	mission = 500000;
// 	period = 8;
// 	budgetDay = money / 30;
	
// console.log(typeof money);
// console.log(typeof income);
// console.log(typeof deposit);
// console.log('За период ' + period + ' месяцев цель заработать ' + mission + ' рублей!');
// console.log(addExpenses.toUpperCase());
// console.log(addExpenses.split(' '));
// console.log(budgetDay);
// console.log(money % 30);

// let num = 266219;
// 	res = 1;
// num.toString().split('').forEach(function(el) {
// 	res *= el;
// });
// console.log(res);

// let result = res ** 3;
// console.log(result);

// let str = result.toString();
// console.log(str.substring(0, 2));

//УРОК 3

let money = +prompt('Каков ваш месячный доход?');
	income = 'home';
	addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: ');
	deposit = confirm('Есть ли у вас депозит в банке?');

	console.log(money);
	console.log(income);
	console.log(addExpenses.split());

let addExpenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
	sale1 = +prompt('Во сколько это обойдется?');
	addExpenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
	sale2 = +prompt('Во сколько это обойдется?');
	budgetMonth = money - (sale1 + sale2);
	mission = 500000 / budgetMonth;
	budgetDay = Math.floor(budgetMonth / 30);

console.log(budgetMonth);
console.log(Math.ceil(mission));
console.log(budgetDay);

if (budgetDay > 800) {
	console.log('Высокий уровень дохода');
} else if (budgetDay >= 300 && budgetDay <= 800) {
	console.log('Средний уровень дохода');
} else if (budgetDay >= 0 && budgetDay <= 300) {
	console.log('Низкий уровень дохода');
} else {
	console.log('Что то пошло не так');
}

//УРОК 3(сложное задание)
// let lang = 'en';
// let arr = [];

// arr['ru'] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
// arr['en'] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

// console.log(arr[lang]);

// let namePerson = prompt('Введите имя и узнаете кто этот человек.');
// let result = namePerson == 'Артем' ? 'Директор':
// 			 namePerson == 'Максим' ? 'Преподаватель':
// 			 'Введите имя Артем или Максим';
// console.log(result);

//УРОК 4

function getExpensesMonth(callback) {
	console.log('Расходы: ', sale1 + sale2);
	callback();
}

function getAccumulatedMonth() {
	console.log('Накопления: ', budgetMonth);
}

let accumulatedMonth = getExpensesMonth(getAccumulatedMonth);

function getTargetMonth() {
	console.log('За ' + Math.ceil(mission) + ' месяцев будет достигнута ваша цель!');
}
getTargetMonth();

console.clear();

let showTypeOf = function(data) {
	console.log(data, typeof(data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let getStatusIncome = function() {
	if (budgetDay > 800) {
		return ('Высокий уровень дохода');
	} else if (budgetDay >= 300 && budgetDay <= 800) {
		return ('Средний уровень дохода');
	} else if (budgetDay >= 0 && budgetDay <= 300) {
		return ('Низкий уровень дохода');
	} else {
		return ('Что то пошло не так');
	}
}
console.log(getStatusIncome());
console.log(budgetMonth);
console.log(Math.ceil(mission));
