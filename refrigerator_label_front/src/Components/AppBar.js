import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
    white: {
        main: 'rgb(255,255,255)',
    },
    },
});

export default function ButtonAppBar() {
return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                冰箱物品管理
            </Typography>
                <ThemeProvider theme={theme}>
                    <Button variant="outlined" startIcon={<LogoutIcon />} color="white">
                        Logout
                    </Button>
            </ThemeProvider>
        </Toolbar>
    </AppBar>
    </Box>
);
}
