import { Box } from "@mui/material";

export const formatTitle = (text) => {
    const keywords = {
        'DESACTIVAR': 'warning.dark',
        'ELIMINAR': 'error.main',
        'ACTIVAR': 'success.main'
    };

    for (const [keyword, color] of Object.entries(keywords)) {
        if (text.includes(keyword)) {
            const parts = text.split(keyword);
            return (
                <>
                    {parts[0]}
                    <Box component="span" sx={{ color: color }}>{keyword}</Box>
                    {parts[1]}
                </>
            );
        }
    }
    return text;
};
