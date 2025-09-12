import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
// Admin layout keeps its own minimal stylesheet; no shared global front-site CSS.
import './admin.css';
import { Lora, Plus_Jakarta_Sans } from 'next/font/google';

const lora = Lora({
	variable: '--font-lora',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	style: ['normal', 'italic'],
});

const plusJakarta = Plus_Jakarta_Sans({
	variable: '--font-plus-jakarta',
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	style: ['normal', 'italic'],
});

export const metadata: Metadata = {
	title: 'Admin | On Call',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${lora.variable} ${plusJakarta.variable} min-h-screen flex bg-gray-100 text-gray-900`}>
				<div className="hidden md:block w-64 shrink-0 border-r border-gray-200 bg-white">
					<AdminSidebar year={new Date().getFullYear()} />
				</div>
				<div className="flex-1 flex flex-col min-w-0">
					<header className="md:hidden flex items-center justify-between p-3 bg-white border-b">
						<div className="font-semibold">Admin</div>
						<Link href="/admin/dashboard" className="text-sm text-accent-500 hover:text-accent-400 transition-colors">Dashboard</Link>
					</header>
					<main className="flex-1 p-4 md:p-6 space-y-6">
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}
