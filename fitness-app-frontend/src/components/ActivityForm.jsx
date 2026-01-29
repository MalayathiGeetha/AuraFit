import React, { useState } from 'react'
import { Box, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import { addActivity } from '../services/api'
import { motion } from 'framer-motion'
import { Plus, Timer, Flame, Activity as ActivityIcon } from 'lucide-react'

const ActivityForm = ({ onActivityAdded }) => {
    const [activity, setActivity] = useState({
        type: "RUNNING", duration: '', caloriesBurned: '',
        additionalMetrics: {}
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');

        if (!userId) {
            console.error("No userId found, cannot add activity");
            alert("Please log in again. Your session may have expired.");
            return;
        }

        setLoading(true);
        try {
            // Pass userId explicitly and add a timeout for better feedback
            await addActivity(
                { ...activity, userId },
                {
                    headers: { 'X-User-ID': userId },
                    timeout: 10000 // 10 second timeout
                }
            );
            onActivityAdded();
            setActivity({ type: "RUNNING", duration: '', caloriesBurned: '' })
            alert("Activity added successfully!");
        } catch (error) {
            console.error("Error adding activity:", error);
            if (error.code === 'ECONNABORTED') {
                alert("The request took too long. Please check if the Activity Service is running.");
            } else {
                alert("Failed to add activity. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    }

    const inputStyles = {
        '& .MuiOutlinedInput-root': {
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
            '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
            '&.Mui-focused fieldset': { borderColor: 'var(--primary)' },
        },
        '& .MuiInputLabel-root': { color: 'var(--text-secondary)' },
        '& .MuiInputLabel-root.Mui-focused': { color: 'var(--primary)' },
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card"
            style={{ padding: '2rem', marginBottom: '2rem' }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Plus size={20} color="var(--primary)" />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Log New Activity</h3>
            </div>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr auto' }, gap: 2, alignItems: 'center' }}>
                <FormControl fullWidth sx={inputStyles}>
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={activity.type}
                        label="Type"
                        onChange={(e) => setActivity({ ...activity, type: e.target.value })}
                        startAdornment={<ActivityIcon size={18} style={{ marginRight: '8px', color: 'var(--text-secondary)' }} />}
                    >
                        <MenuItem value="RUNNING">Running</MenuItem>
                        <MenuItem value="WALKING">Walking</MenuItem>
                        <MenuItem value="CYCLING">Cycling</MenuItem>
                        <MenuItem value="YOGA">Yoga</MenuItem>
                        <MenuItem value="SWIMMING">Swimming</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    label="Duration (min)"
                    type="number"
                    value={activity.duration}
                    onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
                    sx={inputStyles}
                    InputProps={{
                        startAdornment: <Timer size={18} style={{ marginRight: '8px', color: 'var(--text-secondary)' }} />
                    }}
                />

                <TextField
                    fullWidth
                    label="Calories"
                    type="number"
                    value={activity.caloriesBurned}
                    onChange={(e) => setActivity({ ...activity, caloriesBurned: e.target.value })}
                    sx={inputStyles}
                    InputProps={{
                        startAdornment: <Flame size={18} style={{ marginRight: '8px', color: 'var(--text-secondary)' }} />
                    }}
                />

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    type="submit"
                    style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        color: 'white',
                        border: 'none',
                        fontWeight: '600',
                        cursor: 'pointer',
                        height: '56px',
                        minWidth: '140px',
                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)',
                        opacity: loading ? 0.7 : 1
                    }}
                >
                    {loading ? 'Adding...' : 'Add Activity'}
                </motion.button>
            </Box>
        </motion.div>
    )
}

export default ActivityForm
