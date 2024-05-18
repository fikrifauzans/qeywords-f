// src/components/HostingDomain.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, CircularProgress, Typography, Box, Divider } from '@mui/material';
import { NContainer } from 'app/components/NContainer';
import { SimpleCard } from 'app/components';
import { GET_SERVER } from 'app/server/Api';

function HostingDomain() {
    const [domain, setDomain] = useState('');
    const [available, setAvailable] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const checkDomain = async () => {
        setLoading(true);
        try {
            GET_SERVER('search-domain', { search: domain }, (res) => {
                const { data } = res?.data
                if (data?.result === "success") {
                    setAvailable(true)
                } else {
                    setAvailable(false);
                }
                setLoading(false);
            }, (e) => {
                setAvailable(false);
                setLoading(false);
            });
        } catch (error) {
            console.error('Error checking domain availability:', error);
            setLoading(false);
        }
    };

    const handleDomainChange = (e) => {
        setDomain(e.target.value);
        setAvailable(null); // Reset availability status when domain changes
    };

    const handleOrderClick = () => {
        navigate('/config', { state: { domain } });
    };

    return (
        <NContainer>
            <SimpleCard>
                <Typography variant="h6" component="h6" gutterBottom>
                    Cari Domain 
                </Typography>
                <Typography variant="p" component="p" gutterBottom>
                    Cari domain untuk hosting yang tersedia !
                </Typography>
                
                <br />
                <Divider />
                <br />
                <br />
                <Box display="flex" alignItems="center" mb={2}>
                    <TextField
                        label="Enter domain"
                        variant="outlined"
                        value={domain}
                        onChange={handleDomainChange}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={checkDomain}
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={24} />}
                        sx={{ ml: 2 }}
                    >
                        Cek Domain
                    </Button>
                </Box>
                {loading && (
                    <Box display="flex" justifyContent="center" mt={2}>
                        <CircularProgress />
                    </Box>
                )}
                {available !== null && !loading && (
                    <Box mt={2}>
                        {available ? (
                            <Box>
                                <Typography variant="p" color="success.main">
                                    Domain tersedia!
                                </Typography>
                                <Box mt={1}>
                                    <Button variant="contained" color="success" onClick={handleOrderClick}>
                                        Pesan Sekarang
                                    </Button>
                                </Box>
                            </Box>
                        ) : (
                            <Typography variant="p" color="error.main">
                                Domain invalid.
                            </Typography>
                        )}
                    </Box>
                )}
            </SimpleCard>
        </NContainer>
    );
}

export default HostingDomain;
