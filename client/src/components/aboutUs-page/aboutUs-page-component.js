import { styles } from './aboutUs-page-component-styles';
import Typography from "@mui/joy/Typography";
import gilImage from './IMG_3788.jpg';
import galImage from './IMG_3789.jpg';
import {NavigationComponent} from "../navigation-bar/navigation-component";
import {HeaderComponent} from "../header/header-component";



export function AboutUsPageComponent(props) {
    return (
        <div style={styles.Page}>
        <HeaderComponent />
            <div style={styles.SiteNav}>
        <NavigationComponent  />
            </div>
            <div>
                <Typography
                    fontSize="32px"
                    fontWeight="lg"
                    fontFamily= "Georgia"
                    mt={{ xs:12, sm: 28 }}
                >
                    About Us

                </Typography>
                <Typography
                    fontSize="20px"
                    fontWeight="lg"
                    fontFamily= "Georgia"
                >
                    Hello you all! We are Gal and Gil and we are glad to represent you our site!
                    You can choose from the Home page any sport category you like and see all it's related products.
                    Sport is integral part of our life and we hope it will become part of yours as well.
                </Typography>
            </div>
            <Typography
                style={styles.Header}
                level="h2"
                fontSize="22px"
                fontWeight="lg"
                fontFamily= "Georgia"
            >
                Who we are
            </Typography>{' '}
            <div className="row">
                <div style={styles.Column}>
                    <div style={styles.Card}>
                        <img src={gilImage} alt="Gil" style={styles.Image}/>
                            <div style={styles.Container}>
                                <Typography
                                    level="h5"
                                    fontSize="18px"
                                    fontWeight="lg"
                                    fontFamily= "Georgia"
                                    textColor="DarkSlateGrey"
                                >
                                    Gil
                                </Typography>
                            </div>
                    </div>
                </div>

                <div style={styles.Column}>
                    <div style={styles.Card}>
                        <img src={galImage} alt="Gal" style={styles.Image}/>
                            <div style={styles.Container}>
                                <Typography
                                    level="h5"
                                    fontSize="18px"
                                    fontWeight="lg"
                                    fontFamily= "Georgia"
                                    textColor="DarkSlateGrey"

                                >
                                    Gal
                                </Typography>
                            </div>
                    </div>
                </div>
             </div>
        </div>

            );
}
