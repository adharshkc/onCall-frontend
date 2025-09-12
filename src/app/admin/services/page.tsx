"use client";
import React, { useEffect, useState } from 'react';

interface Service {
	id: string;
	title: string;
	description: string;
}

export default function ServicesAdminPage() {
	const [services, setServices] = useState<Service[]>([]);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Fetch services (placeholder logic)
	useEffect(() => {
		// Replace with real fetch
		// fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_BASE}/services`, { headers: { Authorization: `Bearer ${token}` }}).then(...)
		setServices([
			{ id: '1', title: 'Dementia Care', description: 'Specialized support for individuals with dementia.' },
			{ id: '2', title: 'Live in Care', description: '24/7 personal care at home.' },
		]);
	}, []);

	const addService = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			// const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_BASE}/services`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`}, body: JSON.stringify({ title, description }) });
			// const newService = await res.json();
			const newService: Service = { id: Math.random().toString(36).slice(2), title, description };
			setServices(prev => [newService, ...prev]);
			setTitle('');
			setDescription('');
		} catch {
			setError('Failed to add service');
		} finally {
			setLoading(false);
		}
	};

	const deleteService = async (id: string) => {
		// await fetch(..., { method: 'DELETE' })
		setServices(prev => prev.filter(s => s.id !== id));
	};

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-2xl font-semibold">Services</h1>
				<p className="text-sm text-gray-500">Add or remove services displayed on the site.</p>
			</div>

			<form onSubmit={addService} className="grid gap-3 max-w-xl p-4 border rounded bg-white shadow-sm">
				<h2 className="text-sm font-semibold">Add Service</h2>
				<div className="space-y-1">
					<label className="block text-xs font-medium uppercase tracking-wide">Title</label>
						<input value={title} onChange={e=>setTitle(e.target.value)} required className="w-full border rounded px-3 py-2 text-sm" />
				</div>
				<div className="space-y-1">
					<label className="block text-xs font-medium uppercase tracking-wide">Description</label>
					<textarea value={description} onChange={e=>setDescription(e.target.value)} required rows={3} className="w-full border rounded px-3 py-2 text-sm" />
				</div>
				{error && <div className="text-xs text-red-600">{error}</div>}
				<button disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded disabled:opacity-60">{loading ? 'Saving...' : 'Add Service'}</button>
			</form>

			<div className="space-y-3">
				<h2 className="text-sm font-semibold">Existing Services</h2>
				<ul className="space-y-2">
					{services.map(s => (
						<li key={s.id} className="p-4 bg-white border rounded shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
							<div>
								<div className="font-medium text-sm">{s.title}</div>
								<p className="text-xs text-gray-600 mt-1 max-w-xl">{s.description}</p>
							</div>
							<div className="flex gap-2">
								<button onClick={()=>deleteService(s.id)} className="text-xs px-3 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50">Delete</button>
							</div>
						</li>
					))}
					{services.length === 0 && <li className="text-xs text-gray-500">No services yet.</li>}
				</ul>
			</div>
		</div>
	);
}
