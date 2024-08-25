export default async function paginate({
	model,
	page = 1,
	pageSize = 10,
	where = {},
	include = [],
	order = [],
	returnAsJson = false
}) {
	let offset = (page - 1) * pageSize;
	let limit = pageSize;

	let { count, rows } = await model.findAndCountAll({
		where,
		order,
		offset,
		limit,
		include
	});

	let totalPages = Math.ceil(count / pageSize);

	let hasPrev = page > 1;
	let hasNext = page < totalPages;

	if (returnAsJson) {
		rows = rows.map((row) => row.toJSON());
	}

	return {
		page,
		pageSize,
		totalPages,
		totalItems: count,
		hasPrev,
		hasNext,
		items: rows
	};
}
