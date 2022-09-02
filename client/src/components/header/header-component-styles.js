export const styles = {

    Header: {
        height: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        // overflow: "hidden",
        background: "url('https://image.shutterstock.com/image-vector/dots-halftone-yellow-dark-blue-600w-1995271526.jpg')",
        backgroundSize: "cover",
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
        WebkitFilter: "blur(4px)",
    },

    SiteNav: {
        position: "absolute",
        top: 130,
        left: 0,
        width: "100%",
        // zIndex: 3
    },
}
