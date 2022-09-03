import { NavigationComponent } from "../navigation-bar/navigation-component";
import { useLocation  } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { styles } from "./home-component-styles";
import {CardsComponent} from "./card-component";


export function HomeComponent(props) {

    return (

        <div>
                <header style={styles.Header}>
                    <div className="storeHeader" style={styles.HeaderContent}>
                        <hgroup style={styles.HeaderHgroup}>
                            <h1>GG Sport</h1>
                            <i>By Gal & Gil</i>
                        </hgroup>
                    </div>
                    <div className="overlay" style={styles.headerOverlay}></div>
                </header>
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