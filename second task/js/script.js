let $start = document.getElementById('start');
let $cancel = document.getElementById('cancel');
let firstPlus = document.getElementsByTagName('button')[0];
let secondPlus = document.getElementsByTagName('button')[1];
let $check = document.querySelector('#deposit-check');
let $expens = document.querySelectorAll('.additional_expenses-item');
let month = document.querySelector('.budget_month-value');
let budgetDay = document.querySelector('.budget_day-value');
let expensMonth = document.querySelector('.expenses_month-value');
let moneyIncome = document.querySelector('.additional_income-value');
let expensive = document.querySelector('.additional_expenses-value');
let period = document.querySelector('.income_period-value');
let destination = document.querySelector('.target_month-value');
let budget = document.querySelector('.salary-amount');
let possiblyMoney = document.querySelectorAll('.additional_income-item');
let cost = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let costs = document.querySelector('.additional_expenses-item');
let targetSum = document.querySelector('.target-amount');
let periodRange = document.querySelector('.period-select');
let incomeItem = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');
let data = document.querySelector('.data');
let inputs = data.querySelectorAll('input');
let rangeValue = function(){
	periodAmount.innerHTML = periodRange.value;
};
let changesInput = periodRange.addEventListener("input", rangeValue);

let appData = {
	budget: 0,
	budgetDay: 0,
	budgetMonth: 0,
	income: {},
	incomeMonth: 0,
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
		
		$start.style.display = 'none';
		$cancel.style.display = 'block';
		inputs.forEach(function(item) {
			item.setAttribute('disabled', 'disabled');
		});
		
		appData.budget = +budget.value;
		
		appData.getExpenses();
		appData.getIncome();
		appData.getExpensesMonth();
		appData.getAddExpenses();
		appData.getAddIncome();
		appData.getBudget();
		appData.showResult();
		
	},
	
	showResult: function() {
		
		month.value = appData.budgetMonth;
		budgetDay.value = appData.budgetDay;
		expensMonth.value = appData.expensesMonth;
		expensive.value = appData.addExpenses.join(', ');
		moneyIncome.value = appData.addIncome.join(', ');
		destination.value = Math.ceil(appData.getTargetMonth());
		period.value = appData.calcSaveMoney();
		periodRange.addEventListener('input', function() {
			
			period.value = appData.calcSaveMoney();
			
		});
		
	},
	
	addExpensesBlock: function(item) {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, secondPlus);
		expensesItems = document.querySelectorAll('.expenses-items');
		item = item.trim();
		if (expensesItems.length === 3) {
			secondPlus.style.display = 'none';
		}
		
	},
	
	addIncomeBlock: function(item) {
		let cloneIncomeItem = incomeItem[0].cloneNode(true);
		
		incomeItem[0].parentNode.insertBefore(cloneIncomeItem, firstPlus);
		incomeItem = document.querySelectorAll('.income-items');
		if (incomeItem.length === 3) {
			firstPlus.style.display = 'none';
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
	
	getIncome: function() {
		
		incomeItem.forEach(function(item) {
			
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			
			if (itemIncome !== '' && cashIncome !== '') {
				appData.income[itemIncome] = cashIncome;
			}
		});
		
	},
	
	getAddIncome: function() {
		
		possiblyMoney.forEach(function(item) {
			let itemValue = item.value.trim();
			if (item.value !== '') {
				appData.addIncome.push(itemValue)
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
		appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
		appData.budgetDay = Math.floor(appData.budgetMonth / 30);
	},
	
	getTargetMonth: function() {
		return targetSum.value / appData.budgetMonth;
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
		return appData.budgetMonth * periodRange.value;
	}
};

start.addEventListener('click', appData.start);

secondPlus.addEventListener('click', appData.addExpensesBlock);

firstPlus.addEventListener('click', appData.addIncomeBlock);

period.addEventListener('input', changesInput);

changesInput;




