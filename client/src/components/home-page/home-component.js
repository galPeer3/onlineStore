import { NavigationComponent } from "../navigation-bar/navigation-component";
import { useLocation  } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { styles } from "./home-component-styles";
import {CardsComponent} from "./card-component";
import {HeaderComponent} from "../header/header-component";


export function HomeComponent(props) {

    return (

        <div>
            <HeaderComponent />
            <section className="site" style={styles.Site}>
                <div>
                <nav style={styles.SiteNav}>
                    <NavigationComponent />
                </nav>
                </div>

                <div>
                        <CardsComponent />
                </div>

            </section>
        </div>
    );
}