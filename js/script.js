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

let money,
	income = 'home',
	addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: '),
	deposit = confirm('Есть ли у вас депозит в банке?');

let start = function() {
	money = +prompt('Каков ваш месячный доход?');

	do {
		money = +prompt('Каков ваш месячный доход?');
		console.log('Доход ', money);
	}
	while(isNaN(money) || money === 0 || money === false || money === null)
};
start();

console.log(income);
console.log(addExpenses.split());

let addExpenses1,
	addExpenses2;


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

function getExpensesMonth() {
	let sum = 0;

	for(let i = 0; i < 2; i++) {
		if ( i === 0 ) {
			addExpenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Еда');
		}
		if ( i === 1 ) {
			addExpenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Бензин');
		}
		while(isNaN(sum) || sum === '' || sum === 0 || sum === null || sum === false) {
			sum += +prompt('Во сколько это обойдется?');
		}
	}
	return sum;
}
let expensesAmount = getExpensesMonth();
console.log('Расходы: ', + expensesAmount);

let	budgetMonth = money - expensesAmount;
	mission = 500000 / budgetMonth;
	budgetDay = Math.floor(budgetMonth / 30);

console.log('Накопления ' + budgetMonth);
console.log('Цель будет достигнута через ' + Math.ceil(mission) + ' месяцев!');
console.log('Денег на день ' + budgetDay);

function getAccumulatedMonth() {
	return money - expensesAmount;
}
console.log(getAccumulatedMonth());

function getTargetMonth() {
	return mission / expensesAmount;
}
if (getTargetMonth() < 0) {
	console.log('Цель не будет достигнута!')
} else {
	console.log(Math.ceil(getTargetMonth()));
}

// console.clear();

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
	} else if (budgetDay < 0) {
		return ('Что то пошло не так');
	}
}
console.log(getStatusIncome());
console.log(budgetMonth);
console.log(Math.ceil(mission));
