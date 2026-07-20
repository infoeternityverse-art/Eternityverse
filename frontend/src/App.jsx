import { RouterProvider } from 'react-router-dom';
import { SessionRestore } from '@/components/common/session-restore.jsx';
import { ThemeSync } from '@/components/common/theme-sync.jsx';
import { QueryProvider } from '@/providers/query-provider.jsx';
import { router } from '@/routes/router.jsx';

function App() {
  return (
    <QueryProvider>
      <ThemeSync />
      <SessionRestore>
        <RouterProvider router={router} />
      </SessionRestore>
    </QueryProvider>
  );
}

export default App;
