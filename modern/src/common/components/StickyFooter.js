import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Copyright = () => (
  <Typography variant="body2" color="text.secondary">
    {'all copyright reserved © '}
    <Link color="inherit" href="https://eyetatechmobile.com/">
      Eyeta Tech-Mobile Inc.
    </Link>
    {' '}
    {new Date().getFullYear()}
    .
  </Typography>
);
export const StickyFooter = () => (
  <Copyright />
);

export default StickyFooter;
