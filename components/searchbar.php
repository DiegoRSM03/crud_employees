<form id="searchbar" class="container">
	<div class="content">
		<div class="searchbox">
			<div class="button-box">
				<div id="filters-button" class="button">
					Filtros
					<span class="flaticon-down-arrow"></span>
				</div>
				<input type="text" name="search" id="search" placeholder="Que desea buscar?">
			</div>
			<div id="search-button" class="search-button button">
				Buscar
				<span class="flaticon-magnifying-glass"></span>
			</div>
		</div>
		<div id="filters">
			<div id="filter-options" class="sections">
				<h3>Ordenar por</h3>
				<div class="order-by">
					<input type="radio" name="order-by" id="order-by-id" value="emp_no" checked>
					<label for="order-by-id">Numero de Empleado</label>
				</div>
				<div class="order-by">
					<input type="radio" name="order-by" id="order-by-name" value="first_name">
					<label for="order-by-name">Nombre</label>
				</div>
				<div class="order-by">
					<input type="radio" name="order-by" id="order-by-surname" value="last_name">
					<label for="order-by-surname">Apellido</label>
				</div>
				<div class="order-by">
					<input type="radio" name="order-by" id="order-by-hire-date" value="hire_date">
					<label for="order-by-hire-date">Fecha de Contratacion</label>
				</div>
			</div>

			<div class="asc-desc">
				<h3>Ascendente o Descendente</h3>
				<div class="order">
					<input type="radio" name="order-asc-desc" id="order-asc" value="ASC" checked>
					<label for="order-asc">Ascendente</label>
				</div>
				<div class="order">
					<input type="radio" name="order-asc-desc" id="order-desc" value="DESC">
					<label for="order-desc">Descendente</label>
				</div>
			</div>
		</div>
	</div>
</form>