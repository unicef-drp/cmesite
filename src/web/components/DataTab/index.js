import { equals, complement } from 'ramda';
import { compose, branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getActiveTab } from '../../selectors/data';
import { changeActiveTab } from '../../ducks/data';
import Country from './country';

const withData = compose(
  connect(createStructuredSelector({ activeTab: getActiveTab }), { changeActiveTab }),
  branch(({ activeTab, ownTab }) => complement(equals)(activeTab, ownTab), renderNothing),
);

export const DataTabCountry = withData(Country);
