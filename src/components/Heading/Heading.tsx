import { Typography } from "@mui/material"
import { useClasses } from "./styles"

interface HeadingProps{
    title: string,
    action: React.ReactNode
}

const Heading = ({title, action}: HeadingProps) => {
    const { classes } = useClasses()
    return <div className={classes.root}>
        <Typography variant="h5" component={"div"}>{title}</Typography>
        <div>{action}</div>
    </div>
}

export default Heading