
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from 'react-oauth2-code-pkce'
import { useContext, useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from './store/authSlice';
import { Box, Container } from '@mui/material';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import ActivityDetail from './components/ActivityDetail';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import { AnimatePresence, motion } from 'framer-motion';

const ActivitiesPage = ({ userId }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleActivityAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Box sx={{ mb: 6 }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Your Dashboard</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Track and manage your fitness activities.</p>
      </Box>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        <ActivityForm onActivityAdded={handleActivityAdded} />
        <ActivityList refreshTrigger={refreshTrigger} userId={userId} />
      </div>
    </motion.div>
  );
}

const AppContent = () => {
  const { token, tokenData, isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    console.log("Auth State Update:", { isAuthenticated, hasToken: !!token, hasTokenData: !!tokenData });
    if (token && tokenData) {
      console.log("Auth successful, setting credentials for user:", tokenData.sub);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", tokenData.sub);
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  const isAuth = isAuthenticated || !!token;

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: isAuth ? '100px' : '0' }}>
        <Container maxWidth="lg">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<LandingPage />} />

              <Route path="/activities" element={
                isAuth ? (
                  authReady ? (
                    <ActivitiesPage userId={tokenData?.sub} />
                  ) : (
                    <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div className="animate-spin" style={{ width: '40px', height: '40px', border: '3px solid #8b5cf6', borderTopColor: 'transparent', borderRadius: '50%' }} />
                    </div>
                  )
                ) : (
                  <Navigate to="/" replace />
                )
              } />

              <Route path="/activities/:id" element={
                isAuth ? (
                  authReady ? (
                    <ActivityDetail />
                  ) : (
                    <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div className="animate-spin" style={{ width: '40px', height: '40px', border: '3px solid #8b5cf6', borderTopColor: 'transparent', borderRadius: '50%' }} />
                    </div>
                  )
                ) : (
                  <Navigate to="/" replace />
                )
              } />
            </Routes>
          </AnimatePresence>
        </Container>
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
