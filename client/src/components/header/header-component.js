import {styles} from "./header-component-styles";

export function HeaderComponent(props) {
    return (
        <header style={styles.Header}>
            <div className="storeHeader" style={styles.HeaderContent}>
                <hgroup style={styles.HeaderHgroup}>
                    <h1>GG Sport</h1>
                    <i>By Gal & Gil</i>
                </hgroup>
            </div>
            <div className="overlay" style={styles.HeaderOverlay}></div>
        </header>
    );
}
