import React from "react";
import Tabs from '@material-ui/core/Tabs';
import TabLabel from "./TabLabel";
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom";
import Select from "../Inputs/Select";
import SelectProps from "../Inputs/SelectProps";
import Icon from "../DataDisplay/Icon";
import { useHistory } from "react-router-dom";
import ResizeDetector from "react-resize-detector";
import { isScrollVisible } from "./../../../utils/domHelper";

const useStyles = makeStyles((theme) => ({
  container: {
    flex: `0 0 ${theme.spacing(1)}`,
    maxHeight: 0,
    padding: `0 0 0 ${theme.spacing(1)}`,
    margin: `0 ${theme.spacing(20)} 0 0`,
    display: "flex",
    alignItems: "flex-end",
    width: `calc(100% - ${theme.spacing(21)})`,
  },
  tab: {
    flex: "0 0 auto"
  },
  tabWrapper: {
    "& > *:first-child": {
      order: "1 !important",
      marginLeft: theme.spacing(1),
      color: theme.palette.primary.contrastText,

      "&:hover": {
        color: theme.palette.primary.main,
      }
    }
  },
  hidden: {
    visibility: "hidden",
    position: "absolute"
  },
  moduleIcon: {
    width: `${theme.spacing(2.4)} !important`,
    height: theme.spacing(2.4),
    color: "inherit"
  },
  select: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    zIndex: 100
  },
  closeIcon: {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.contrastText,
    "&:hover": {
      color: theme.palette.primary.main,
    }
  }
}));

export const TabLink = React.forwardRef((props, ref) => {
  return (
    <Link to={props.to} {...props} ref={ref}>
      {props.children}
      {props.close}
    </Link>
  )
});

const MuiBar = ({ module, pages }) => {
  const tabs = React.useRef(null);
  const classes = useStyles();
  const history = useHistory();
  const activePage = pages.findIndex(p => p.active === true);
  const activeTabIndex = activePage === -1 ? false : activePage;
  const [showSelect, setShowSelect] = React.useState(false);

  const handleChange = (_, value) => {
    if (value === false) {
      history.push(module.href);
    }
    else {
      const href = pages[value].href;
      history.push(href)
    }
  };

  const tabLabels = [];

  const selectProps = new SelectProps();
  selectProps.set(SelectProps.propNames.iconSelect, true);
  selectProps.set(SelectProps.propNames.value, activeTabIndex === false ? '' : activeTabIndex);
  selectProps.set(SelectProps.propNames.update, (newValue) => handleChange(null, newValue));

  const select = <div className={classes.select}><Select options={tabLabels} selectProps={selectProps} /></div>;

  const tabCloseHandler = (event, closeCallback) => {
    event.stopPropagation();
    event.preventDefault();
    closeCallback();
  };

  const moduleIcon = <Icon id={module.icon} className={classes.moduleIcon} />

  const resizeHandler = React.useCallback(() => {
    const scroller = tabs.current.querySelector(".MuiTabs-flexContainer");
    setShowSelect(isScrollVisible(scroller));
  }, [tabs]);

  React.useEffect(() => {
    resizeHandler();
  }, [resizeHandler, module, pages]);

  return (
    <div className={classes.container}>
      <ResizeDetector onResize={resizeHandler} />
      <Tab
        label={<TabLabel label={module.label} />}
        component={Link}
        key={module.href}
        to={module.href}
        icon={moduleIcon}
        onClick={(e) => handleChange(e, false)}
        className={activeTabIndex === false ? "Mui-selected" : null}
        disableFocusRipple
      />
      <Tabs
        value={activeTabIndex}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="off"
        classes={{
          scrollButtons: classes.hidden
        }}
        ref={tabs}
      >
        {
          pages.map(
            ({ href, label, outsideScope, close }, index) => {
              const tabLabel = <TabLabel label={label} />;
              const closeIcon = (
                <Icon
                  id="close"
                  className={classes.closeIcon}
                  onClick={(event) => tabCloseHandler(event, close)}
                />
              );
              tabLabels.push({
                value: index,
                label: tabLabel,
                sortOrder: index
              });
              return (
                <Tab
                  classes={{
                    root: classes.tab,
                  }}
                  component={TabLink}
                  label={tabLabel}
                  key={href}
                  to={href}
                  value={index}
                  close={closeIcon}
                  disabled={outsideScope}
                />
              )
            }
          )
        }
      </Tabs>
      {showSelect ? select : null}
    </div>
  );
};

export default MuiBar;