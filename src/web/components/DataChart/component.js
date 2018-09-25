import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Chart from '../Chart';
import DataLegend from '../DataLegend';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2,
  },
  content: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  actions: {
    display: 'flex',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  typo: {
    color: theme.palette.primary.dark,
  },
});

const DataChart = ({ classes, expanded, onExpand, title, series, estimates }) => (
  <Card className={classes.card} square>
    <CardHeader
      title={<Typography className={classes.typo}>{title}</Typography>}
      subheader="Deaths per 1000 live births"
    />
    <CardContent className={classes.content}>
      <Chart series={series} estimates={estimates} />
    </CardContent>
    <CardActions className={classes.actions}>
      <Typography className={classes.typo}>
        <FormattedMessage {...messages.legend} />
      </Typography>
      <IconButton
        className={classnames(classes.expand, { [classes.expandOpen]: expanded })}
        onClick={onExpand}
      >
        <ExpandMoreIcon />
      </IconButton>
    </CardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <DataLegend series={series} />
    </Collapse>
  </Card>
);

DataChart.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  expanded: PropTypes.bool,
  onExpand: PropTypes.func,
  series: PropTypes.array,
  estimates: PropTypes.object,
};

export default withStyles(styles)(DataChart);
