export default {
  root: {
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'scroll',
    backgroundColor: ({ theme }) => theme.palette.background.contentFrame,
    paddingTop: ({ theme }) => theme.mixins.toolbar.minHeight,
  },
  container: {},
};
