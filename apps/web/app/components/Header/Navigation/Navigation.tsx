import { auth } from '@/auth/auth';
import { NavAuthBtn } from './components/NavAuthBtn';
import { NavSearch } from './components/NavSearch';
import { NavLinks } from './components/NavLinks';
import { NavWriteLogBtn } from './NavWriteLogBtn';

export async function Navigation() {
  const session = await auth();
  return (
    <nav className='flex size-full items-center'>
      <NavLinks />
      <div className='ml-auto flex items-center gap-10'>
        <NavSearch />
        <NavWriteLogBtn isLoggedin={session ? true : false} />
        <NavAuthBtn
          isLoggedin={session ? true : false}
          avatar={session?.user?.image}
        />
      </div>
    </nav>
  );
}
