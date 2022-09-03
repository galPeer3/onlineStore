
export const styles = {
    Form: {
    display: "flex",
    flexDirection: "column",
    marginTop:"64px",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center"
  },
  Activities: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    marginLeft:"350px"
  },
  Input: {
    border: "5px solid blue",
    borderRadius: "10px",
    zIndex: "1 !important"
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