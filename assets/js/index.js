var showSearchBar = false;

document.addEventListener('DOMContentLoaded', function () {
	localStorage.setItem('page', '1');

	retrieveTable('employees');

	listenersToChangeTables();

	listenersToPagination();

	// EVENT LISTENERS PARA BOTON DE FILTROS
	document.getElementById('filters-button').addEventListener('click', function () {
		showSearchBar = !showSearchBar;
		if (showSearchBar) {
			document.getElementById('filters').style.display = 'flex';
		} else {
			document.getElementById('filters').style.display = 'none';
		}
	});

	// EVENT LISTENER PARA BUSCAR REGISTROS
	document.getElementById('search-button').addEventListener('click', function () {
		searchRecords(localStorage.getItem('section'));
	})

	// BOTON DE CERRAR CUADRO DE AYUDA
	document.getElementById('close-helper-box').addEventListener('click', function () {
		document.querySelector('#helper-box').style.marginTop = '-50%';
	});
});

function listenersToChangeTables () {
	document.getElementById('table-employees').addEventListener('click', function () {
		localStorage.setItem('page', '1');
		
		if (localStorage.getItem('section') != 'employees') {
			var radioButtonsOptions = {
				first: {
					title: 'Numero de Empleado',
					nameIdValue: 'emp_no'
				},
				second: {
					title: 'Nombre',
					nameIdValue: 'first_name'
				},
				third: {
					title: 'Apellido',
					nameIdValue: 'last_name'
				},
				fourth: {
					title: 'Fecha de Contratacion',
					nameIdValue: 'hire_date'
				}
			}
			changeFilterOptions(radioButtonsOptions);
		}

		retrieveTable('employees');
		selectTable('table-employees');
	});
	document.getElementById('table-departments').addEventListener('click', function () {
		localStorage.setItem('page', '1');

		if (localStorage.getItem('section') != 'departments') {
			var radioButtonsOptions = {
				first: {
					title: 'Numero de Departamento',
					nameIdValue: 'dept_no'
				},
				second: {
					title: 'Nombre del Departamento',
					nameIdValue: 'dept_name'
				},
				third: {
					title: 'Total de Empleados',
					nameIdValue: 'total_employees'
				}
			}
			changeFilterOptions(radioButtonsOptions);
		}

		retrieveTable('departments');
		selectTable('table-departments');
	});
	document.getElementById('table-titles').addEventListener('click', function () {
		localStorage.setItem('page', '1');

		if (localStorage.getItem('section') != 'titles') {
			var radioButtonsOptions = {
				first: {
					title: 'Numero de Empleado',
					nameIdValue: 'emp_no'
				},
				second: {
					title: 'Nombre del Titulo',
					nameIdValue: 'title'
				},
				third: {
					title: 'Fecha de inicio',
					nameIdValue: 'from_date'
				},
				fourth: {
					title: 'Fecha de Expiración',
					nameIdValue: 'to_date'
				}
			}
			changeFilterOptions(radioButtonsOptions);
		}

		retrieveTable('titles');
		selectTable('table-titles');
	});
	document.getElementById('table-salaries').addEventListener('click', function () {
		localStorage.setItem('page', '1');

		if (localStorage.getItem('section') != 'salaries') {
			var radioButtonsOptions = {
				first: {
					title: 'Numero de Empleado',
					nameIdValue: 'emp_no'
				},
				second: {
					title: 'Salario',
					nameIdValue: 'salary'
				},
				third: {
					title: 'Inicio del Año',
					nameIdValue: 'from_date'
				},
				fourth: {
					title: 'Fin del Año',
					nameIdValue: 'to_date'
				}
			}
			changeFilterOptions(radioButtonsOptions);
		}

		retrieveTable('salaries');
		selectTable('table-salaries');
	});
}

function listenersToPagination () {
	document.getElementById('prev-page').addEventListener('click', function () {
		var currentPage = localStorage.getItem('page');
		if (localStorage.getItem('current_action') == 'show_records') {
			if (currentPage != 1) {
				currentPage--;
				localStorage.setItem('page', currentPage);
				retrieveTable(localStorage.getItem('section'));
			} else {
				helperAlert('warning', 'No hay mas paginas', 'Actualmente estas en la pagina 1, no hay mas paginas antes.')
			}
		} else if (localStorage.getItem('current_action') == 'search_records') {
			if (currentPage != 1) {
				currentPage--;
				localStorage.setItem('page', currentPage);
				searchRecords(localStorage.getItem('section'));
			}
		}
	});
	document.getElementById('next-page').addEventListener('click', function () {
		var currentPage = localStorage.getItem('page');
		currentPage++;
		localStorage.setItem('page', currentPage);

		retrieveTable(localStorage.getItem('section'));
	});
}

function helperAlert (type, title, description) {
	var $helperBox = document.querySelector('#helper-box');
	var $iconfont = document.querySelector('#helper-iconfont');

	switch (type) {
		case 'warning':
			$helperBox.style.backgroundColor = '#CDC300';
			$iconfont.classList.add('flaticon-warning');
		break;
		case 'information':
			$helperBox.style.backgroundColor = '#0057BF';
			$iconfont.classList.add('flaticon-information');
		break;
		case 'success':
			$helperBox.style.backgroundColor = '#40B000';
			$iconfont.classList.add('flaticon-check');
		break;
	}

	var $titleHelperBox = document.querySelector('#title-information');
	$titleHelperBox.innerHTML = title;

	var $descriptionHelperBox = document.querySelector('#lore-information');
	$descriptionHelperBox.innerHTML = description;

	$helperBox.style.marginTop = '0';
}

function changeFilterOptions (options) {
	emptyFilters();
	var filterOptions = document.getElementById('filter-options');

	var h3Title = document.createElement('h3');
	filterOptions.appendChild(h3Title);

	Object.keys(options).forEach(function (option) {
		var divOrderBy = document.createElement('div');

		h3Title.innerHTML = 'Ordenar por';
		
		var radioButton = document.createElement('input');
		radioButton.setAttribute('type', 'radio');
		radioButton.setAttribute('name', 'order-by');
		radioButton.setAttribute('id', 'order-by-' + options[option].nameIdValue);
		radioButton.setAttribute('value', options[option].nameIdValue);

		var labelForRadio = document.createElement('label');
		labelForRadio.setAttribute('for', 'order-by-' + options[option].nameIdValue);
		labelForRadio.innerHTML = options[option].title;

		divOrderBy.appendChild(radioButton);
		divOrderBy.appendChild(labelForRadio);

		filterOptions.appendChild(divOrderBy);
	});

	// MARCA COMO SELECCIONADO LA PRIMERA OPCION DE LOS RADIO BUTTONS
	setFirstOptionChecked();
}

async function retrieveTable (tableName) {
	localStorage.setItem('current_action', 'show_records');
	
	var apiPath = 'database/api/v1/retrieve.php?';
	apiPath += `section=${tableName}&`;
	apiPath += `page=${localStorage.getItem('page')}&`;
	
	var form = document.getElementById('searchbar');
	
	var orderByOption = getRadioButtonChecked(form, 'order-by');
	apiPath += `order_by=${orderByOption}&`;

	var ascOrDescOption = getRadioButtonChecked(form, 'order-asc-desc');
	apiPath += `order_asc_desc=${ascOrDescOption}`;

	var response = await fetch(window.location.href + apiPath);
	var data = await response.json();
	console.log(data);

	fillTable(data, tableName);
}

async function searchRecords (tableName) {
	localStorage.setItem('current_action', 'search_records');

	var apiPath = 'database/api/v1/search.php?';
	apiPath += `section=${tableName}&`;
	apiPath += `page=${localStorage.getItem('page')}&`;

	var form = document.getElementById('searchbar');
	
	var orderByOption = getRadioButtonChecked(form, 'order-by');
	apiPath += `order_by=${orderByOption}&`;
	
	var ascOrDescOption = getRadioButtonChecked(form, 'order-asc-desc');
	apiPath += `order_asc_desc=${ascOrDescOption}&`;
	
	var recordSearched = form.elements['search'].value;
	apiPath += `search=${recordSearched}`;

	var response = await fetch(window.location.href + apiPath);
	var data = await response.json();
	console.log(data);

	if (data == '') {
		helperAlert('information', 'No hay registros encontrados', 'No se encontraron registros. Asegurate de que los filtros coincidan con lo que estas buscando.')
	}

	fillTable(data, tableName);
}

function getRadioButtonChecked (form, nameButtonGroup) {
	var valueChecked;
	var radioButtons = form.elements[nameButtonGroup];

	for (var i=0 ; i<radioButtons.length ; i++) {
		if (radioButtons[i].checked) {
			valueChecked = radioButtons[i].value;
			break;
		}
	}
	return valueChecked;
}

function setFirstOptionChecked () {
	var form = document.getElementById('searchbar');

	form.elements['order-by'][0].setAttribute('checked', '');
	form.elements['order-asc-desc'][0].setAttribute('checked', '');
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

function emptyFilters () {
	var filterOptions = document.getElementById('filter-options');
	filterOptions.innerHTML = '';
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