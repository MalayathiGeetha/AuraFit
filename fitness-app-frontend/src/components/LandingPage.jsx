import React, { useContext } from 'react';
import { AuthContext } from 'react-oauth2-code-pkce';
import { motion } from 'framer-motion';
import { Activity, Zap, Shield, BarChart3, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const { logIn, logOut, isAuthenticated, token, tokenData } = useContext(AuthContext);
    const navigate = useNavigate();
    const isAuth = isAuthenticated || !!token;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        logOut();
    };

    const features = [
        { icon: Zap, title: 'AI Insights', desc: 'Get personalized fitness recommendations powered by advanced AI.' },
        { icon: Shield, title: 'Secure Tracking', desc: 'Your data is encrypted and stored securely in our microservices.' },
        { icon: BarChart3, title: 'Visual Progress', desc: 'Track your journey with beautiful, interactive charts and metrics.' },
    ];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            {/* Background Glows */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '20%',
                width: '300px',
                height: '300px',
                background: 'var(--primary)',
                filter: 'blur(150px)',
                opacity: 0.2,
                zIndex: -1
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '20%',
                width: '300px',
                height: '300px',
                background: 'var(--secondary)',
                filter: 'blur(150px)',
                opacity: 0.15,
                zIndex: -1
            }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', maxWidth: '800px' }}
            >
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '100px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--surface-border)',
                    marginBottom: '2rem'
                }}>
                    <Activity size={16} className="primary-gradient-text" />
                    <span style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
                        The Future of Fitness is Here
                    </span>
                </div>

                {isAuth ? (
                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                        Welcome Back, <span className="primary-gradient-text">{tokenData?.name || 'Athlete'}</span>
                    </h1>
                ) : (
                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                        Elevate Your <span className="primary-gradient-text">Fitness</span> <br />
                        with AI Intelligence
                    </h1>
                )}

                {isAuth ? (
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                        You have successfully authenticated. Your personalized fitness dashboard and AI insights are ready for you.
                    </p>
                ) : (
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                        Track activities, analyze performance, and reach your goals faster with our AI-powered microservices architecture.
                    </p>
                )}

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    {!isAuth ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => logIn(null, { prompt: 'login' })}
                            style={{
                                padding: '1rem 2.5rem',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                color: 'white',
                                fontSize: '1.125rem',
                                fontWeight: '600',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)'
                            }}
                        >
                            Get Started Free <ArrowRight size={20} />
                        </motion.button>
                    ) : (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/activities')}
                                style={{
                                    padding: '1rem 2.5rem',
                                    borderRadius: '16px',
                                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                    color: 'white',
                                    fontSize: '1.125rem',
                                    fontWeight: '600',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)'
                                }}
                            >
                                Go to Dashboard <ArrowRight size={20} />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLogout}
                                style={{
                                    padding: '1rem 2rem',
                                    borderRadius: '16px',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    color: '#ef4444',
                                    fontSize: '1.125rem',
                                    fontWeight: '600',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem'
                                }}
                            >
                                Logout
                            </motion.button>
                        </div>
                    )}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1000px',
                    width: '100%',
                    marginTop: '6rem'
                }}
            >
                {features.map((feature, index) => (
                    <div key={index} className="glass-card" style={{ padding: '2rem' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem'
                        }}>
                            <feature.icon size={24} className="primary-gradient-text" />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{feature.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{feature.desc}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default LandingPage;
