import { Card, CardContent, Stack, Typography } from '@mui/material';

export default function LogsPage() {
  return (
    <Stack spacing={2.5}>
      <Stack spacing={0.5}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Logs
        </Typography>
        <Typography color="text.secondary">Track actions and sync status.</Typography>
      </Stack>

      <Card>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            No logs yet.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
