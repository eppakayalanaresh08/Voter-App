import NextLink from 'next/link';
import { redirect } from 'next/navigation';
import { AppBar, Box, Button, Container, Paper, Stack, Toolbar, Typography } from '@mui/material';
import { getProfile } from '@/lib/auth';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile();

  if (!profile) redirect('/login');
  if (profile.role === 'SUPER_ADMIN') redirect('/admin');

  return (
    <Box sx={{ minHeight: '100vh', pb: 10, backgroundColor: 'background.default' }}>
      <AppBar position="sticky" color="inherit" elevation={0}>
        <Toolbar>
          <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 1.5, sm: 2 } }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                {profile.role}
              </Typography>
              <Typography variant="h6" sx={{ lineHeight: 1.15, fontWeight: 700 }}>
                {profile.full_name ?? 'User'}
              </Typography>
            </Box>
            <Button component={NextLink} href="/settings" color="inherit" size="small">
              Settings
            </Button>
          </Container>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 2.5, px: { xs: 1.5, sm: 2 } }}>
        {children}
      </Container>

      <Paper
        elevation={0}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: '1px solid',
          borderColor: 'divider',
          borderRadius: 0,
          backgroundColor: 'background.paper'
        }}
      >
        <Container maxWidth="sm" sx={{ py: 1, px: { xs: 1.5, sm: 2 } }}>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Button component={NextLink} href="/home" fullWidth size="small">Home</Button>
            <Button component={NextLink} href="/search" fullWidth size="small">Search</Button>
            {profile.role === 'ASPIRANT' && (
              <Button component={NextLink} href="/team" fullWidth size="small">Team</Button>
            )}
            <Button component={NextLink} href="/logs" fullWidth size="small">Logs</Button>
            <Button component={NextLink} href="/settings" fullWidth size="small">Settings</Button>
          </Stack>
        </Container>
      </Paper>
    </Box>
  );
}
