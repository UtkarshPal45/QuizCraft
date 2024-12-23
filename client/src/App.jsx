 import './App.css'
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage';
import CreateQuizPage from './pages/CreateQuizPage';
import QuizDetailsPage from './pages/QuizDetailsPage';
import TakeQuizPage from './pages/TakeQuizPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import {Layout, RequireAuth} from './layout/Layout';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <HomePage/>
        },
        {
          path: "/explore",
          element: <ExplorePage/>,
        },
        {
          path:"/login",
          element:<LoginPage/>
        },
        {
          path:"/signup",
          element:<SignupPage/>
        },
        {
          path:"/quiz-detail/:id",
          element:<QuizDetailsPage/>
        }

      ]
    },
    {
      path: "/",
      element: <RequireAuth/>,
      children:[
        {
          path: "/profile",
          element: <ProfilePage/>,
        },
        {
          path: "/profile/update",
          element: <UpdateProfilePage/>
        },
        {
          path: "/create-quiz",
          element: <CreateQuizPage/>
        },
        {
          path: "/take-quiz/:id",
          element: <TakeQuizPage/>
        },
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
