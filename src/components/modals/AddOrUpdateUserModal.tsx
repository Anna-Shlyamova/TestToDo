import { FC } from "react";
import { Box, Modal, TextField, Typography } from "@mui/material";
import StandartButton from "../StandartButton/StandartButton.tsx";
import { User } from "../../App.tsx";
import { Controller, FieldErrors, Resolver, useForm } from "react-hook-form";

const ModalMixin = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#121212",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  padding: "20px",
};

const TextFieldMixin = {
  paddingBottom: "15px",
  ".MuiInputBase-input": {
    color: "#FFFFFF",
    "&::placeholder": {
      color: "#FFFFFF",
    },
  },

  ".MuiFormLabel-root": {
    color: "#FFFFFF",
  },

  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "#FFFFFF",
  },
  ".MuiInputBase-root": {
    minHeight: "32px",
    padding: "4px 10px",
  },
};
interface AddUserModalProps {
  open: boolean;
  context: { mode: "add" | "update" | null; node?: User };
  onClose: () => void;
  onSubmit: (value: User) => void;
}
const AddOrUpdateUserModal: FC<AddUserModalProps> = ({
  open = false,
  onClose,
  onSubmit,
  context,
}) => {
  const formValues: User = {
    id: String(context.node?.id ?? ""),
    name: context.node?.name ?? "",
    age: context.node?.age ?? 0,
  };
  const resolver: Resolver<User> = (values) => {
    const errors: FieldErrors<User> = {};
    if (values.name.trim().length === 0) {
      errors.name = { type: "required", message: "Имя не может быть пустым" };
    }
    return { values, errors };
  };

  const { control, handleSubmit } = useForm<User>({
    defaultValues: formValues,
    resolver,
    mode: "onChange",
  });
  return (
    <Modal open={open} onClose={onClose} aria-labelledby={"modal-title"}>
      <Box sx={ModalMixin}>
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          sx={{ paddingBottom: "15px" }}
        >
          {context.mode === "add" ? "Add user" : "Update user"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            render={({ field: { name, value, onChange } }) => (
              <TextField
                sx={TextFieldMixin}
                name={name}
                value={value}
                onChange={onChange}
                label={"Name"}
                fullWidth
              />
            )}
            name={"name"}
          />
          <Controller
            control={control}
            render={({ field: { name, value, onChange } }) => (
              <TextField
                sx={TextFieldMixin}
                name={name}
                value={value}
                onChange={onChange}
                label={"Age"}
                fullWidth
              />
            )}
            name={"age"}
          />
          <Box sx={{ paddingTop: "10px" }}>
            <StandartButton type={"submit"}>
              {context.mode === "add" ? "Add user" : "Update user"}
            </StandartButton>
            <StandartButton onClick={onClose}>Close</StandartButton>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddOrUpdateUserModal;
