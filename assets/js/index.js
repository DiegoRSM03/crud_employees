document.addEventListener('DOMContentLoaded', function () {
	localStorage.setItem('page', '1');

	retrieveTable('employees');

	document.getElementById('table-employees').addEventListener('click', function () {
		localStorage.setItem('page', '1');
		retrieveTable('employees');
		selectTable('table-employees');
	});
	document.getElementById('table-departments').addEventListener('click', function () {
		localStorage.setItem('page', '1');
		retrieveTable('departments');
		selectTable('table-departments');
	});
	document.getElementById('table-titles').addEventListener('click', function () {
		localStorage.setItem('page', '1');
		retrieveTable('titles');
		selectTable('table-titles');
	});
	document.getElementById('table-salaries').addEventListener('click', function () {
		localStorage.setItem('page', '1');
		retrieveTable('salaries');
		selectTable('table-salaries');
	});

	document.getElementById('prev-page').addEventListener('click', function () {
		var currentPage = localStorage.getItem('page');
		if (currentPage != 1) {
			currentPage--;
			localStorage.setItem('page', currentPage);
			retrieveTable(localStorage.getItem('section'));
		}
	});
	document.getElementById('next-page').addEventListener('click', function () {
		var currentPage = localStorage.getItem('page');
		currentPage++;
		localStorage.setItem('page', currentPage);

		retrieveTable(localStorage.getItem('section'));
	});
});

async function retrieveTable (tableName) {
	let response = await fetch(window.location.href + 'database/api/v1/' + tableName + '/retrieve.php?page=' + localStorage.getItem('page'));
	let data = await response.json();
	console.log(data);

	fillTable(data, tableName);
}

function selectTable (idTableSelected) {
	var tables = document.querySelectorAll('.table');

	tables.forEach(function (tables) {
		tables.classList.remove('table-selected');
	});

	document.getElementById(idTableSelected).classList.add('table-selected');
}

function addActionsToRecord (tr) {
	var actions = document.createElement('td');
	actions.classList.add('actions');

	var update = document.createElement('span');
	update.classList.add('flaticon-edit');
	update.classList.add('edit');

	var remove = document.createElement('span');
	remove.classList.add('flaticon-delete');
	remove.classList.add('remove');

	actions.appendChild(update);
	actions.appendChild(remove);

	tr.appendChild(actions);
}

function emptyTable () {
	var thead = document.getElementById('thead');
	thead.innerHTML = '';

	var tbody = document.getElementById('tbody');
	tbody.innerHTML = '';
}

function fillTable (data, tableName) {

	emptyTable();

	switch (tableName) {
		case 'employees':
			localStorage.setItem('section', 'employees');
			fillTableWithUsers(data);
			break;
		case 'departments':
			localStorage.setItem('section', 'departments');
			fillTableWithDepartments(data);
			break;
		case 'titles':
			localStorage.setItem('section', 'titles');	
			fillTableWithTitles(data);
			break;
		case 'salaries':
			localStorage.setItem('section', 'salaries');
			fillTableWithSalaries(data);
			break;
	}
}

function fillTableWithUsers (data) {
	// LLENANDO ENCABEZADOS DE TABLA
	var thead = document.getElementById('thead');
	
	var tr = document.createElement('tr');
	
	var thEmpNo = document.createElement('th');
	thEmpNo.innerHTML = 'Numero';
	
	var thName = document.createElement('th');
	thName.innerHTML = 'Nombre';
	
	var thSurname = document.createElement('th');
	thSurname.innerHTML = 'Apellido';
	
	var thHireDate = document.createElement('th');
	thHireDate.innerHTML = 'Contratacion';

	var thActions = document.createElement('th');
	thActions.innerHTML = 'Acciones';
	
	tr.appendChild(thEmpNo);
	tr.appendChild(thName);
	tr.appendChild(thSurname);
	tr.appendChild(thHireDate);
	tr.appendChild(thActions);
	
	thead.appendChild(tr);
	
	
	// LLENANDO CUERPO DE TABLA
	var tbody = document.getElementById('tbody');

	for (let i=0 ; i<15 ; i++) {
		var tr = document.createElement('tr');
		
		var tdNro = document.createElement('td');
		tdNro.innerHTML = data[i].emp_no;
		tr.appendChild(tdNro);

		var tdName = document.createElement('td');
		tdName.innerHTML = data[i].first_name;
		tr.appendChild(tdName);

		var tdSurname = document.createElement('td');
		tdSurname.innerHTML = data[i].last_name;
		tr.appendChild(tdSurname);

		var tdHireDate = document.createElement('td');
		tdHireDate.innerHTML = data[i].hire_date;
		tr.appendChild(tdHireDate);

		addActionsToRecord(tr);

		tbody.appendChild(tr);

		tr.addEventListener('click', function () {
			window.location.href = window.location.href + 'views/user.php?emp_no=' + data[i].emp_no;
		});
	}
}

function fillTableWithDepartments (data) {
	// LLENANDO ENCABEZADOS DE TABLA
	var thead = document.getElementById('thead');
	
	var tr = document.createElement('tr');

	var thDeptNo = document.createElement('th');
	thDeptNo.innerHTML = 'Numero de Departamento';

	var thDeptName = document.createElement('th');
	thDeptName.innerHTML = 'Nombre del Departamento';

	var thTotalEmployees = document.createElement('th');
	thTotalEmployees.innerHTML = 'Total de Empleados';

	var thActions = document.createElement('th');
	thActions.innerHTML = 'Acciones';

	tr.appendChild(thDeptNo);
	tr.appendChild(thDeptName);
	tr.appendChild(thTotalEmployees);
	tr.appendChild(thActions);

	thead.appendChild(tr);


	// LLENANDO CUERPO DE TABLA
	var tbody = document.getElementById('tbody');

	for (let i=0 ; i<15 ; i++) {
		var tr = document.createElement('tr');
		
		var tdDeptNo = document.createElement('td');
		tdDeptNo.innerHTML = data[i].dept_no;

		var tdDeptName = document.createElement('td');
		tdDeptName.innerHTML = data[i].dept_name;

		var tdTotalEmployees = document.createElement('td');
		tdTotalEmployees.innerHTML = data[i].total_employees;

		tr.appendChild(tdDeptNo);
		tr.appendChild(tdDeptName);
		tr.appendChild(tdTotalEmployees);

		addActionsToRecord(tr);

		tbody.appendChild(tr);
	}
}

function fillTableWithTitles (data) {
	// LLENANDO ENCABEZADOS DE TABLA
	var thead = document.getElementById('thead');
	
	var tr = document.createElement('tr');

	var thEmpNo = document.createElement('th');
	thEmpNo.innerHTML = 'Numero';

	var thTitle = document.createElement('th');
	thTitle.innerHTML = 'Titulo';

	var thFromDate = document.createElement('th');
	thFromDate.innerHTML = 'Desde';

	var thToDate = document.createElement('th');
	thToDate.innerHTML = 'Hasta';

	var thActions = document.createElement('th');
	thActions.innerHTML = 'Acciones';

	tr.appendChild(thEmpNo);
	tr.appendChild(thTitle);
	tr.appendChild(thFromDate);
	tr.appendChild(thToDate);
	tr.appendChild(thActions);

	thead.appendChild(tr);


	// LLENANDO CUERPO DE TABLA
	var tbody = document.getElementById('tbody');

	for (let i=0 ; i<15 ; i++) {
		var tr = document.createElement('tr');
		
		var tdEmpNo = document.createElement('td');
		tdEmpNo.innerHTML = data[i].emp_no;

		var tdTitle = document.createElement('td');
		tdTitle.innerHTML = data[i].title;

		var tdFromDate = document.createElement('td');
		tdFromDate.innerHTML = data[i].from_date;

		var tdToDate = document.createElement('td');
		tdToDate.innerHTML = data[i].to_date;

		tr.appendChild(tdEmpNo);
		tr.appendChild(tdTitle);
		tr.appendChild(tdFromDate);
		tr.appendChild(tdToDate);

		addActionsToRecord(tr);

		tbody.appendChild(tr);
	}
}

function fillTableWithSalaries (data) {
	// LLENANDO ENCABEZADOS DE TABLA
	var thead = document.getElementById('thead');
	
	var tr = document.createElement('tr');

	var thEmpNo = document.createElement('th');
	thEmpNo.innerHTML = 'Numero';

	var thSalary = document.createElement('th');
	thSalary.innerHTML = 'Salario';

	var thFromDate = document.createElement('th');
	thFromDate.innerHTML = 'Desde';

	var thToDate = document.createElement('th');
	thToDate.innerHTML = 'Hasta';

	var thActions = document.createElement('th');
	thActions.innerHTML = 'Acciones';

	tr.appendChild(thEmpNo);
	tr.appendChild(thSalary);
	tr.appendChild(thFromDate);
	tr.appendChild(thToDate);
	tr.appendChild(thActions);

	thead.appendChild(tr);


	// LLENANDO CUERPO DE TABLA
	var tbody = document.getElementById('tbody');

	for (let i=0 ; i<15 ; i++) {
		var tr = document.createElement('tr');
		
		var tdEmpNo = document.createElement('td');
		tdEmpNo.innerHTML = data[i].emp_no;

		var tdSalary = document.createElement('td');
		tdSalary.innerHTML = '$ ' + data[i].salary;

		var tdFromDate = document.createElement('td');
		tdFromDate.innerHTML = data[i].from_date;

		var tdToDate = document.createElement('td');
		tdToDate.innerHTML = data[i].to_date;

		tr.appendChild(tdEmpNo);
		tr.appendChild(tdSalary);
		tr.appendChild(tdFromDate);
		tr.appendChild(tdToDate);

		addActionsToRecord(tr);

		tbody.appendChild(tr);
	}
}