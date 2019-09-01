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
	budgetDay: 0,
	budgetMonth: 0,
	income: {},
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	mission: 500000,
	period: 3,
	expensesMonth: 0,
	asking: function() {
		let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: ');
		appData.addExpenses = addExpenses.split();
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
		for(let i = 0; i < 2; i++) {
			let itemExpenses = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Еда');
			let cashExpenses;
			do {
				cashExpenses = +prompt('Во сколько это обойдется?', 5000);
			}
			while(isNaN(cashExpenses) || cashExpenses === '' || cashExpenses === 0 || cashExpenses === null || cashExpenses === false)
	
			appData.expenses[itemExpenses] = cashExpenses;
		}
	},
	getExpensesMonth: function() {
		for (let key in appData.expenses) {
			appData.expensesMonth += +appData.expenses[key];
		}
	},
	getBudget: function () {
		appData.budgetMonth = appData.budget - appData.expensesMonth;
		appData.budgetDay = Math.floor(appData.budgetMonth / 30);
	},
	getTargetMonth: function() {
		return appData.mission / appData.budgetMonth;
	},
	getStatusIncome: function() {
		if (appData.budgetDay > 800) {
			return ('Высокий уровень дохода');
		} else if (appData.budgetDay >= 300 && appData.budgetDay <= 800) {
			return ('Средний уровень дохода');
		} else if (appData.budgetDay >= 0 && appData.budgetDay <= 300) {
			return ('Низкий уровень дохода');
		} else if (appData.budgetDay < 0) {
			return ('Что то пошло не так');
		}
	}
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы: ' + appData.expensesMonth);

if (appData.getTargetMonth() > 0) {
	console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' дней!');
} else {
	console.log('Цель не будет достигнута!');
}

console.log(appData.getStatusIncome());

for (let key in appData) {
	console.log('Наша программа включает в себя данные: ' + key + ' - ' +appData[key]);
};


