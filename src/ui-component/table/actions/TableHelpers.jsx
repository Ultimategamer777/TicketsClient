import { useState, useEffect } from "react";

import { TextField } from "@mui/material";

import { rankItem } from "@tanstack/match-sorter-utils";

export const fuzzyFilter = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);
  
    // Store the itemRank info
    addMeta({
      itemRank,
    });
  
    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

export function DebouncedInput({
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
      />
    );
  }

  export function Filter({ column }) {
    const columnFilterValue = column.getFilterValue();
  
    return (
      <DebouncedInput
        value={columnFilterValue}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search...`}
      />
    );
  }