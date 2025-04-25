// react
import React, { useState, useEffect } from 'react';

// formik
import { useField } from 'formik';

// dayjs
import dayjs from 'dayjs';

// mui
import { Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePickerField(props) {
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && error && true;
  const { value } = field;
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
    }
  }, [value]);

  function _onChange(date) {
    if (date) {
      setSelectedDate(date);
      try {
        const ISODateString = date.toISOString();
        setValue(ISODateString);
      } catch (error) {
        setValue(date);
      }
    } else {
      setValue(date);
    }
  }

  return (
    <Grid container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          {...field}
          {...props}
          value={selectedDate ? dayjs(selectedDate) : null}
          onChange={(newValue) => _onChange(newValue ? newValue.toDate() : null)}
          slotProps={{
            textField: {
              error: isError,
              helperText: isError && error
            }
          }}
        />
      </LocalizationProvider>
    </Grid>
  );
}
