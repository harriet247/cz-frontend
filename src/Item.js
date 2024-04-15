import { Box, makeStyles } from '@material-ui/core'
import { ArrowForward } from '@material-ui/icons';

const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '50%',
        marginBottom: 10,
        width: 400,
        [theme.breakpoints.down("sm")]: {
          width: "unset",
        },
        "& img": {
          width: 400,
          [theme.breakpoints.down("sm")]: {
            width: "calc(100% - 30px)",
          },
          minHeight: 300,
          borderRadius: 30,
          marginBottom: 10,
          border: "2px solid #ECEBE7 !important",
          objectFit: "cover",
        }
    },
    text: {
        width: 400,
        [theme.breakpoints.down('sm')]: {
            width: 'calc(100% - 30px)',
        },
        
    },
    money: {
        color: '#53548A',
        ontSize: '14px',
        whiteSpace: 'nowrap',
        marginRight: 5,
        fontFamily: "Campton-Book",
        fontSize: 14,
        marginTop: 1,
    },
    discount:{
        color: '#B35C1E',
        ontSize: '14px',
        whiteSpace: 'nowrap',
        marginRight: 5,
        fontFamily: "Campton-SemiBold",
        fontSize: 14,
        marginTop: 1,
    },
    customize: {
        display: 'flex',
        cursor: 'pointer',
        color: '#69A2FF',
        fontFamily: "Campton-SemiBold",
        fontSize: 14,
        marginLeft: 1,
        marginTop: 1,
        alignItems: "center"
    },
    tag: {
        position: "absolute",
        bottom: "24px",
        zIndex: 999,
        right: 10,
        [theme.breakpoints.down("sm")]: {
          right: 25,
        },
        display: "flex",
        alignItems: "center",
        padding: "6px 6px 6px 10px",
        gap: "8px",
        backgroundColor: "#fff",
        border: "0.5px solid #D0CEC4",
        borderRadius: "100px",
        cursor: "pointer",
    },
}))
function Item({ img, tag, tagColor, name, price, discount }) {
    const classes = useStyle()
    return (
        <>
        {img? 
        (
        <Box className={classes.root}>
            <Box
                style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: "100%",
    height: "100%",
    gap: "6px"
                }}>
                <Box style={{width: "100%",height: "100%",position:"relative"}}>
                    <img src={img} alt=""/>
                    <Box className={classes.tag} style={{alignItems:"flex-end", display:"flex"}}>
                        <span style={{ fontFamily: 'Campton-Medium', fontSize:12, color: "#4F6076"}}>{tag}</span>
                        <Box
                            style={{
                                backgroundColor: tagColor,
                                borderRadius: '100%',
                                width: '20px',
                                height: '20px',
                            }}></Box>
                    </Box>
                </Box>
                <Box className={classes.text}>
                    <Box >
                        <strong style={{ fontFamily: 'Campton-Medium', fontSize: 15}}>
                           {name}
                        </strong>
                        <Box style={{ display: 'flex',alignItems: "center"}}>
                            {discount === undefined? 
                            <><span className={classes.money}>{price} or financing |</span> 
                            <span className={classes.customize}>
                                Customize
                                <ArrowForward fontSize='small' style={{marginLeft:3}}/>
                            </span></>: 
                            <span className={classes.money}>{price} | <span className={classes.discount}>Save {discount}</span></span>}
                        </Box>
                        {discount===undefined?<></>:<span className={classes.customize}>
                                Customize
                                <ArrowForward fontSize='small' style={{marginLeft:3}}/>
                            </span>}
                    </Box>
                </Box>
            </Box>
        </Box>) : (
            <Box className={classes.root} />
        )}
        </>
    )
}

export default Item
