import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { PlantType } from '../store/models/plant';
import { Menu, MenuItem, Input } from '@material-ui/core';
import { Done } from '@material-ui/icons';

export const useStylesCard = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }),
);
type Props = {
    plant: PlantType,
    refName?: React.RefObject<HTMLInputElement>
    onSubmit: () => void
}
export default function PlantUI(props: Props) {
    const classes = useStylesCard();
    const [expanded, setExpanded] = React.useState(false);
    const [editing, setEditing] = React.useState(false)
    return (
        <Card className={classes.card}>
            <CardHeader
                action={<React.Fragment>
                    <IconButton aria-label="settings" onClick={() => setExpanded(true)}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        keepMounted
                        open={expanded}
                        onClose={() => setExpanded(false)}
                    >
                        <MenuItem onClick={() => setEditing(true)}>Edit</MenuItem>
                    </Menu>
                </React.Fragment>
                }
                title={props.plant.name}
                subheader={props.plant.lastRegister ? props.plant.lastRegister.date : ''}
            />
            {props.plant.lastRegister && <CardMedia
                className={classes.media}
                image={'TODO'}
            />}
            <CardContent>
                {editing && <Input defaultValue={props.plant.name} ref={props.refName} />}
            </CardContent>
            <CardActions disableSpacing>
                {editing ? <React.Fragment>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>

                </React.Fragment>
                    :
                    <React.Fragment>
                        <IconButton onClick={() => props.onSubmit()} aria-label="save">
                            <Done />
                        </IconButton>
                    </React.Fragment>}

            </CardActions>
        </Card>
    );
}