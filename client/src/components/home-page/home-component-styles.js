import { color } from "@mui/system";

export const styles = {
    Header: {
        height: "100%",
        position: "relative",
        display: "flex",
        justifyContent:"center",
        background: "url('https://image.shutterstock.com/image-vector/dots-halftone-yellow-dark-blue-600w-1995271526.jpg')",
    },

    HeaderContent: {
        position: "absolute",
        fontFamily: "Georgia",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },

    headerOverlay: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        background: "#333 center no-repeat",
        backgroundSize: "cover",
        zIndex: 0,
        opacity: 0,
        WebkitFilter: "blur(4px)",
    },

    HeaderHgroup: {
        display: "inline-block",
        textAlign: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        color: "#fff",
        border: "5px solid #fff",
        padding: ".5em 3em",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        zIndex: 2,
    },

    HeaderOverlay: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        background: "#333 center no-repeat",
        backgroundSize: "cover",
        zIndex: 0,
        opacity: 0,
        webkitFilter: "blur(4px)",
    },

    Site: {
        padding: "20em 0",
        textAlign: "center",
        backgroundColor: "#efefef",
        fontSize: ".8em",
        color: "#444",
        position: "relative",
        top:"30px"
    },

    SiteNav: {
        position: "absolute",
        top: 130,
        left: 0,
        width: "100%",
    },

    loaderContainer: {
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        background: "rgba(0, 0, 0, 0.834)",
        zIndex: 1,
    },

    spinner: {
        width: "64px",
        height: "64px",
        border: "8px solid",
        borderColor: "#3d5af1 transparent #3d5af1 transparent",
        borderRadius: "50%",
        animation: "spin-anim 1.2s linear infinite",
    },
};
