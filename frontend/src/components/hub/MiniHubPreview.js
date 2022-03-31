import {
  Card,
  IconButton,
  Link,
  makeStyles,
  Typography,
  TextField,
  Collapse,
} from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
import React, { useContext } from "react";
import { getLocalePrefix } from "../../../public/lib/apiOperations";
import { getImageUrl } from "../../../public/lib/imageOperations";
import getTexts from "../../../public/texts/texts";
import UserContext from "../context/UserContext";
import SelectField from "../general/SelectField";

const useStyles = makeStyles((theme) => ({
  link: {
    ["&:hover"]: {
      textDecoration: "none",
    },
  },
  root: {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    "-webkit-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    userSelect: "none",
    position: "relative",
  },
  textContainer: {
    boxShadow: "3px 3px 6px #00000017",
    border: "1px solid #E0E0E0",
    padding: theme.spacing(1),
    height: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  placeholderImage: {
    visibility: "hidden",
    width: "100%",
  },
  placeholderImageContainer: (props) => ({
    background: props.createMode
      ? `url(/images/mini_hub_preview_background.jpg)`
      : `url(${getImageUrl(props.thumbnail_image)})`,
    backgroundSize: "cover",
    width: "100%",
    height: 60,
    backgroundPosition: "center",
  }),
  hubName: {
    fontSize: 19,
    fontWeight: 600,
  },
  hubIcon: {
    height: 26,
    marginBottom: -3,
    marginRight: theme.spacing(0.25),
  },
  closeIconButton: {
    position: "absolute",
    top: theme.spacing(0.5),
    right: theme.spacing(0.5),
    color: "red",
    background: "rgba(255, 255, 255, 0.9)",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.98)",
    },
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function MiniHubPreview({
  hub,
  hubsToSelectFrom,
  editMode,
  createMode = false,
  onSelect,
  onClickRemoveHub,
}) {
  const classes = useStyles({ createMode: createMode, thumbnail_image: hub?.thumbnail_image });
  const { locale } = useContext(UserContext);
  const texts = getTexts({ page: "hub", locale: locale });
  const handleRemoveHub = (event) => {
    event.preventDefault();
    onClickRemoveHub(hub);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    // <Link
    //   href={hub && getLocalePrefix(locale) + `/hubs/${hub.url_slug}`}
    //   target="_blank"
    //   className={classes.link}
    // >
    <Card className={classes.root}>
      {editMode && (
        <IconButton className={classes.closeIconButton} size="small" onClick={handleRemoveHub}>
          <CloseIcon />
        </IconButton>
      )}
      <CardActionArea
        href={hub && getLocalePrefix(locale) + `/hubs/${hub.url_slug}`}
        target="_blank"
      >
        <div className={classes.placeholderImageContainer}>
          <img
            src={
              createMode
                ? "/images/mini_hub_preview_background.jpg"
                : getImageUrl(hub?.thumbnail_image)
            }
            className={classes.placeholderImage}
          />
        </div>
      </CardActionArea>


      <div className={classes.textContainer}>

      
        {/* <div className={classes.textContainer}> */}
        {createMode ? (
          <SelectField
            label={texts.add_a_hub_where_you_are_active}
            size="small"
            options={hubsToSelectFrom}
            onChange={(event) => event.target.value && onSelect(event)}
          />
        ) : (
          <CardActionArea className={clsx(classes.expand,)}
      onClick={handleExpandClick}
      aria-expanded={expanded}
      aria-label="show more"
      >
          <Typography color="secondary" className={classes.hubName}>
            {hub.icon && <img src={getImageUrl(hub.icon)} className={classes.hubIcon} />}
            {hub?.name}
          </Typography>
          </CardActionArea>
        )}
        {/* <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        > */}
          {/* <ExpandMoreIcon />
        </IconButton> */}
        </div>
      <Collapse className={classes.textContainer} in={expanded} timeout="auto" unmountOnExit>
        <TextField
          //className={classes.name}
          fullWidth
          //value={editedAccount.name}
          //onChange={(event) => handleTextFieldChange("name", event.target.value)}
          multiline
          required
        />
      </Collapse>
      
    </Card>
    // </Link>
  );
}
