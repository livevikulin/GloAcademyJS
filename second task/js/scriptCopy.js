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
		
		// $start.style.display = 'none';
		// $cancel.style.display = 'block';
		
		this.budget = +budget.value;
		
		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getAddIncome();
		this.getBudget();
		this.showResult();
		this.blocked();
		
	},
	
	blocked() {
	
		document.querySelectorAll('.data input[type="text"]').forEach(function(item) {
			item.disabled = true;
		});
		$start.style.display = 'none';
		$cancel.style.display = 'block';
		$cancel.addEventListener('click', this.reset);
	
	},
	
	reset() {
		
		this.budget = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.income = {};
		this.incomeMonth = 0;
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.deposit = false;
		this.percentDeposit = 0;
		this.moneyDeposit = 0;
		this.mission = 500000;
		this.period = 3;
		this.expensesMonth = 0;
		
		document.querySelectorAll('.data input[type="text"]').forEach(function(item) {
			item.disabled = false;
		});
		
		document.querySelectorAll('input[type="text"]').forEach(function(item) {
			item.value = '';
		});
		
		$start.style.display = 'block';
		$cancel.style.display = 'none';
		
	},
	
	showResult: function() {
		
		month.value = this.budgetMonth;
		budgetDay.value = this.budgetDay;
		expensMonth.value = this.expensesMonth;
		expensive.value = this.addExpenses.join(', ');
		moneyIncome.value = this.addIncome.join(', ');
		destination.value = Math.ceil(this.getTargetMonth());
		period.value = this.calcSaveMoney();
		
		const $this = this;
		periodRange.addEventListener('input', function() {
			period.value = $this.calcSaveMoney();
		});
		
	},
	
	addExpensesBlock: function(item) {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		cloneExpensesItem.querySelectorAll('input').forEach(function(item) {
			item.value = '';
		});
		
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, secondPlus);
		expensesItems = document.querySelectorAll('.expenses-items');
		if (expensesItems.length === 3) {
			secondPlus.style.display = 'none';
		}
		
	},
	
	addIncomeBlock: function(item) {
		let cloneIncomeItem = incomeItem[0].cloneNode(true);
		cloneIncomeItem.querySelectorAll('input').forEach(function(item) {
			item.value = '';
		});
		
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
				this.expenses[itemExpenses] = cashExpenses;
			}
		}, this);
	},
	
	getIncome: function() {
		
		incomeItem.forEach(function(item) {
			
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			
			if (itemIncome !== '' && cashIncome !== '') {
				this.income[itemIncome] = cashIncome;
			}
		}, this);
		
	},
	
	getAddIncome: function() {
		
		possiblyMoney.forEach(function(item) {
			let itemValue = item.value.trim();
			if (item.value !== '') {
				this.addIncome.push(itemValue)
			}
		}, this);
		
	},
	
	getAddExpenses: function() {
		
		let addExpenses = costs.value.split(',');
		addExpenses.forEach(function(item) {
			if (item !== '') {
				this.addExpenses.push(item);
			}
		}, this);
		
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
		for (let key in this.expenses) {
			this.expensesMonth += +this.expenses[key];
		}
	},
	
	getBudget: function () {
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
		this.budgetDay = Math.floor(this.budgetMonth / 30);
	},
	
	getTargetMonth: function() {
		return targetSum.value / this.budgetMonth;
	},
	
	getStatusIncome: function() {
		if (this.budgetDay > 800) {
			return ('Высокий уровень дохода');
		} else if (this.budgetDay >= 300 && this.budgetDay <= 800) {
			return ('Средний уровень дохода');
		} else if (this.budgetDay >= 0 && this.budgetDay <= 300) {
			return ('Низкий уровень дохода');
		} else if (this.budgetDay < 0) {
			return ('Что то пошло не так');
		}
	},
	
	calcSaveMoney: function() {
		return this.budgetMonth * periodRange.value;
	}
};

start.addEventListener('click', appData.start.bind(appData));

secondPlus.addEventListener('click', appData.addExpensesBlock);

firstPlus.addEventListener('click', appData.addIncomeBlock);

period.addEventListener('input', changesInput);

changesInput;

start.disabled = true;

budget.addEventListener('input', function() {

	if (budget.value.trim() === '') {
		start.disabled = true;
	} else {
		start.disabled = false;
	}
	
});


