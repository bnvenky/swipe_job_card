import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Bookmarks from './components/Bookmarks';
import Jobs from './components/Jobs';
import { useState } from 'react';
import { JobProvider } from './contexts/JobContext';
import { SignedIn, SignedOut, SignInButton, UserButton, SignOutButton } from '@clerk/clerk-react';

const App = () => {
  const [activeSection, setActiveSection] = useState('jobs');

  return (
    <>
      {/* Show the login page if the user is signed out */}
      <SignedOut>
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <h1 className='text-2xl'>Welcome to Jobs Application &nbsp; </h1>
          <SignInButton className="text-blue-400"/>
        </div>
      </SignedOut>

      {/* Show header and JobProvider only if the user is signed in */}
      <SignedIn>
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
          {/* Left side: Logo */}
          <div className="text-xl font-bold">
            <a href="/">MyJobApp</a> {/* You can replace this with an <img> tag for a logo */}
          </div>

          {/* Right side: Profile icon and Logout button */}
          <div className="flex items-center space-x-4">
            <UserButton />
            <SignOutButton redirectUrl="/" /> {/* Immediately redirect to login page after logout */}
          </div>
        </header>

        <JobProvider>
          <Router>
            <div className="flex bg-gray-100 flex-col h-screen">
              <main className="flex-1 overflow-y-auto">
                <Routes>
                  <Route 
                    path="/" 
                    element={activeSection === 'jobs' ? <Jobs /> : <Bookmarks />} 
                  />
                  <Route 
                    path="/bookmarks" 
                    element={<Bookmarks />} 
                  />
                  {/* Redirect to "/" if a route does not match */}
                  <Route 
                    path="*" 
                    element={<Navigate to="/" />} 
                  />
                </Routes>
              </main>
              <nav className="bg-gray-900 fixed-bottom text-white py-4 shadow-md">
                <div className="flex justify-around items-center">
                  <button
                    onClick={() => setActiveSection('jobs')}
                    className="hover:bg-gray-700 px-6 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-110"
                  >
                    Jobs
                  </button>
                  <button
                    onClick={() => setActiveSection('bookmarks')}
                    className="hover:bg-gray-700 px-6 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-110"
                  >
                    Bookmarks
                  </button>
                </div>
              </nav>
            </div>
          </Router>
        </JobProvider>
      </SignedIn>
    </>
  );
};

export default App;
