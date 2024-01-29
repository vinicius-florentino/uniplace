import { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const DeleteUserDialog = ({ onClose, open }) => {
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => onClose(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Deletar conta</DialogTitle>
            <DialogContent>
                <Box noValidate component="form" onSubmit={deleteUser}>
                    <Grid container spacing={0} rowSpacing={2}>
                        <Grid item xs={12}>
                            <Typography>
                                Depois que sua conta for excluída, todos os seus
                                recursos e dados serão excluídos
                                permanentemente. Por favor digite sua senha para
                                confirmar que deseja excluir permanentemente sua
                                conta.
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                id="password"
                                type="password"
                                name="password"
                                label="Senha"
                                ref={passwordInput}
                                value={data.password}
                                error={!!errors.password}
                                helperText={errors.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                fullWidth
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            display={"flex"}
                            justifyContent={"end"}
                            alignItems={"center"}
                            gap={"5px"}
                        >
                            <Button
                                variant="containedLight"
                                disableElevation
                                onClick={onClose}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="containedDanger"
                                disableElevation
                                disabled={processing}
                                type="submit"
                            >
                                Deletar conta
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default function DeleteUserForm() {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    return (
        <>
            <Button
                variant="containedDanger"
                type="submit"
                disableElevation
                sx={{
                    width: { xs: "100%", md: "auto" },
                }}
                onClick={handleOpenDeleteDialog}
            >
                Delete sua conta
            </Button>

            {openDeleteDialog && (
                <DeleteUserDialog
                    open={openDeleteDialog}
                    onClose={handleCloseDeleteDialog}
                />
            )}
        </>
    );
}
