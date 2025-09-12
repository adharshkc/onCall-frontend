import React from 'react';
import { getServerSideToken } from '@/utils/server-auth';
import Link from 'next/link';

export default async function DashboardPage() {
	const token = getServerSideToken();
	// In real usage, fetch summary stats from backend with token
	// const stats = await fetch(...)
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-semibold">Dashboard</h1>
				<p className="text-sm text-gray-500">Quick overview of admin activity.</p>
			</div>
			<div className="grid gap-4 md:grid-cols-3">
				{['Total Services','New Contacts','Other Metric'].map((t,i)=>(
					<div key={t} className="rounded border bg-white p-4 shadow-sm">
						<div className="text-xs uppercase tracking-wide text-gray-500">{t}</div>
						<div className="mt-2 text-2xl font-semibold">{(i+1)*3}</div>
					</div>
				))}
			</div>
			<div className="flex gap-3 text-sm">
				<Link href="/admin/contacts" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">View Contacts</Link>
				<Link href="/admin/services" className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-900">Manage Services</Link>
			</div>
			<pre className="text-[11px] bg-gray-900 text-gray-200 p-3 rounded overflow-auto">Token (debug): {token ? token.slice(0,20)+'...' : 'none'}</pre>
		</div>
	);
}
