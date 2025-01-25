import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; 
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import EventList from './components/Events/EventList';
import CreateEvent from './components/Events/CreateEvent';
import ExhibitorForm from './components/Exhibitors/ExhibitorForm';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="container">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Private Routes */}
            <Route path="/" element={
              <PrivateRoute>
                <EventList />
              </PrivateRoute>
            } />
            <Route path="/create-event" element={
              <PrivateRoute>
                <CreateEvent />
              </PrivateRoute>
            } />
            <Route path="/event/:eventId/exhibitors" element={
              <PrivateRoute>
                <ExhibitorForm />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
