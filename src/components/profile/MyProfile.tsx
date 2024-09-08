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
  const [givenName, setGivenName] = useState(user?.firstName);
  const [familyName, setFamilyName] = useState(user?.lastName);
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
              type="name"
              placeholder="John"
              autoComplete="first name"
              required
              size="small"
              value={givenName}
              onChange={(e) => {
                setGivenName(e.target.value);
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
              type="last-name"
              placeholder="Snow"
              autoComplete="last name"
              required
              size="small"
              value={familyName}
              onChange={(e) => {
                setFamilyName(e.target.value);
              }}
            />
          </FormGrid>
        </Grid2>
        <Divider />
      </Stack>
    </Box>
  );
}
