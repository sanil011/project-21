import PropTypes from 'prop-types'

const PageContainer = ({children}) => {
  return <div className="w-full min-h-[90vh] h-fit pb-22">
    {children}
  </div>;
};

PageContainer.propTypes = {
  children: PropTypes.array,
}

export default PageContainer;
