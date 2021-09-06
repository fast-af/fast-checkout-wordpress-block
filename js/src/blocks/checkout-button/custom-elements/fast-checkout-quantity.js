/* global HTMLElement */

const template = document.createElement('template');
template.innerHTML = `
	<style>
	:host {
		border: 1px solid #ddd;
		border-radius: 8px;
		display: grid;
		grid-template-columns: 60px minmax(0, 1fr) 60px;
		overflow: hidden;
		width: 100%;
	}
	button {
		background: #fff;
		border: 0 solid;
		border-right: 1px solid #ddd;
		box-sizing: border-box;
		color: #000;
		cursor: pointer;
		font-size: 24px;
		height: 50px;
		line-height: 50px;
		margin: 0;
		padding: 0;
		text-align: center;
		width: 60px;
	}
	input+button {
		border-left: 1px solid #ddd;
	}
	button:hover,
	button:focus {
		background: #ddd;
	}
	input[type=number] {
		-moz-appearance: textfield;
	}
	input[type="number"],
	input[type="number"]:active,
	input[type="number"]:focus {
		border: 0;
		font-size: 20px;
		height: 50px;
		line-height: 50px;
		outline: none;
		padding: 0;
		pointer-events: none;
		text-align: center;
		width: 100%;
	}
	input[type=number]::-webkit-inner-spin-button,
	input[type=number]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		margin: 0;
	}
	</style>
	<button class="minus">-</button>
	<input
		class="value"
		type="number"
		min="1"
	/>
	<button class="plus">+</button>
`;

class QuantitySelector extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.appendChild(template.content.cloneNode(true));

		this.init();
		this.render();
	}

	static get observedAttributes() {
		return ['id', 'quantity'];
	}
	attributeChangedCallback() {
		this.render();
	}

	get id() {
		return this.getAttribute('id') || 'quantity-selector';
	}
	get quantity() {
		const quantity = parseInt(this.getAttribute('quantity'), 10);
		return quantity > 0 ? quantity : 1;
	}
	set quantity(newQuantity) {
		const quantity = parseInt(newQuantity, 10);
		if (quantity > 0) {
			this.setAttribute('quantity', quantity);
		}
	}

	init() {
		const decrementor = this.shadowRoot.querySelector('.minus');
		const incrementor = this.shadowRoot.querySelector('.plus');
		const valueEl = this.shadowRoot.querySelector('.value');

		decrementor.addEventListener('click', (e) => {
			this.quantity--;
			e.target.blur();
		});
		incrementor.addEventListener('click', (e) => {
			this.quantity++;
			e.target.blur();
		});

		valueEl.addEventListener('change', (e) => {
			this.quantity = e.target.value;
		});
	}

	render() {
		const valueEl = this.shadowRoot.querySelector('.value');

		valueEl.setAttribute('id', this.id);
		valueEl.value = this.quantity;
	}
}
window.customElements.define('fast-quantity', QuantitySelector);
