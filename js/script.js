let money,
	start = function() {
		do {
			money = +prompt('Каков ваш месячный доход?');
			console.log('Доход: ', money);
		}
		while(isNaN(money) || money === 0 || money === false || money === null)
	};
 start();

let appData = {
	budget: money,
	income: {},
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	mission: 500000,
	period: 3,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	asking: function() {
		let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: ');
			appData.addExpenses = addExpenses.split();
			appData.deposit = confirm('Есть ли у вас депозит в банке?');
	}
};

let addExpenses1,
	addExpenses2;

function getExpensesMonth() {
	let sum = 0, question;

	for(let i = 0; i < 2; i++) {
		if ( i === 0 ) {
			addExpenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Еда');
		}
		if ( i === 1 ) {
			addExpenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Бензин');
		}
		do {
			question = +prompt('Во сколько это обойдется?', 5000);
		}
		while(isNaN(question) || question === '' || question === 0 || question === null || question === false)

		sum += +question;
	}
	return sum;
};
appData.expensesMonth = getExpensesMonth;
let expensesAmount = getExpensesMonth();
console.log('Расходы: ', + expensesAmount);

function getAccumulatedMonth() {
	return appData.budget - expensesAmount;
};
appData.budgetMonth = getAccumulatedMonth;
console.log('Накопления: ', getAccumulatedMonth());

function getTargetMonth() {
	return appData.mission / expensesAmount;
};
appData.period = getTargetMonth;

let	budgetDay = Math.floor(getAccumulatedMonth() / 30);

if (getTargetMonth() < 0) {
	console.log('Цель не будет достигнута!')
} else {
	console.log('Цель будет достигнута за ' + Math.ceil(getTargetMonth()) + ' дней!');
}

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
};
appData.income = getStatusIncome;
console.log(getStatusIncome());
console.log(appData);

