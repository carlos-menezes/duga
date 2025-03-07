import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid2, MenuItem, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { xtreamUrlToCredential } from "../../../../lib/xtream/parser";
import {
  credentialTypeSchema,
  useCredentialStore,
} from "../../../../store/CredentialStore";

const schema = z.object({
  name: z.string().optional(),
  type: credentialTypeSchema.extract(["xtream"], {
    required_error: "Credential type is required",
    invalid_type_error: "Credential type must be a valid type",
  }),
  url: z
    .string({
      required_error: "Playlist URL is required",
      invalid_type_error: "Playlist URL must be a valid URL",
      message: "Invalid URL format",
    })
    .url(),
});

export const AddCredentialForm = () => {
  const credentialStore = useCredentialStore();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      url: "",
      type: credentialTypeSchema.enum.xtream,
    },
  });

  const handleOnSubmit: SubmitHandler<z.infer<typeof schema>> = ({
    name,
    url,
    type,
  }) => {
    switch (type) {
      case credentialTypeSchema.enum.xtream: {
        try {
          const credential = xtreamUrlToCredential({
            name: name && name.length > 0 ? name : undefined,
            url,
          });

          credentialStore.addCredential(credential);
        } catch (error) {
          setError(
            "url",
            {
              message: (error as Error).message,
              type: "value",
            },
            { shouldFocus: true }
          );
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Grid2 container alignItems="center">
        <Grid2 size={12}>
          <Grid2 container gap={2}>
            <Grid2 size="auto">
              <TextField
                variant="outlined"
                label="PLAYLIST NAME"
                fullWidth
                size="small"
                error={!!errors.name}
                helperText={errors.name?.message ?? " "}
                {...register("name")}
              />
            </Grid2>
            <Grid2 size="auto">
              <TextField
                select
                required
                fullWidth
                sx={{ minWidth: 200 }}
                label="PLAYLIST TYPE"
                size="small"
                error={!!errors.type}
                helperText={errors.type?.message ?? " "}
                defaultValue={credentialTypeSchema.enum.xtream}
                {...register("type")}
              >
                <MenuItem value="xtream">XTREAM</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size="grow">
              <TextField
                type="url"
                fullWidth
                label="PLAYLIST URL"
                size="small"
                error={!!errors.url}
                helperText={errors.url?.message ?? " "}
                required
                {...register("url")}
              />
            </Grid2>
            <Grid2 size="auto" height="100%">
              <Button fullWidth type="submit" variant="contained" size="small">
                ADD
              </Button>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </form>
  );
};
