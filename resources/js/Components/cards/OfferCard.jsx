import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import formatPrice from "@/Utils/formatPrice";
import RemixIcon from "../RemixIcon";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import QrCodeMensal from "../../Assets/qrcode-pix-plano-mensal.png";
import QrCodeSemestral from "../../Assets/qrcode-pix-plano-semestral.png";
import Image from "@/Components/Image";

import { useState } from "react";

const BenefitLine = ({ label }) => {
    return (
        <Typography
            sx={{
                fontSize: 16,
                color: "var(--dark-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "8px",
            }}
        >
            <RemixIcon
                className="ri-check-line"
                color="var(--success-color)"
                fontSize={"24px"}
            />
            <span>{label}</span>
        </Typography>
    );
};

function OfferCard({ name, description, price, benefits, processing }) {

    const [openDialog, setOpenDialog] = useState(false);
    const [openQrCode, setOpenQrCode] = useState(false);
    const [copied, setCopied] = useState(false);
    const [textTooltip, setTextTooltip] = useState("Copiar código");
    const [textCodigoMensal] = useState(
        "00020126360014BR.GOV.BCB.PIX0114+5512991875000520400005303986540539.905802BR5908Uniplace6006Lorena62070503***630466D8"
    );
    const [textCodigoSemestral] = useState(
        "00020126360014BR.GOV.BCB.PIX0114+55129918750005204000053039865406203.495802BR5908Uniplace6006Lorena62070503***63049E7F"
    );

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleCloseDialogs = () => {
        setOpenDialog(false);
        setOpenQrCode(false);
        setCopied(false);
        setTextTooltip("Copiar código");
    };

    const handleOpenQrCode = () => {
        setOpenQrCode(true);
    };

    const handleCopyToClipboard = () => {
        const textToCopy =
            name === "Mensal" ? textCodigoMensal : textCodigoSemestral;

        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTextTooltip("Código copiado");
        });
    };

    return (
        <Card
            sx={{
                width: "280px",
                maxHeight: "auto",
                boxShadow: "var(--box-shadow)",
            }}
        >
            <CardContent sx={{ p: 0 }}>
                <Box
                    noValidate
                    sx={{
                        p: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 20,
                            textAlign: "start",
                            color: "var(--primary-color)",
                        }}
                    >
                        {name}
                    </Typography>
                </Box>
                <Box
                    noValidate
                    sx={{
                        px: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 24,
                            fontWeight: 300,
                            textAlign: "start",
                        }}
                    >
                        {formatPrice(price)}
                    </Typography>
                </Box>
                <Box
                    noValidate
                    sx={{
                        px: 2,
                        py: 1,
                    }}
                    display="flex"
                    alignItems="center"
                >
                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: 300,
                            textAlign: "start",
                            height: 200,
                        }}
                    >
                        {description}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        p: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        disabled={processing}
                        disableElevation
                        onClick={handleClickOpen}
                        fullWidth
                    >
                        Assinar
                    </Button>
                </Box>
                <Dialog
                    open={openDialog}
                    keepMounted
                    onClose={handleCloseDialogs}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>Assinar o plano {name}</DialogTitle>
                    <DialogActions>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                        >
                            <Button onClick={handleCloseDialogs}>
                                Cancelar
                            </Button>
                            <Button onClick={handleOpenQrCode}>Assinar</Button>
                        </Box>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openQrCode}
                    keepMounted
                    onClose={handleCloseDialogs}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        Plano {name}
                    </DialogTitle>
                    <DialogContent dividers>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                        >
                            <Box width="100%" maxWidth="300px">
                                <Image
                                    src={
                                        name === "Mensal"
                                            ? QrCodeMensal
                                            : QrCodeSemestral
                                    }
                                    alt={`QR Code for ${name} plan`}
                                    style={{
                                        objectFit: "contain",
                                        width: "100%",
                                        height: "auto",
                                    }}
                                />
                            </Box>
                            <Typography
                                justifyContent="start"
                                display="flex"
                                flexDirection="row"
                            >
                                Código copia e cola
                            </Typography>
                            <Typography
                                sx={{
                                    wordBreak: "break-all",
                                    marginTop: "10px",
                                    maxWidth: "250px",
                                    my: "20px",
                                }}
                            >
                                {name === "Mensal"
                                    ? textCodigoMensal
                                    : textCodigoSemestral}
                            </Typography>
                            <Box sx={{ mb: "10px" }}>
                                <Tooltip arrow title={textTooltip}>
                                    <IconButton onClick={handleCopyToClipboard}>
                                        <RemixIcon
                                            className={
                                                copied
                                                    ? "ri-file-copy-fill"
                                                    : "ri-file-copy-line"
                                            }
                                        />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    </DialogContent>
                </Dialog>
                <Box
                    noValidate
                    sx={{
                        p: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 16,
                            color: "var(--dark-color)",
                        }}
                    >
                        Benefícios:
                    </Typography>
                </Box>
                <Box
                    noValidate
                    sx={{
                        p: 2,
                    }}
                >
                    {benefits?.map((benefit, index) => (
                        <BenefitLine key={index} label={benefit} />
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}

export default OfferCard;
