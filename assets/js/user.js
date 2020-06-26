document.addEventListener('DOMContentLoaded', function () {
	var empNo = window.location.search.substring(8, window.location.search.length);
	retrieveEmployee(empNo);
});

async function retrieveEmployee (empNo) {
	
	var filePath = 'views/user.php';				// filePath = "views/user.php"
	var search = window.location.search;			// search = "?emp_no=10001"

	var localhost = window.location.href;			// localhost = "http://localhost/[project name]/views/user.php?emp_no=[emp_no]"
	localhost = localhost.replace(search, '');		// localhost = "http://localhost/[project name]/views/user.php";
	localhost = localhost.replace(filePath, ''); 	// localhost = "http://localhost/[project name]/"

	var table = localStorage.getItem('section');
	var response = await fetch(localhost + 'database/api/v1/' + table + '/retrieve_unique.php?emp_no=' + empNo);
	var data = await response.json();
	console.log(data);

	fillEmployeeInfo(data);

	fillTableWithSalaries(data);
}

function fillEmployeeInfo (data) {
	var firstName = data.info_titles_department[0].first_name;
	var lastName = data.info_titles_department[0].last_name;

	var birthDate = data.info_titles_department[0].birth_date;
	var department = data.info_titles_department[0].dept_name;
	
	var gender = "";
	(data.info_titles_department[0].gender) == 'M' ? gender = 'Male' : gender ='Female';
	
	var hireDate = data.info_titles_department[0].hire_date;
	
	if (data.info_titles_department[1] != null) {

	 	for (var i=0 ; i<2 ; i++) {
			var titleName = data.info_titles_department[i].title;
			var titleFromDate = data.info_titles_department[i].from_date;
			var titleToDate = data.info_titles_department[i].to_date;
			
			document.getElementById('title-' + (i+1)).innerHTML = titleName;
			document.getElementById('title-' + (i+1) + '-from-date').innerHTML = titleFromDate + ' to ';
			document.getElementById('title-' + (i+1) + '-to-date').innerHTML = titleToDate;
		}
		document.getElementById('iconfont-medal').classList.add('flaticon-certificate');

	} else {
		document.getElementById('title-1').innerHTML = data.info_titles_department[0].title;
		document.getElementById('title-1-from-date').innerHTML = data.info_titles_department[0].from_date;
		document.getElementById('title-1-to-date').innerHTML = data.info_titles_department[0].to_date;
	}


	document.getElementById('first-name').innerHTML = firstName;
	document.getElementById('last-name').innerHTML = lastName;

	document.getElementById('birth-date').innerHTML = birthDate;
	document.getElementById('department').innerHTML = department;
	document.getElementById('gender').innerHTML = gender;
	document.getElementById('hire-date').innerHTML = hireDate;
}

function fillTableWithSalaries (data) {
	var tbody = document.getElementById('tbody');

	data.salaries.forEach(function (salary, i) {
		var tr = document.createElement('tr');

		var tdMount = document.createElement('td');
		tdMount.innerHTML = '$ ' + salary.salary;

		var tdFromDate = document.createElement('td');
		tdFromDate.innerHTML = salary.from_date;

		var tdToDate = document.createElement('td');
		tdToDate.innerHTML = salary.to_date

		tr.appendChild(tdMount);
		tr.appendChild(tdFromDate);
		tr.appendChild(tdToDate);

		tbody.appendChild(tr);
	});

}