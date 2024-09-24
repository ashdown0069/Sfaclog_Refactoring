import { auth } from '@/auth/auth';
import { NavAuthBtn } from './components/NavAuthBtn';
import { NavSearch } from './components/NavSearch';
import { NavLinks } from './components/NavLinks';
import { NavWriteLogBtn } from './NavWriteLogBtn';
import NavGuestBtn from './components/NavGuestBtn';
import { headers } from 'next/headers';
import { CountNotification } from './CountNotification';

export async function Navigation() {
  const session = await auth();
  const isLoggedin = session ? true : false;
  const countNoti = await CountNotification();

  return (
    <nav className='flex size-full items-center'>
      <NavLinks />
      <div className='ml-auto flex items-center gap-10'>
        <NavSearch />
        <NavWriteLogBtn isLoggedin={isLoggedin} />
        {!isLoggedin && <NavGuestBtn />}
        {isLoggedin && <NavAuthBtn unReadNotifications={countNoti} />}
      </div>
    </nav>
  );
}
