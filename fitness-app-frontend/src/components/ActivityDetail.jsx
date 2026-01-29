import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getActivityDetail, getRecommendation } from '../services/api';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Timer,
  Flame,
  Activity as ActivityIcon,
  Sparkles,
  TrendingUp,
  Lightbulb,
  ShieldAlert,
  Calendar
} from 'lucide-react';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const a = await getActivityDetail(id);
        let activityData = { ...a.data };

        try {
          const r = await getRecommendation(id);
          activityData = { ...activityData, ...r.data };
        } catch (recError) {
          console.error("Failed to fetch recommendation:", recError);
          // Still show activity even if recommendation fails
        }

        setActivity(activityData);
      } catch (error) {
        console.error("Failed to fetch activity detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <div className="animate-float" style={{ color: 'var(--primary)' }}>
          <ActivityIcon size={48} />
        </div>
      </div>
    );
  }

  if (!activity) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'none',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          marginBottom: '2rem',
          fontSize: '1rem',
          padding: '0.5rem 0'
        }}
      >
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: '2rem' }}>
        {/* Left Column: Activity Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <ActivityIcon size={24} color="var(--primary)" />
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{activity.type}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '2rem' }}>
              <Calendar size={14} />
              {new Date(activity.createdAt).toLocaleDateString()} at {new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(6, 182, 212, 0.1)', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center' }}>
                  <Timer size={20} color="var(--accent)" />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Duration</p>
                  <p style={{ fontSize: '1.125rem', fontWeight: '700', margin: 0 }}>{activity.duration} min</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(236, 72, 153, 0.1)', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center' }}>
                  <Flame size={20} color="var(--secondary)" />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Calories</p>
                  <p style={{ fontSize: '1.125rem', fontWeight: '700', margin: 0 }}>{activity.caloriesBurned} kcal</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {activity.recommendation && (
            <div className="glass" style={{ padding: '2.5rem', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Sparkles size={24} color="var(--primary)" />
                <h3 style={{ fontSize: '1.5rem', margin: 0 }} className="primary-gradient-text">AI Insights</h3>
              </div>

              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#fff', marginBottom: '2.5rem' }}>
                {activity.recommendation}
              </p>

              <div style={{ display: 'grid', gap: '2rem' }}>
                {activity.improvements && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--accent)' }}>
                      <TrendingUp size={18} />
                      <span style={{ fontWeight: '700', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Improvements</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {activity.improvements.map((item, i) => (
                        <div key={i} style={{ padding: '1rem', borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.95rem' }}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activity.suggestions && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                      <Lightbulb size={18} />
                      <span style={{ fontWeight: '700', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Next Steps</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {activity.suggestions.map((item, i) => (
                        <div key={i} style={{ padding: '1rem', borderRadius: '12px', backgroundColor: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.1)', fontSize: '0.95rem' }}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activity.safety && (
                  <div style={{ marginTop: '1rem', padding: '1.5rem', borderRadius: '16px', backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#ef4444' }}>
                      <ShieldAlert size={18} />
                      <span style={{ fontWeight: '700', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Safety Guidelines</span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      {activity.safety.map((item, i) => (
                        <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityDetail;
