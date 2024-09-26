import React from 'react';
import AdminPanel from './components/AdminPanel';
import UserView from './components/UserView';
import { Container, AppBar, Toolbar, Typography, Grid } from '@mui/material';

function App() {
  return (
    <div style={{ backgroundColor: '#333', minHeight: '100vh', padding: '4px' }}> 
      <AppBar position="static" style={{ backgroundColor: '#444' }}> 
        <Toolbar>
          <Typography variant="h4" style={{ color: '#ff9f00' }}>
            Tender Management System
          </Typography>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: '40px' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <AdminPanel />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserView />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
