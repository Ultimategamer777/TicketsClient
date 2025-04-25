import { useTheme, useMediaQuery } from '@mui/material';

import api from '../lib/axios';

import { useNavigate } from 'react-router-dom';

export function useHelper() {
  const theme = useTheme();

  const isSmallService = useMediaQuery(theme.breakpoints.down('md'));
  const isMediumService = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const isLargeService = useMediaQuery(theme.breakpoints.up('md'));

  const navigation = useNavigate(); 

  return {
    isSmallService,
    isMediumService,
    isLargeService, 
    api, 
    navigation
  };
}
