import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActivities } from '../services/api';
import { motion } from 'framer-motion';
import { Timer, Flame, ChevronRight, Activity as ActivityIcon, Calendar } from 'lucide-react';

const ActivityList = ({ refreshTrigger, userId }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      if (!userId) {
        console.warn("No userId provided to ActivityList");
        setLoading(false);
        return;
      }
      const response = await getActivities(userId);
      setActivities(response.data);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [refreshTrigger, userId]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <div className="animate-float" style={{ color: 'var(--primary)' }}>
          <ActivityIcon size={48} />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}
    >
      {activities.length === 0 ? (
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <ActivityIcon size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
          <p>No activities found. Start by adding one above!</p>
        </div>
      ) : (
        activities.map((activity) => (
          <motion.div
            key={activity.id}
            variants={item}
            className="glass-card"
            onClick={() => navigate(`/activities/${activity.id}`)}
            style={{
              padding: '1.5rem',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background Icon Watermark */}
            <ActivityIcon
              size={80}
              style={{
                position: 'absolute',
                right: '-10px',
                bottom: '-10px',
                opacity: 0.03,
                transform: 'rotate(-15deg)'
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                color: 'var(--primary)',
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '0.05em'
              }}>
                {activity.type}
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>
                <ChevronRight size={20} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Timer size={18} color="var(--accent)" />
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Duration</p>
                  <p style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>{activity.duration} min</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Flame size={18} color="var(--secondary)" />
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Calories</p>
                  <p style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>{activity.caloriesBurned} kcal</p>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-secondary)',
              fontSize: '0.8rem'
            }}>
              <Calendar size={14} />
              <span>{activity.timestamp ? new Date(activity.timestamp).toLocaleDateString() : 'Recent'}</span>
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default ActivityList;
