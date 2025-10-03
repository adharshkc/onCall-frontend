"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface Props {
	year: number;
}

const linkBase = 'block px-3 py-2 rounded text-sm';

export default function AdminSidebar({ year }: Props) {
	const pathname = usePathname();
	const { logout } = useAuth();
	const isActive = (href: string) => pathname.startsWith(href);

	const handleLogout = async () => {
		await logout();
	};

	return (
		<div className="flex flex-col h-full">
			<div className="p-4 border-b font-semibold text-lg">Admin Panel</div>
			<nav className="flex-1 p-4 space-y-1">
				<Link className={`${linkBase} hover:bg-gray-100 ${isActive('/admin/dashboard') ? 'bg-gray-200 font-medium' : ''}`} href="/admin/dashboard">Dashboard</Link>
				<Link className={`${linkBase} hover:bg-gray-100 ${isActive('/admin/contacts') ? 'bg-gray-200 font-medium' : ''}`} href="/admin/contacts">Contacts</Link>
				<Link className={`${linkBase} hover:bg-gray-100 ${isActive('/admin/services') ? 'bg-gray-200 font-medium' : ''}`} href="/admin/services">Services</Link>
				<button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-100 text-red-600">Logout</button>
			</nav>
			<div className="p-4 border-t text-[11px] text-gray-500">&copy; {year} On Call</div>
		</div>
	);

}
