import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/allroutes';


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
