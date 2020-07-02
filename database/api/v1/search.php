<?php

header('Content-Type: application/json');
require('../../connection.php');

$table = $_GET['section'];					// employees, salaries, title or departments
$page = ($_GET['page'] - 1) * 15;			// (0-1) * 15
$orderBy = $_GET['order_by'];				// emp_no, first_name, dept_name, etc
$ascOrDesc = $_GET['order_asc_desc'];		// ASC or DESC
$search = $_GET['search'];					// Search (Dieg, d001, 10050)

$query = '';
switch ($table) {
	case 'employees':
		$query = "SELECT emp_no, first_name, last_name, hire_date FROM employees WHERE $orderBy LIKE '%$search%'";
	break;
	case 'departments':
		$query = "SELECT departments.dept_no, departments.dept_name, COUNT(dept_emp.dept_no) AS total_employees FROM departments JOIN dept_emp ON departments.dept_no = dept_emp.dept_no WHERE $orderBy LIKE '%$search%' GROUP BY departments.dept_no";
	break;
	case 'titles':
		$query = "SELECT * FROM titles WHERE $orderBy LIKE '%$search%'";
	break;
	case 'salaries':
		$query = "SELECT * FROM salaries WHERE $orderBy LIKE '%$search%'";
	break;
}
if ($orderBy == 'undefined' && $ascOrDesc == 'undefined') {
	$query .= " LIMIT $page, 15";
} else {
	$query .= " ORDER BY $orderBy $ascOrDesc LIMIT $page, 15";
}

$result = mysqli_query($link, $query);

$records = [];
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
	array_push($records, $row);
}

echo json_encode($records);