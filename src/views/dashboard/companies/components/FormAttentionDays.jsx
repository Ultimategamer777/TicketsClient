import { useState, useEffect } from "react";
import {
    Grid2,
    Stack,
    Paper,
    Table,
    TableCell,
    TableHead,
    TableBody,
    TableContainer,
    TableRow, 
    Typography, 
    Button
} from "@mui/material";
import InputField from "../../../../components/form_fields/InputField";
import CheckboxField from "../../../../components/form_fields/CheckBoxField";
import { useAttentionHours } from "../hooks/useAttetionHours"
import { useFormikContext } from "formik";
import AddHour from "./AddHour";

export default function FormAttentionDays() {
    const { attentionDays } = useAttentionHours();
    const { values, setFieldValue } = useFormikContext();
    
    // Estado para manejar todos los horarios
    const [schedules, setSchedules] = useState({});
    
    // Inicializar horarios cuando cambian los días seleccionados
    useEffect(() => {
        const initialSchedules = {};
        (values.attention_days || []).forEach(day => {
            initialSchedules[day] = values.schedules?.[day] || { 
                morning: [], 
                afternoon: [], 
                night: [] 
            };
        });
        setSchedules(initialSchedules);
    }, [values.attention_days]);

    const handleDaySelection = (dayValue) => {
        const currentDays = values.attention_days || [];
        const isSelected = currentDays.includes(dayValue);
        
        const newDays = isSelected
            ? currentDays.filter(d => d !== dayValue)
            : [...currentDays, dayValue];
        
        setFieldValue("attention_days", newDays);
        
        // Actualizar schedules al eliminar día
        if (isSelected) {
            setSchedules(prev => {
                const newSchedules = { ...prev };
                delete newSchedules[dayValue];
                return newSchedules;
            });
        }
    };

    // const handleAddHour = (day, period, idx, value) => {
    //     setSchedules(prev => {
    //         const newSchedule = { ...prev };
    //         newSchedule[day][period] = [
    //             ...newSchedule[day][period].slice(0, idx),
    //             value,
    //             ...newSchedule[day][period].slice(idx)
    //         ].filter((_, i) => i < 4); // Limitar a 4 slots
    //         return newSchedule;
    //     });
    // };

    const handleAddHour = (day, period, idx, value) => {
        setSchedules(prev => {
            const newSchedule = { ...prev };
            newSchedule[day][period] = [
                ...newSchedule[day][period].slice(0, idx),
                value,
                ...newSchedule[day][period].slice(idx)
            ].filter((_, i) => i < 4);
            return newSchedule;
        });
    };

    const handleRemoveHour = (day, period, idx) => {
        setSchedules(prev => {
            const newSchedule = { ...prev };
            newSchedule[day][period] = newSchedule[day][period]
                .filter((_, i) => i !== idx);
            return newSchedule;
        });
    };

    // Sincronizar con Formik
    useEffect(() => {
        setFieldValue("schedules", schedules);
    }, [schedules]);

    return (
        <Stack direction={"column"}>
            <Stack direction={"row"} flexWrap={"wrap"} justifyContent={"center"}>
                {attentionDays.map((day, index) => (
                    <CheckboxField
                        key={index}
                        label={day.label}
                        value={day.value}
                        checked={values.attention_days?.includes(day.value)}
                        name="attention_days"
                        onChange={() => handleDaySelection(day.value)}
                    />
                ))}
            </Stack>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Día</TableCell>
                            <TableCell>Matutino</TableCell>
                            <TableCell>Vespertino</TableCell>
                            <TableCell>Nocturno</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {values.attention_days?.map(day => (
                            <DayRow
                                key={day}
                                day={day}
                                schedule={schedules[day] || { morning: [], afternoon: [], night: [] }}
                                onAddHour={handleAddHour}
                                onRemoveHour={handleRemoveHour}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
}

// Componente para la fila del día
function DayRow({ day, schedule, onAddHour, onRemoveHour }) {
    return (
        <TableRow>
            <TableCell>{day}</TableCell>
            {['morning', 'afternoon', 'night'].map(period => (
                <TableCell key={period}>
                    <AttentionHours
                        period={period}
                        hours={schedule[period]}
                        onAdd={(idx, value) => onAddHour(day, period, idx, value)}
                        onRemove={(idx) => onRemoveHour(day, period, idx)}
                    />
                </TableCell>
            ))}
        </TableRow>
    );
}

// AttentionHours.jsx
function AttentionHours({ hours, period, onAdd, onRemove }) {
    const generatePastelColor = () => {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 50%, 30%)`;
    };

    const slots = Array.from({ length: 4 }, (_, i) => hours[i] || null);

    return (
        <Stack direction="row" spacing={1}>
            {slots.map((hour, idx) => 
                hour ? (
                    <Stack 
                        key={`${period}-${idx}`}
                        sx={{ 
                            borderRadius: 1,
                            p: 1,
                            minWidth: 80,
                            justifyContent: 'center'
                        }}
                    >
                        <Typography variant="body2" textAlign="center" sx={{color: hour.color}}>
                            {hour.initial}
                        </Typography>
                        <Typography variant="body2" textAlign="center" sx={{color: hour.color}}>
                            {hour.final}
                        </Typography>
                        <Button sx={{color: "red"}} onClick={() => onRemove(idx)}>Eliminar</Button>
                    </Stack>
                ) : (
                    <AddHour 
                        key={`${period}-${idx}`}
                        onAdd={(time) => onAdd(idx, { 
                            ...time, 
                            color: generatePastelColor() 
                        })}
                    />
                )
            )}
        </Stack>
    );
}