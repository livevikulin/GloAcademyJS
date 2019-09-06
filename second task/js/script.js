let $start = document.getElementById('start');
let firstPlus = document.getElementsByTagName('button')[0];
let secondPlus = document.getElementsByTagName('button')[1];
let $check = document.querySelector('#deposit-check');
let $expens = document.querySelectorAll('.additional_expenses-item');
let month = document.querySelector('.budget_month-value');
let budgetDay = document.querySelector('.budget_day-value');
let expensMonth = document.querySelector('.expenses_month-value');
let moneyIncome = document.querySelector('.result-additional_income');
let expensive = document.querySelector('.additional_expenses-value');
let period = document.querySelector('.result-income_period');
let destination = document.querySelector('.result-target_month');
let budget = document.querySelector('.salary-amount');
let extraMoney = document.querySelector('.income-title');
let possiblyMoney = document.querySelectorAll('.additional_income-item');
let cost = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let costs = document.querySelector('.additional_expenses-item');
let targetSum = document.querySelector('.target-amount');
let periodRange = document.querySelector('.period-select');

let appData = {
	budget: 0,
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
	start: function() {
		
		if (budget.value === '') {
			alert('Ошибка, поле "Месячный доход" не заполнено!');
			return;
		}
		
		appData.budget = budget.value;
		
		appData.getExpenses();
		appData.getExpensesMonth();
		appData.getBudget();
		appData.getAddExpenses();
		appData.showResult();
		
	},
	
	showResult: function() {
		
		month.value = appData.budgetMonth;
		budgetDay.value = appData.budgetDay;
		expensMonth.value = appData.expensesMonth;
		expensive.value = appData.addExpenses.join(', ');
		
	},
	
	addExpensesBlock: function() {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, secondPlus);
		expensesItems = document.querySelectorAll('.expenses-items');
		
		if (expensesItems.length === 3) {
			secondPlus.style.display = 'none';
		}
		
	},
	
	getExpenses: function() {
		expensesItems.forEach(function(item) {
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cashExpenses = item.querySelector('.expenses-amount').value;
			
			if (itemExpenses !== '' && cashExpenses !== '') {
				appData.expenses[itemExpenses] = cashExpenses;
			}
		});
	},
	
	getAddExpenses: function() {
		
		let addExpenses = costs.value.split(',');
		addExpenses.forEach(function(item) {
			if (item !== '') {
				appData.addExpenses.push(item);
			}
		});
		
	},
	
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

start.addEventListener('click', appData.start);

secondPlus.addEventListener('click', appData.addExpensesBlock);

// if (appData.getTargetMonth() > 0) {
// 	console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' дней!');
// } else {
// 	console.log('Цель не будет достигнута!');
// }



