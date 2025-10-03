import { cookies } from 'next/headers';

export function getServerSideToken(): string | null {
  try {
  const jar = cookies();
  // Using index access to avoid depending on specific type signature
  const tokenEntry = (jar as unknown as { get(name: string): { value: string } | undefined }).get('admin_token');
  return tokenEntry?.value || null;
  } catch {
    return null;
  }
}
