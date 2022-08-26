import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

export default function BasicCard(props) {
    const {name, src} = props;
  return (
      <Card component="li" sx={{ width: 200, height: 200 }}>
        <CardCover>
          <img
            src={src}
            srcSet={src}
            alt=""
          />
        </CardCover>
        <CardContent sx={{ justifyContent: 'center', gap: 5}}>
          <Typography
            level="h6"
            fontWeight="lg"
            textColor="black"
            mt={{ xs: 12, sm: 18 }}
          >
            {name}
          </Typography>
        </CardContent>
      </Card>
        );
}
