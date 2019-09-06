//УРОК 7

let myElements = document.querySelectorAll('.book');
let myBody = document.getElementsByTagName('body')[0];
let myTitle = document.getElementsByTagName('h2');
let myAdv = document.querySelector('.adv');
let myList = document.getElementsByTagName('ul');
let myItem = document.getElementsByTagName('li');


console.log(myList[5].children);
console.log(myItem);


myTitle[4].textContent = 'Книга 3. this и Прототипы Объектов';
myAdv.classList.remove('adv');

//2 книга
myList[0].insertBefore(myItem[6], myItem[4]);
myList[0].insertBefore(myItem[8], myItem[5]);
myList[0].insertBefore(myItem[2], myItem[10]);

//5 книга
myList[5].insertBefore(myItem[55], myItem[48]);
myList[5].insertBefore(myItem[49], myItem[52]);
myList[5].insertBefore(myItem[52], myItem[55]);

//6 книга
let newEl = document.createElement('li');
newEl.textContent = 'Глава 8: За пределами ES6';

myList[2].appendChild(newEl);
myList[2].insertBefore(myItem[27], myItem[26]);



myBody.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
