import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function ResponsiveDialog() {
const [open, setOpen] = React.useState(false);
const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

return (
    <div>
    <IconButton onClick={handleClickOpen}>
        <DeleteIcon/>
    </IconButton>
    <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
    >
        <DialogTitle id="responsive-dialog-title">
        {"確認刪除該項目？"}
        </DialogTitle>
        <DialogActions>
        <Button autoFocus onClick={handleClose}>
            確認
        </Button>
        <Button onClick={handleClose} autoFocus>
            取消
        </Button>
        </DialogActions>
    </Dialog>
    </div>
);
}
