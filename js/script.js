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
	percentDeposit: 0,
	moneyDeposit: 0,
	mission: 500000,
	period: 3,
	expensesMonth: 0,
	asking: function() {
		
		if (confirm('Есть ли у вас дополнительный заработок?')) {
			let itemIncome;
			let cashIncome;
			do {
				itemIncome = prompt('Какой у вас дополнительный заработок?', 'Фриланс');
			}
			while (itemIncome === '' || itemIncome === 0 || itemIncome === false)
			do {
				cashIncome = +prompt('Сколько вы с этого получаете?', 20000);
			}
			while (isNaN(cashIncome) || cashIncome === '' || cashIncome === 0 || cashIncome === false)
			appData.income[itemIncome] = cashIncome;
		}
		
		let addExpenses;
		do {
			addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: ');
		}
		while (!isNaN(addExpenses) || addExpenses === '' || addExpenses === 0 || addExpenses === false || addExpenses === NaN)
		appData.addExpenses = addExpenses.split();
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
		if (appData.deposit) {
			do {
				appData.percentDeposit = +prompt('Какой годовой процент?', 10);
			}
			while (isNaN(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === 0 || appData.percentDeposit === false)
			
			do {
				appData.moneyDeposit = +prompt('Сколько денег вы положили в банк?', 50000);
			}
			while (isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === 0 || appData.moneyDeposit === false)
		}
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
	},
	calcSaveMoney: function() {
		return appData.budgetMonth * appData.period;
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

