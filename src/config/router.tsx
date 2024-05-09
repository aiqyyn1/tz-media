import { createBrowserRouter } from 'react-router-dom';
import UserTable from '../components/UserTable';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <UserTable />,
  },
]);
