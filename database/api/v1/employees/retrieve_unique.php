<?php

header('Content-Type: application/json');

require('../../../connection.php');

$empNo = $_GET['emp_no'];

$userInfo = [
	'info_titles_department' => [],
	'salaries' => []
];


$query = "SELECT employees.emp_no, employees.first_name, employees.last_name, employees.gender, employees.birth_date, employees.hire_date, titles.title, titles.from_date, titles.to_date, departments.dept_name FROM employees JOIN titles ON titles.emp_no = employees.emp_no  JOIN dept_emp ON dept_emp.emp_no = employees.emp_no  JOIN departments ON departments.dept_no = dept_emp.dept_no WHERE employees.emp_no = $empNo";
$result = mysqli_query($link, $query);

while ($record = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
	array_push($userInfo['info_titles_department'], $record);
}


$query = "SELECT salary, from_date, to_date FROM salaries WHERE emp_no = $empNo";
$result = mysqli_query($link, $query);

while ($record = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
	array_push($userInfo['salaries'], $record);
}

echo json_encode($userInfo);
