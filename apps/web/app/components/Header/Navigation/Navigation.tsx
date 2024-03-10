import { auth } from '@/auth/auth';
import { NavAuthBtn } from './components/NavAuthBtn';
import { NavSearch } from './components/NavSearch';
import { NavLinks } from './components/NavLinks';

export async function Navigation() {
  const session = await auth();
  return (
    <nav className='flex size-full items-center'>
      <NavLinks />
      <div className='ml-auto flex items-center gap-14'>
        <NavSearch />
        <NavAuthBtn session={session} />
      </div>
    </nav>
  );
}
