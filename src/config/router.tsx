import { createBrowserRouter } from 'react-router-dom';
import UserTable from '../components/UserTable';
import UserEdit from '../components/UserEdit';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <UserTable />,
  },
  {
    path: '/edit/:id',
    element: <UserEdit />,
  },
]);
