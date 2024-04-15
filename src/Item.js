import { Box, makeStyles } from '@material-ui/core'
import { ArrowRight } from '@material-ui/icons'

const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '50%',
        marginBottom: 10,
        '& img': {
            width: 400,
            [theme.breakpoints.down('sm')]: {
                width: 'calc(100% - 30px)',
            },
            minHeight: 300,
            borderRadius: 30,
            marginBottom: 10,
            border: '2px solid #ECEBE7 !important',
            objectFit: 'cover',
        },
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
    },
    customize: {
        display: 'flex',
        cursor: 'pointer',
        color: '#69A2FF',
        fontWeight: 700,
        marginLeft: 5,
    },
    tag: {
        position: 'absolute',
        bottom: 70,
        zIndex: 999,
        right: 10,
        [theme.breakpoints.down('sm')]: {
            right: 25,
        },
        display: 'flex',
        alignItems: 'center',
        padding: '6px 6px 6px 10px',
        gap: '8px',
        backgroundColor: '#fff',
        border: '0.5px solid #D0CEC4',
        borderRadius: '100px',
        cursor: 'pointer',
    },
}))
function Item({ img, tag, tagColor, name, price }) {
    const classes = useStyle()
    return (
        <Box className={classes.root}>
            <Box
                style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <img src={img} alt="" />
                <Box className={classes.tag}>
                    <span style={{ fontFamily: 'Larsseit-Thin' }}>{tag}</span>
                    <Box
                        style={{
                            backgroundColor: tagColor,
                            borderRadius: '100%',
                            width: '20px',
                            height: '20px',
                        }}></Box>
                </Box>

                <Box className={classes.text}>
                    <Box>
                        <strong style={{ fontFamily: 'Campton-SemiBold' }}>
                           {name}
                        </strong>
                        <Box style={{ display: 'flex' }}>
                            <span className={classes.money}>{price} or financing</span>|
                            <span className={classes.customize}>
                                Customize
                                <ArrowRight />
                            </span>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Item
