import { Box, Tab, Tabs, Typography, makeStyles } from '@material-ui/core'
import Item from './Item'
import React, { useState, useEffect, useMemo } from 'react'
import datas from "./table.json"

const useStyle = makeStyles(theme =>({
    root: {
        display: 'flex',
        justifyContent: 'center',
        overflow: 'auto',
    },
    head:{
        backgroundColor: '#f6f7f5',
        fontFamily: 'QuincyCF-Light',
        [theme.breakpoints.up('sm')]: {
            width: 1250,
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    fixHead: {
        position: 'sticky',
        top: 0,
        zIndex: 9999,
        backgroundColor: '#f6f7f5',
        paddingBottom: 10,
    },
    tabsContainer: {
        backgroundColor: '#ECEBE7',
        width: 'fit-content',
        borderRadius: 50,
    },
    subTitle: {
        fontSize: '32px',
        color: '#2B2C6E',
        fontFamily: 'QuincyCF-Light',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
        },
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            width: 1250,
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
}))

function Home(){
    const classes = useStyle()

    const [value, setValue] = useState(0)
    const [scrollFromClick, setScrollFromClick] = useState(false)

    const tabRefs = useMemo(() => datas.map(() => React.createRef()), [])

    const handleChange = (event, newValue) => {
        setValue(newValue)
        // scroll to position
        setScrollFromClick(true) 
        const element = tabRefs[newValue].current
        const headerOffset = 64 // AppBar's height
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerOffset

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        })

        // 设置一定延时后关闭滚动状态
        // setTimeout(() => setScrollFromClick(false), 5000)
    }

    useEffect(() => {
        const handleScroll = () => {
            if (!scrollFromClick) {
                
                const scrollPosition = window.scrollY
                // update by item position and view
                tabRefs.forEach((tabRef, index) => {
                    if (tabRef.current) {
                        const elementPosition =
                            tabRef.current.getBoundingClientRect().top + window.pageYOffset
                        if (scrollPosition + 200 >= elementPosition) {
                            setValue(index)
                        }
                    }
                })
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [tabRefs, scrollFromClick])

    return(<Box className={classes.head}>
        <Typography variant="h3" style={{ fontFamily: 'QuincyCF-Light' }}>
            Tables
        </Typography>
        <div style={{ marginBottom: 10 }}>A perfect pairing to your sofa.</div>
        <Box className={classes.fixHead}>
            <Box className={classes.tabsContainer}>
                <Tabs value={value} onChange={handleChange} className={classes.tabs}>
                    {datas.map((item, index) => (
                        <Tab label={item.title} value={index} />
                    ))}
                </Tabs>
            </Box>
        </Box>
        <Box className={classes.root}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <Box>
                    {datas.map((item, index) => (
                        <Box ref={tabRefs[index]}>
                            <Typography className={classes.subTitle}>{item.title}</Typography>
                            <Box className={classes.grid}>
                                {item.arr.map(v => (
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
    </Box>)
}

export default Home