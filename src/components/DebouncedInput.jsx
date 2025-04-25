import React, { useState, useEffect } from 'react'

import { TextField } from '@mui/material'

import { SearchIcon } from '../shared/icons';

export default function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    size,
    ...props
  }) {
    const [value, setValue] = useState(initialValue);
  
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);
  
      return () => clearTimeout(timeout);
    }, [value]);
  
    return (
      <TextField
        {...props}
        value={value}
        variant="outlined"
        color="info"
        onChange={(e) => setValue(e.target.value)}
        size={size}
        slotProps={{
            input: {
                startAdornment: <SearchIcon/>
            }
        }}
      />
    );
  }