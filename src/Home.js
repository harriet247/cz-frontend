import { Box, Tab, Tabs, Typography, makeStyles } from "@material-ui/core";
import Item from "./Item";
import React, { useState, useEffect, useMemo } from "react";
import datas from "./table.json";
import { Height } from "@material-ui/icons";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    overflow: "auto",
  },
  head: {
    backgroundColor: "#f6f7f5",
    fontFamily: "QuincyCF-Light",
    [theme.breakpoints.up("sm")]: {
      width: 1250,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  fixHead: {
    position: "sticky",
    top: 0,
    zIndex: 9999,
    backgroundColor: "#f6f7f5",
    paddingBottom: 10,
  },
  tabsContainer: {
    backgroundColor: "#ECEBE7",
    width: "fit-content",
    borderRadius: 50,
    height: "40px",
    fontFamily: "Larsseit-Thin",
  },

  tabs: {
    "& .MuiTabs-flexContainer": {
      width: "fit-content",
      overflow: "hidden",
      margin: "8px 0px",
      justifyContent: "center",
      alignItems: "center",
      gap: "1px",
      [theme.breakpoints.down("sm")]: {
        overflow: "unset",
      },
    },
    "& button": {
      backgroundColor: "#ECEBE7",
      textTransform: "capitalize",
      borderRadius: 50,
      color: "black",
      margin: "0px 6px",
      minHeight: "10px",
      justifyContent: "center",
      alignItems: "center",
      padding: "0px 0px",
    },
    "& .Mui-selected": {
      backgroundColor: "#0B2341",
      color: "#fff",
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "unset",
    },
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      width: 1250,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  subTitle: {
    fontSize: "32px",
    color: "#2B2C6E",
    fontFamily: "QuincyCF-Light",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
    padding: "32px 0px 0px",
  },
}));

function Home() {
  const classes = useStyle();

  const [value, setValue] = useState(0);
  const [scrollFromClick, setScrollFromClick] = useState(false);

  const tabRefs = useMemo(() => datas.map(() => React.createRef()), []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // scroll to position
    setScrollFromClick(true);
    const element = tabRefs[newValue].current;
    const headerOffset = 64; // AppBar's height
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollFromClick) {
        const scrollPosition = window.scrollY;
        // update by item position and view
        tabRefs.forEach((tabRef, index) => {
          if (tabRef.current) {
            const elementPosition =
              tabRef.current.getBoundingClientRect().top + window.pageYOffset;
            if (scrollPosition + 200 >= elementPosition) {
              setValue(index);
            }
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [tabRefs, scrollFromClick]);

  const completeArrayTriple = (datas) =>
    datas.map((entry) => ({
      ...entry,
      arr: [...entry.arr, ...Array((3 - (entry.arr.length % 3)) % 3).fill({})],
    }));

  const trippedData = completeArrayTriple(datas);

  return (
    <Box className={classes.head}>
      <Typography variant="h3" style={{ fontFamily: "QuincyCF-Light" }}>
        Tables
      </Typography>
      <div style={{ marginBottom: 20, fontFamily: "Campton-Book" }}>
        A perfect pairing to your sofa.
      </div>
      <Box className={classes.fixHead}>
        <Box className={classes.tabsContainer}>
          <Tabs value={value} onChange={handleChange} className={classes.tabs}>
            {datas.map((item, index) =>
              item.title !== "Table Sets" ? (
                <Tab
                  style={{ minWidth: "120px" }}
                  label={item.title}
                  value={index}
                />
              ) : (
                <Tab
                  style={{ minWidth: "120px" }}
                  label="Table Bundles"
                  value={index}
                />
              )
            )}
          </Tabs>
        </Box>
      </Box>
      <Box className={classes.root}>
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Box>
            {trippedData.map((item, index) => (
              <Box ref={tabRefs[index]}>
                <Typography
                  className={classes.subTitle}
                  style={{ fontSize: "3em" }}
                >
                  {item.title}
                </Typography>
                <Box className={classes.grid}>
                  {item.arr.map((v) => (
                    <>
                      <Item {...v} />
                    </>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
