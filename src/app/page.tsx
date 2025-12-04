import { redirect } from 'next/navigation';
import OverviewPage from './homepage/page';

  export default function HomePage()  {
    // redirect('/dashboard');
    return <OverviewPage />;
  }
