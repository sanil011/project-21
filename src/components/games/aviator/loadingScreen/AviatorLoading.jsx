import aviatorLogo from '../../../../images/aviator-logo.png';
import './AviatorLoading.css';
import PropTypes from 'prop-types'

const AviatorLoading = ({ progress }) => {
  return (
    <div className="loading-screen">
      <img className="loading-logo" src={aviatorLogo} alt="Logo" />
      <div className="loading-bar-container">
        <div className="loading-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <span className="aviator-progress-text">{progress}%</span>
    </div>
  );
};

AviatorLoading.propTypes = {
  progress: PropTypes.number.isRequired,
}

export default AviatorLoading;