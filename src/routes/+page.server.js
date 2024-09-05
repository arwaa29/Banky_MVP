import { createPool } from '@vercel/postgres';
const pool = createPool({
	connectionString:
		'postgres://default:welYXkB6RpP0@ep-bold-bonus-a45vwuwy-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require'
});

const cardsData = async (customerId) => {
	const { rows } = await pool.sql`SELECT * from cards where customer_id = ${customerId} `;
	return rows;
};

const loansData = async (customerId) => {
	const { rows } = await pool.sql`SELECT * from loans where customer_id = ${customerId} `;
	return rows;
};

function generateAccountNumber() {
	let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let accountNumber = '';
	for (let i = 0; i < 10; i++) {
		accountNumber += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return accountNumber;
}

function createRandomVisaNumber(ccnumber = '518948') {
	while (ccnumber.length < 15) {
		ccnumber += Math.floor(Math.random() * 10);
	}

	const reversedCCnumber = ccnumber.split('').reverse().map(Number);
	let sum = 0,
		pos = 0;

	while (pos < 15) {
		let odd = reversedCCnumber[pos] * 2;
		sum += odd > 9 ? odd - 9 : odd;
		if (pos !== 14) {
			sum += reversedCCnumber[pos + 1];
		}
		pos += 2;
	}

	const checkDigit = (10 - (sum % 10)) % 10;
	return ccnumber + checkDigit;
}

export const actions = {
	register: async ({ request }) => {
		console.log('process started');
		const { name, username, email, password, phone, address } = Object.fromEntries(
			await request.formData()
		);
		console.log(name, username, email, password, phone, address);

		const { rows } = await pool.sql`SELECT * from customers where email = ${email}`;
		const alreadyExist = rows.length > 0;
		console.log(alreadyExist);
		if (!alreadyExist) {
			await pool.sql`INSERT INTO customers (name, username, email, password, phone_number, address, account_number) 
    VALUES (${name}, ${username}, ${email}, ${password}, ${phone}, ${address}, ${generateAccountNumber()})`;
			return { Register: 0, message: 'account created successfully' };
		} else {
			return { Register: 1, message: 'account already exists' };
		}
	},
	login: async ({ request }) => {
		const { username, password } = Object.fromEntries(await request.formData());
		const { rows } =
			await pool.sql`SELECT id, name, balance from customers where username = ${username} and password = ${password}`;
		const isLogin = rows.length > 0;
		if (isLogin) {
			const { id, name, balance } = rows[0];
			console.log('login :', isLogin);
			return {
				Login: isLogin,
				cards: await cardsData(id),
				loans: await loansData(id),
				id: id,
				client: name,
				balance: balance
			};
		} else {
			return { Login: isLogin, cards: [], loans: [] };
		}
	},
	addLoan: async ({ request }) => {
		const { id, name, amount, card, purpose } = Object.fromEntries(await request.formData());
		const { rows } = await pool.sql`SELECT EXISTS (
    SELECT 1
    FROM Customers c
    JOIN Cards cd ON c.id = cd.customer_id
    WHERE c.id = ${id}
    AND cd.card_number = ${card}
		) AS is_customers_card;`;
		const alreadyExist = rows.length > 0;
		if (alreadyExist) {
			await pool.sql`INSERT INTO loans(amount, purpose, customer_id) VALUES (${amount}, ${purpose}, ${id});`;
			return {
				addMessage: 'loan added',
				home: 0,
				loans: await loansData(id),
				cards: await cardsData(id)
			};
		} else {
			return {
				addMessage: 'card number doesnt exist',
				home: 0,
				loans: await loansData(id),
				cards: await cardsData(id)
			};
		}
	},
	addCard: async ({ request }) => {
		const { id, name, address, card } = Object.fromEntries(await request.formData());
		await pool.sql`INSERT INTO cards(card_type, customer_id, card_number, address) VALUES (${card}, ${id}, ${createRandomVisaNumber()}, ${address})`;
		return {
			addMessage: 'card added',
			home: 0,
			loans: await loansData(id),
			cards: await cardsData(id)
		};
	}
};
