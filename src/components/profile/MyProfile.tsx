import { Avatar, Box, Divider, FormLabel, Grid2, OutlinedInput, Stack, styled, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { UserInfo } from '../../common/types';

interface Props {
  user?: UserInfo;
}

const FormGrid = styled(Grid2)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function MyProfile({ user }: Props) {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  if (!user?.emailVerified) {
    return <Navigate to="/" />;
  }
  return (
    <Box>
      <Typography variant="h2">My Profile</Typography>
      <Divider />
      <Stack spacing={1}>
        <Typography variant="h3">Picture</Typography>
        <Avatar alt={user.nickname} src={user.picture} />
        <Divider />
        <Typography variant="h3">Name</Typography>
        <Grid2 container spacing={3}>
          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel htmlFor="first-name" required>
              First name
            </FormLabel>
            <OutlinedInput
              id="first-name"
              name="first-name"
              placeholder="John"
              autoComplete="given-name"
              required
              size="small"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              onFocus={(e) => {
                e.target.select();
              }}
            />
          </FormGrid>
          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel htmlFor="last-name" required>
              Last name
            </FormLabel>
            <OutlinedInput
              id="last-name"
              name="last-name"
              placeholder="Snow"
              autoComplete="family-name"
              required
              size="small"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              onFocus={(e) => {
                e.target.select();
              }}
            />
          </FormGrid>
        </Grid2>
        <Divider />
      </Stack>
    </Box>
  );
}
