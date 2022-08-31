import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import soccerImage from './main/2.png'
import basketballImage from './main/6.png'
import cyclingImage from './main/3.png'
import watersportImage from './main/5.png'
import martialartImage from './main/4.png'
import fitnessImage from './main/1.png'


import { useNavigate } from "react-router-dom";

export function CardsComponent(props) {
    const { userData } = props;
    const navigate = useNavigate();

    const onBasketballClick = () => {
    navigate('/basketball', {state:userData}); //userDate = {name:name, password:password}
    }
    const onSoccerClick = () => {
        navigate('/Soccer', {state:userData});
    }
    const onCyclingClick = () => {
        navigate('/Cycling', {state:userData});
    }
    const onFitnessClick = () => {
        navigate('/fitness', {state:userData});
    }
    const onMartialArtClick = () => {
        navigate('/martialarts', {state:userData});
    }
    const onWaterSportClick = () => {
        navigate('/watersport', {state:userData});
    }

      return (
          <div>
          <Box
            component="ul"
            sx={{ display: 'flex' , gap: 6, flexWrap: 'wrap', p: 0, m: 0, justifyContent: 'center' }}
        >
            <Card component="li" onClick={onBasketballClick} sx={{height: 250, width: 250 }}>
                <CardCover>
                    <img
                        src={basketballImage}
                        alt=""
                    />
                </CardCover>
                <CardContent sx={{ justifyContent: 'center', gap: 1, alignItems: 'center'}}>
                    <Typography
                        level="h1"
                        fontSize="24px"
                        fontWeight="lg"
                        fontFamily= "Georgia"
                        textColor="DarkSlateGrey"
                        mt={{ xs:12, sm: 28 }}
                    >
                        Basketball
                    </Typography>
                </CardContent>
            </Card>

              <Card component="li" onClick={onSoccerClick} sx={{height: 250, width: 250 }}>
                  <CardCover>
                      <img
                          src={soccerImage}
                         alt=""
                      />
                  </CardCover>
                  <CardContent sx={{ justifyContent: 'center', gap: 1, alignItems: 'center' }}>
                      <Typography
                          level="h1"
                          fontSize="24px"
                          fontWeight="lg"
                          fontFamily= "Georgia"
                          textColor="DarkSlateGrey"
                          mt={{ xs:12, sm: 28 }}
                      >
                          Soccer
                      </Typography>
                  </CardContent>
              </Card>

              <Card component="li" onClick={onCyclingClick} sx={{height: 250, width: 250 }}>
                  <CardCover>
                      <img
                          src={cyclingImage}
                          alt=""
                      />
                  </CardCover>
                  <CardContent sx={{ justifyContent: 'center', gap: 1, alignItems: 'center' }}>
                      <Typography
                          level="h1"
                          fontSize="24px"
                          fontWeight="lg"
                          fontFamily= "Georgia"
                          textColor="DarkSlateGrey"
                          mt={{ xs:12, sm: 28 }}
                      >
                          Cycling
                      </Typography>
                  </CardContent>
              </Card>

              <Card component="li" onClick={onWaterSportClick} sx={{height: 250, width: 250 }}>
                  <CardCover>
                      <img
                          src={watersportImage}
                          alt=""
                      />
                  </CardCover>
                  <CardContent sx={{ justifyContent: 'center', gap: 1 , alignItems: 'center'}}>
                      <Typography
                          level="h1"
                          fontSize="24px"
                          fontWeight="lg"
                          fontFamily= "Georgia"
                          textColor="DarkSlateGrey"
                          mt={{ xs:12, sm: 28 }}
                      >
                          WaterSport
                      </Typography>
                  </CardContent>
              </Card>

              <Card component="li" onClick={onMartialArtClick} sx={{height: 250, width: 250 }}>
                  <CardCover>
                      <img
                          src={martialartImage}
                          alt=""
                      />
                  </CardCover>
                  <CardContent sx={{ justifyContent: 'center', gap: 1 ,alignItems: 'center'}}>
                      <Typography
                          level="h1"
                          fontSize="24px"
                          fontWeight="lg"
                          fontFamily= "Georgia"
                          textColor="DarkSlateGrey"
                          mt={{ xs:12, sm: 28 }}
                      >
                          Martial arts
                      </Typography>
                  </CardContent>
              </Card>

              <Card component="li" onClick={onFitnessClick} sx={{height: 250, width: 250 }}>
                  <CardCover>
                      <img
                          src={fitnessImage}
                          alt=""
                      />
                  </CardCover>
                  <CardContent sx={{ justifyContent: 'center', gap: 1, alignItems: 'center' }}>
                      <Typography
                          level="h1"
                          fontSize="24px"
                          fontWeight="lg"
                          fontFamily= "Georgia"
                          textColor="DarkSlateGrey"
                          mt={{ xs:12, sm: 28 }}
                      >
                          Fitness
                      </Typography>
                  </CardContent>
              </Card>
        </Box>
        </div>
      );
    }


