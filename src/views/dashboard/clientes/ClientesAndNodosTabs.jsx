import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import FormClientes from './components/FormClientes';
import NodosView from '../nodos';
import { useParams } from 'react-router';

export default function ClientesAndNodosTabs() {
    const [tab, setTab] = useState(0);
    const { id } = useParams();
    
    const handleChange = (event, newValue) => {
      setTab(newValue);
    };
  
    return (
      <Box sx={{ width: '100%' }}>
        <Tabs value={tab} onChange={handleChange} aria-label="Clientes y Nodos">
          <Tab label="Clientes" />
          <Tab label="Nodos" />
        </Tabs>
  
        <Box sx={{ mt: 2 }}>
          {tab === 0 && <FormClientes />}
          {tab === 1 && id && <NodosView clienteId={id} />} 
        </Box>
      </Box>
    );
  }