import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { saveTenderToStorage, getTendersFromStorage } from '../utils/localStorageHelpers';

const AdminPanel = () => {
    const [tenderName, setTenderName] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState(Number);
    const [endTime, setEndTime] = useState(Number);
    const [bufferTime, setBufferTime] = useState(Number);
    const [tenders, setTenders] = useState(getTendersFromStorage());

    const handleCreateTender = () => {
        const newTender = {
            id: Date.now(),
            tenderName,
            description,
            startTime,
            endTime,
            bufferTime,
            bids: [],
        };

        saveTenderToStorage(newTender);

        setTenders((prevTenders) => [...prevTenders, newTender]);

        setTenderName('');
        setDescription('');
        setStartTime('');
        setEndTime('');
        setBufferTime('');
    };

    return (
        <Container style={{ backgroundColor: '#1c1c1c', color: '#fff', padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center', color: '#ff9f00' }}>
                Admin Panel
            </Typography>

            <Paper style={{ padding: '20px', backgroundColor: '#2e2e2e', borderRadius: '8px', marginBottom: '20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Tender Name"
                            fullWidth
                            value={tenderName}
                            onChange={e => setTenderName(e.target.value)}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', backgroundColor: '#333', borderRadius: '4px' } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            fullWidth
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', backgroundColor: '#333', borderRadius: '4px' } }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Start Time"
                            type="datetime-local"
                            fullWidth
                            value={startTime}
                            onChange={e => setStartTime(e.target.value)}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', backgroundColor: '#333', borderRadius: '4px' } }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="End Time"
                            type="datetime-local"
                            fullWidth
                            value={endTime}
                            onChange={e => setEndTime(e.target.value)}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', backgroundColor: '#333', borderRadius: '4px' } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Buffer Time (in minutes)"
                            fullWidth
                            value={bufferTime}
                            onChange={e => setBufferTime(e.target.value)}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', backgroundColor: '#333', borderRadius: '4px' } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" fullWidth style={{ backgroundColor: '#ff9f00', color: '#000' }} onClick={handleCreateTender}>
                            Create Tender
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            <Typography variant="h5" style={{ color: '#ff9f00', marginBottom: '20px' }}>
                Previous Tenders
            </Typography>

            {tenders.map((tender, index) => (
                <Paper key={index} style={{ padding: '15px', backgroundColor: '#2e2e2e', color: '#fff', borderRadius: '8px', marginBottom: '10px' }}>
                    <Typography variant="h6" style={{ color: '#ff9f00' }}>{tender.tenderName}</Typography>
                    <Typography>{tender.description}</Typography>
                    <Typography>Start Time: {tender.startTime}</Typography>
                    <Typography>End Time: {tender.endTime}</Typography>
                </Paper>
            ))}
        </Container>
    );
};

export default AdminPanel;
