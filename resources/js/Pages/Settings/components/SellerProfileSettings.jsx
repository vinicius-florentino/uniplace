import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import {
    Box,
    Grid,
    TextField,
    Button,
    Switch,
    FormControlLabel,
    Input,
    FormControl,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import PageBox from "@/Components/pagebox/PageBox";
import PageBoxRedirect from "@/Components/pagebox/PageBoxRedirect";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="+00 00 00000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  });

  TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

const SellerProfileForm = ({ seller, handleSellerChange }) => {
    const { data, setData, processing, put, errors } = useForm({
        name: seller.name || "",
        phone: seller.phone || "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(name, value);
        if (handleSellerChange) {
            handleSellerChange(event);
        }
    };

    const handlePhoneChange = (value, info) => {
        setData("phone", value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        put(`/settings/seller/${seller.id}`, {
            onSuccess: () => {
                toast.success("Ação realizada com sucesso!");
            },
            onError: () => {
                toast.error("Ocorreu um erro!");
            },
        });
    };

    return (
        <Box component="form" onSubmit={onSubmit} noValidate>
            <Grid container spacing={0} rowGap={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="name"
                        name="name"
                        label="Nome de vendedor"
                        variant="outlined"
                        value={data.name}
                        onChange={handleChange}
                        error={errors.name}
                        helperText={errors.name}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6} />
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            id="phone"
                            name="phone"
                            label="Número de vendedor"
                            variant="outlined"
                            value={data.phone}
                            onChange={handleChange}
                            error={errors.phone}
                            helperText={errors.phone}
                            InputProps={{
                            inputComponent: TextMaskCustom,
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} />
                <Grid item xs={12} md={6}>
                    <Button
                        variant="contained"
                        type="submit"
                        disableElevation
                        disabled={processing}
                        sx={{
                            mb: "8px",
                            width: { xs: "100%", md: "auto" },
                        }}
                    >
                        Salvar
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};


const NotSellerProfileForm = ({ userName }) => {
    const { data, setData, processing, post, errors } = useForm({
        name: "",
        phone: "",
    });
    const [sellerNameFromUser, setSellerNameFromUser] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        post("/settings/seller", {
            onSuccess: () => {
                toast.success("Ação realizada com sucesso!");
            },
            onError: () => {
                toast.error("Ocorreu um erro!");
            },
        });
    };

    const handleSwitchChange = (event) => {
        const { checked } = event.target;
        setSellerNameFromUser(checked);
        if (checked) {
            setData("name", userName);
        } else {
            setData("name", "");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(name, value);
    };

    const handlePhoneChange = (value, info) => {
        setData("phone", value);
    };

    return (
        <Box component="form" onSubmit={onSubmit} noValidate>
            <Grid container spacing={0} rowGap={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="name"
                        name="name"
                        label="Nome de vendedor"
                        variant="outlined"
                        value={data.name}
                        onChange={handleChange}
                        error={errors.name}
                        helperText={errors.name}
                        fullWidth
                        disabled={sellerNameFromUser}
                    />
                </Grid>
                <Grid item xs={12} md={6} />
                <Grid item xs={12} md={6}>
                    <FormControlLabel
                        control={<Switch />}
                        value={sellerNameFromUser}
                        onChange={handleSwitchChange}
                        label="Usar nome de usuário como nome de vendedor"
                    />
                </Grid>
                <Grid item xs={12} md={6} />
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            id="phone"
                            name="phone"
                            label="Número de vendedor"
                            variant="outlined"
                            value={data.phone}
                            onChange={handleChange}
                            error={errors.phone}
                            helperText={errors.phone}
                            InputProps={{
                            inputComponent: TextMaskCustom,
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} />
                <Grid item xs={12} md={6}>
                    <Button
                        variant="contained"
                        type="submit"
                        disableElevation
                        disabled={processing}
                        sx={{
                            mb: "8px",
                            width: { xs: "100%", md: "auto" },
                        }}
                    >
                        Salvar
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default function SellerProfileSettings({ user }) {
    return (
        <Box noValidate sx={{ width: "100%" }}>
            <Grid container spacing={0} rowSpacing={2}>
                {!user.seller && (
                    <Grid item xs={12}>
                        <PageBox
                            title="Você precisa virar vendedor para ver suas informações"
                            subTitle="Preencha os campos para virar um vendedor"
                        >
                            <NotSellerProfileForm userName={user.name} />
                        </PageBox>
                    </Grid>
                )}
                {user.seller && (
                    <>
                        <Grid item xs={12}>
                            <PageBox
                                title="Informações do perfil de vendedor"
                                subTitle="Atualize as informações de perfil de vendedor"
                            >
                                <SellerProfileForm seller={user.seller} />
                            </PageBox>
                        </Grid>
                        <Grid item xs={12}>
                            <PageBoxRedirect
                                title="Meu perfil de vendedor"
                                href={`/seller/${user.seller.id}`}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PageBoxRedirect
                                title="Gerenciar meus anúncios"
                                href="/seller-dashboard/ads"
                            />
                        </Grid>
                    </>
                )}
            </Grid>
        </Box>
    );
}
