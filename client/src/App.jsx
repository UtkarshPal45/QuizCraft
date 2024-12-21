 import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar';
import ExplorePage from './pages/ExplorePage';
import CreateQuizPage from './pages/CreateQuizPage';
import QuizDetailsPage from './pages/QuizDetailsPage';
import TakeQuizPage from './pages/TakeQuizPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import UpdateProfilePage from './pages/UpdateProfilePage';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/create" element={<CreateQuizPage />} />
          <Route path="/quizDetails" element={<QuizDetailsPage/>} />
          <Route path="/takeQuiz" element={<TakeQuizPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/update-profile" element={<UpdateProfilePage/>} />
        </Routes>
      </div>
    </Router>
  )
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Layout/>,
  //     children: [
  //       {
  //         path: "/",
  //         element: <HomePage/>
  //       },
  //       {
  //         path: "/explore",
  //         element: <ExplorePage/>,
  //       },
  //       {
  //         path: "/:id",
  //         element: <SinglePage/>,
  //         loader: singlePageLoader
  //       },
  //       {
  //         path:"/login",
  //         element:<LoginPage/>
  //       },
  //       {
  //         path:"/signup",
  //         element:<SignupPage/>
  //       },
  //       {
  //         path:"/quiz-detail",
  //         element:<QuizDetailsPage/>
  //       }

  //     ]
  //   },
  //   {
  //     path: "/",
  //     element: <RequireAuth/>,
  //     children:[
  //       {
  //         path: "/profile",
  //         element: <ProfilePage/>,
  //         loader: profilePageLoader
  //       },
  //       {
  //         path: "/profile/update",
  //         element: <UpdateProfilePage/>
  //       },
  //       {
  //         path: "/create",
  //         element: <CreateQuizPage/>
  //       },
  //       {
  //         path: "/take-quiz",
  //         element: <TakeQuizPage/>
  //       },
  //     ]
  //   }
  // ])

  // return (
  //   <RouterProvider router={router}/>
  // )
}

export default App
