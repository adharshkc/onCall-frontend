import React from 'react';
async function getContacts() {
	// Replace with real API call
	// const res = await fetch(process.env.ADMIN_API + '/contacts', { headers: { Authorization: `Bearer ${token}` }});
	// return res.json();
	return [
		{ id: 1, name: 'John Doe', email: 'john@example.com', message: 'Interested in services.' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Need more info.' },
	];
}

export default async function ContactsPage() {
	const contacts = await getContacts();
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-semibold">Contacts</h1>
				<p className="text-sm text-gray-500">Leads / enquiries submitted via site.</p>
			</div>
			<div className="overflow-auto border rounded bg-white">
				<table className="min-w-full text-sm">
					<thead className="bg-gray-50 text-gray-600 text-xs uppercase">
						<tr>
							<th className="px-3 py-2 text-left">Name</th>
							<th className="px-3 py-2 text-left">Email</th>
							<th className="px-3 py-2 text-left">Message</th>
						</tr>
					</thead>
					<tbody>
						{contacts.map(c => (
							<tr key={c.id} className="border-t">
								<td className="px-3 py-2 whitespace-nowrap font-medium">{c.name}</td>
								<td className="px-3 py-2"><a href={`mailto:${c.email}`} className="text-blue-600 hover:underline">{c.email}</a></td>
								<td className="px-3 py-2 text-xs max-w-md">{c.message}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
