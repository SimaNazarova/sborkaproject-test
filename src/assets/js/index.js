import basket from './data';

let basketArr = basket;
const list = document.querySelector('.basket__list');
const badge = document.querySelector('.header__right-badge');
const basketList = document.querySelector('.basket');
const shipping = 150;
const tax = 100;

document.querySelector('#tax').textContent = `$ ` + tax;
document.querySelector('#shipping').textContent = `$ ` + shipping;

function addItem(item) {
	const basketItemTemplate = document.querySelector('#basket-item-template').content;
	const itemElement = basketItemTemplate.cloneNode(true);
	itemElement.querySelector('.basket__item-title').textContent = item.name;
	itemElement.querySelector('.basket__item').id = item.id;
	itemElement.querySelector('.basket__item-img').src = item.img;
	itemElement.querySelector('.basket__item-quantity').textContent = item.quantity;
	itemElement.querySelector('.basket__item-price').textContent = `$ ` + item.totalPrice;
	itemElement.querySelector('.basket__btn-container').id = item.id;
	list.appendChild(itemElement);
}

function updateHeaderBadge() {
	if (basketArr.length === 0) {
		badge.classList.add('header__right-badge_inactive');
	}
	badge.textContent = basketArr.length;
}

function updateSum() {
	const subtotalSum = basketArr.reduce(function (prev, item) {
		return prev + item.totalPrice;
	}, 0);

	document.querySelector('#subtotal').textContent = `$ ` + subtotalSum;
	const totalSum = subtotalSum + tax + shipping;
	document.querySelector('#total').textContent = `$ ` + totalSum;
}

function renderBasket() {
	list.innerHTML = '';
	updateHeaderBadge();
	basketArr.forEach(addItem);
	updateSum();
}

function deleteItem(evt) {
	if (evt.target.classList.contains('basket__btn_delete')) {
		basketArr = basketArr.filter(items => items.id !== evt.target.parentElement.id);
	}
}

function changeCount(evt) {
	if (evt.target.classList.contains('basket__btn_plus')) {
		basketArr = basketArr.map(item =>
			item.id === evt.target.parentElement.id
				? { ...item, quantity: (item.quantity += 1), totalPrice: item.price * item.quantity }
				: item
		);
	}

	if (evt.target.classList.contains('basket__btn_minus')) {
		basketArr = basketArr.map(item =>
			item.id === evt.target.parentElement.id && item.quantity !== 1
				? { ...item, quantity: (item.quantity -= 1), totalPrice: item.totalPrice - item.price }
				: item
		);
	}
}

basketList.addEventListener('click', function (evt) {
	deleteItem(evt);
	changeCount(evt);
	updateSum();
	renderBasket();
});

renderBasket();

class ProjectApp {
	constructor() {
		this.env = require('./utils/env').default;
		this.utils = require('./utils/utils').default;
		this.classes = {
			// Signal: require('./classes/Signal').default,
		};
		this.components = {};
		this.helpers = {};
		this.modules = {};
		document.addEventListener('DOMContentLoaded', () => {
			document.documentElement.classList.remove('_loading');
		});
	}
}

if (module.hot) {
	module.hot.accept();
}

global.ProjectApp = new ProjectApp();
