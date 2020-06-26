<?php

header('Content-Type: application/json');

require('../../../connection.php');

$page = $_GET['page'] - 1;
$page = 15 * $page;

$query = "SELECT departments.dept_no, departments.dept_name, COUNT(dept_emp.dept_no) AS total_employees FROM departments JOIN dept_emp ON departments.dept_no = dept_emp.dept_no GROUP BY departments.dept_no LIMIT $page, 15";
$result = mysqli_query($link, $query);

$departments = [];
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
	array_push($departments, $row);
}

echo json_encode($departments);