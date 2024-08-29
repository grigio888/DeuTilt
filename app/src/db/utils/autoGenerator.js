export async function generateSlug(string) {
	return string
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^a-z0-9-]/g, '');
}
