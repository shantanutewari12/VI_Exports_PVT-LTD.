import React, { useState, useEffect } from 'react';
import { getTendersFromStorage, saveBidToStorage } from '../utils/localStorageHelpers';
import { TextField, Button, Container, Typography, Paper, Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Grid from '@mui/material/Grid';

const UserView = () => {
    const [tenders, setTenders] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [bidsData, setBidsData] = useState({});

    useEffect(() => {
        const tendersFromStorage = getTendersFromStorage();
        setTenders(tendersFromStorage);
    }, []);

    const handleBidSubmission = (tenderId, endTime, bufferTime) => {
        const currentTime = new Date();
        const tenderEndTime = new Date(endTime);
        const bidDetails = bidsData[tenderId] || {};
        const { companyName = '', bidAmount = '' } = bidDetails;

        const bid = {
            companyName,
            bidAmount,
            bidTime: currentTime.toLocaleString(),
        };

        const timeDifference = tenderEndTime - currentTime;
        const isLastMinuteBid = timeDifference <= 5 * 60 * 1000;

        saveBidToStorage(tenderId, bid);

        setTenders((prevTenders) => 
            prevTenders.map((tender) => {
                if (tender.id === tenderId) {
                    tender.bids.push(bid);
                    if (isLastMinuteBid) {
                        tender.endTime = new Date(tenderEndTime.getTime() + bufferTime * 60 * 1000).toISOString();
                    }
                }
                return tender;
            })
        );

        setOpenSnackbar(true);
        
        setBidsData((prev) => ({
            ...prev,
            [tenderId]: { companyName: '', bidAmount: '' },
        }));
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleInputChange = (tenderId, field, value) => {
        setBidsData((prev) => ({
            ...prev,
            [tenderId]: {
                ...prev[tenderId],
                [field]: value,
            },
        }));
    };

    return (
        <Container style={{ backgroundColor: '#1c1c1c', color: '#fff', padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center', color: '#ff9f00' }}>
                Available Tenders
            </Typography>

            {tenders.map((tender, index) => (
                <Paper key={index} style={{ padding: '15px', backgroundColor: '#2e2e2e', borderRadius: '8px', marginBottom: '10px' }}>
                    <Typography variant="h6" style={{ color: '#ff9f00' }}>{tender.tenderName}</Typography>
                    <Typography>{tender.description}</Typography>
                    <Typography>End Time: {new Date(tender.endTime).toLocaleString()}</Typography>

                    <Grid container spacing={2} style={{ marginTop: '10px' }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Company Name"
                                fullWidth
                                value={bidsData[tender.id]?.companyName || ''}
                                onChange={e => handleInputChange(tender.id, 'companyName', e.target.value)}
                                InputLabelProps={{ style: { color: '#fff' } }}
                                InputProps={{ style: { color: '#fff', backgroundColor: '#333', borderRadius: '4px' } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Bid Amount"
                                fullWidth
                                value={bidsData[tender.id]?.bidAmount || ''}
                                onChange={e => handleInputChange(tender.id, 'bidAmount', e.target.value)}
                                InputLabelProps={{ style: { color: '#fff' } }}
                                InputProps={{ style: { color: '#fff', backgroundColor: '#333', borderRadius: '4px' } }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth style={{ backgroundColor: '#ff9f00', color: '#000' }} onClick={() => handleBidSubmission(tender.id, tender.endTime, tender.bufferTime)}>
                                Submit Bid
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Display Bids Table */}
                    {tender.bids && tender.bids.length > 0 && (
                        <TableContainer style={{ marginTop: '20px', backgroundColor: '#2e2e2e', borderRadius: '8px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ color: '#ff9f00' }}>Company Name</TableCell>
                                        <TableCell style={{ color: '#ff9f00' }}>Bid Time</TableCell>
                                        <TableCell style={{ color: '#ff9f00' }}>Bid Cost</TableCell>
                                        <TableCell style={{ color: '#ff9f00' }}>Last 5 Min Flag</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tender.bids
                                        .slice()
                                        .sort((a, b) => parseFloat(a.bidAmount) - parseFloat(b.bidAmount))
                                        .map((bid, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{bid.companyName}</TableCell>
                                                <TableCell>{bid.bidTime}</TableCell>
                                                <TableCell>{bid.bidAmount}</TableCell>
                                                <TableCell>
                                                    {new Date(bid.bidTime) >= new Date(tender.endTime) - 5 * 60 * 1000 ? "Yes" : "No"}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Paper>
            ))}

            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Bid Submitted Successfully!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default UserView;
