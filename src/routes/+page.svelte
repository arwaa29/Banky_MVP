<script>
import { enhance } from '$app/forms';

const { form, data } = $props();
let Register = $state(0); 
let alreadyExist = $state(3);
let wrongPassword = $state(0);
let id =$state(0);
let name = $state('');
let balance = $state(0); 
let home =$state(0);
let login = $state(0);

$effect(() => {
if(form){
	console.log('form data:', form);
	if(form.Login == true){ 
		login = 1
		Register = 2;
		id = form.id;
		name = form.client;
		balance = form.balance;
		console.log('successfully logged in');
	} else if(form.Login == false) {
		login = 0;
		Register = 0;
		console.log('wrong password');
		wrongPassword = 1;
	} else if(form.Register == 1) { 
		Register = 0;
		alreadyExist = 1;
		console.log('account already exists');
	} else if(form.Register == 0) {
		Register = 0;
		alreadyExist = 2;
		console.log('account created successfully');
	}else if(form.home == 0){
		home = form.home;
	}
}
});

const goHome = () => {
		home = 0;
};

const goLoan = () => {
    home = 1;
};

const goCard = () => {
    home = 2;
};

const goRegister = () => {
    Register = 1;
};

const goLogin = () => {
    Register = 0;
};
</script>
{#if Register == 2}
	{#if form}
		{#if login == 1}
		<div class="bg-violet-200" style="width: 100vw; height:100vh;">


		<section class="d-flex flex-column ">
			<div class="flex flex-row justify-between bg-violet-500" >
				<h1 class="text-center p-4 text-4xl text-white ">Banky</h1>
				<div class="flex flex-row " >
					<button onclick={goCard}  class="p-4 text-2xl bg-violet-600 text-white " >apply for card</button>
					<button onclick={goLoan}  class="p-4 text-2xl bg-violet-600 text-white " >apply for loan</button>
				</div>
			</div>
		</section>	
		{#if home == 0}
			

			<section class="p-5">
				<div class="flex flex-row justify-between px-4">
					<h1 class="text-center text-2xl">Welcome {name}</h1>
					<h1 class="text-center text-2xl">Balance: {balance}</h1>
				</div>
			</section>
			
			<section class="p-5">
				<h1 class="text-3xl p-2" >Loans</h1>
				{#each form.loans as loan}
					<div class="flex flex-row p-1  px-4">
							<h1 class="text-center">#{loan.id} you owe: {loan.amount}</h1>
						</div>
				{/each}
			</section>
			<section class="p-5">
				<h1 class="text-3xl p-2">cards</h1>
				{#each form.cards as card}
					<div class="flex flex-row gap-3 p-1  px-4">
						<h1 class="text-center">#{card.card_number}</h1>
						<h1 class="text-center">{card.card_type == 1? 'Debit' : 'Credit' }</h1>
					</div>
				{/each}
			</section>
			{:else if ( home == 1)}
			<div class=" flex flex-row justify-center items-center" style="width: 100vw; height:100vh">		
				<section class="z-10 flex flex-col justify-center bg-violet-300" style="width: 75vw; height:75vh; border-radius: 50px;">
					<div class="flex flex-col items-center ">
						<form class="p-3" style="width: 75vw;" action="?/addLoan" method="POST" use:enhance>
							<input
							type="number"
							class="hidden"
							id="id"
							name="id"
							value={id}
							/>
							<div class="form-group flex flex-col p-3" >
								<label class="mb-3 text-lg" for="name">Name</label>
								<input
									type="text" 							
									class="border-2 border-gray-500 bg-gray-100 py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 text-lg"
									id="name"
									name="name"
									placeholder="Enter Name"
								/>
							</div>
							<div class="form-group flex flex-col p-3">
								<label class="mb-3 text-lg" for="amount">Amount</label>
								<input
									type="number"
									class=" border-2 border-gray-500 bg-gray-100 py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 text-lg"
									id="amount"
									name="amount"
									placeholder="Enter Amount"
								/>
							</div>
						
							<div class="form-group flex flex-col p-3">
								<label class="mb-3 text-lg" for="card">Card</label>
								<input
									type="Text"
									class=" border-2 border-gray-500 bg-gray-100 py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 text-lg"
									id="card"
									name="card"
									placeholder="Enter Card"
								/>
							</div>
							<div class="form-group flex flex-col p-3">
								<label class="mb-3 text-lg" for="purpose">Purpose</label>
								<input
									type="Text"
									class=" border-2 border-gray-500 bg-gray-100 py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 text-lg"
									id="purpose"
									name="purpose"
									placeholder="Enter Purpose of the Loan"
								/>
							</div>

							<div class="flex justify-center gap-3 p-2">
								<button type="submit" class="btn-primary">Apply</button>
								<button onclick={goHome} class="btn-primary">cancle</button>
							</div>
						</form>
					</div>
  			</section>
			</div>	
			{:else if ( home == 2)}
			<div class=" flex flex-row justify-center items-center" style="width: 100vw; height:100vh">
				<section class="z-10 flex flex-col justify-center bg-violet-300" style="width: 75vw; height:75vh; border-radius: 50px;">
					<div class="flex flex-col items-center ">
					<form class="p-3" style="width: 75vw;" action="?/addCard" method="POST" use:enhance>
						<input
						type="number"
						class="hidden"
						id="id"
						name="id"
						value={id}
						/>
						
						<div class="form-group flex flex-col p-3" >
							<label class="mb-3 text-lg" for="name">Name</label>
							<input
								type="text" 							
								class="border-2 border-gray-500 bg-gray-100 py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 text-lg"
								id="name"
								name="name"
								placeholder="Enter Name"
							/>
						</div>
						<div class="form-group flex flex-col p-3">
							<label class="mb-3 text-lg" for="address">Address</label>
							<input
								type="text"
								class=" border-2 border-gray-500 bg-gray-100 py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 text-lg"
								id="address"
								name="address"
								placeholder="Enter Address"
							/>
						</div>
						<div class="form-group flex flex-col p-3">
							<label class="mb-3 text-lg" for="card">Card Type</label>
							<select id="card" name="card">
								<option value="0">Credit Card</option>
								<option value="1">Debit Card</option>
							</select>
						</div>
						<div class="flex justify-center gap-3 p-2">
							<button type="submit" class="btn-primary">Apply</button>
							<button onclick={goHome} class="btn-primary">cancle</button>
						</div>
					</form>
				</div>
			</section>
		</div>


			{/if}
		</div>
		{/if}
	{/if}
{:else}
	{#if Register == 0}
		<section class="flex flex-col justify-center" style="width: 100vw; height:100vh;">
			<div class="flex flex-col items-center ">
				<form class="p-3" action="?/login" method="post" use:enhance>
					<div class="form-group flex flex-col p-3">
						<label class="mb-3 text-lg" for="username">Username</label>
						<input
							type="text"
							class=" border-2 border-gray-500 bg-gray-100 py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 text-lg"
							id="username"
							name="username"
							placeholder="Enter username"
						/>
					</div>
					<div class="form-group flex flex-col p-3">
						<label class="mb-3 text-lg" for="password">Password</label>
						<input
							type="password"
							class="border-2 border-gray-500 bg-gray-100 py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 text-lg"
							id="password"
							name="password"
							placeholder="Password"
						/>
					</div>
					<div class="flex justify-center p-2">
						<button type="submit" class="btn-primary px-6">Login</button>
					</div>
				</form>

				<div class="flex flex-row">
					<p>don't have an account?</p>
					<button class="px-2 text-blue-500" onclick={goRegister}>Register</button>
				</div>
				{#if alreadyExist == 1}
					<p>Account already exists</p>
				{:else if alreadyExist == 2}
				<p> account created successfully</p>
				{:else if wrongPassword == 1}
				<p>Wrong Password</p>
				{/if}
			</div>
		</section>
	{:else}
	<section class="flex flex-col justify-center" style="width: 100vw; height:100vh;">
		<div class="flex flex-col items-center">
			<form class="p-3" style="width: 75vw;" action="?/register" method="POST" use:enhance>
				<div class="flex flex-row gap-5" style="width: 100%;">
				<div class="form-group flex flex-col p-3" style="width:50%">
						<label class="mb-3 text-lg" for="name">Name</label>
						<input
							type="text" 							
							class="border-2 border-gray-500 bg-gray-100 py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 text-lg"
							id="name"
							name="name"
							placeholder="Enter Name"
						/>
					</div>
					<div class="form-group flex flex-col p-3" style="width:50%">
						<label class="mb-3 text-lg" for="username">Username</label>
						<input
							type="text"
							class=" border-2 border-gray-500 bg-gray-100 py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 text-lg"
							id="username"
							name="username"
							placeholder="Enter username"
						/>
					</div>
				</div>	
				<div class="flex flex-row gap-5" style="width: 100%;">
					<div class="form-group flex flex-col p-3" style="width: 50%;">
						<label class="mb-3 text-lg" for="email">Email</label>
						<input
							type="email"
							class=" border-2 border-gray-500 bg-gray-100 py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 text-lg"
							id="email"
							name="email"
							placeholder="Enter Email"
						/>
					</div>
					<div class="form-group flex flex-col p-3" style="width: 50%;">
						<label class="mb-3 text-lg" for="password">Password</label>
						<input
							type="password"
							class=" border-2 border-gray-500 bg-gray-100 py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 text-lg"
							id="password"
							name="password"
							placeholder="Password"
						/>
					</div>
				</div>
				<div class="flex flex-row gap-5" style="width: 100%;">
					<div class="form-group flex flex-col p-3" style="width: 50%;">
						<label class="mb-3 text-lg" for="phone">Phone Number</label>
						<input
							type="text"
							class=" border-2 border-gray-500 bg-gray-100 py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 text-lg"
							id="phone"
							name="phone"
							placeholder="Enter Phone Number"
						/>
					</div>
					<div class="form-group flex flex-col p-3" style="width: 50%;">
						<label class="mb-3 text-lg" for="address">Address</label>
						<input
							type="text"
							class=" border-2 border-gray-500 bg-gray-100 py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 text-lg"
							id="address"
							name="address"
							placeholder="Enter Your Address"
						/>
					</div>
				</div>

					<div class="flex justify-center p-2">
						<button type="submit" class="btn-primary">Register</button>
					</div>
				</form>

				<div class="flex flex-row">
					<p>already have an account?</p>
					<button class="px-2 text-blue-500" onclick={goLogin}>Login</button>
				</div>
			</div>
		</section>
	{/if}
{/if}
