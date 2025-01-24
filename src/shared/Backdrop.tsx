import ReactDOM from 'react-dom';

import './Backdrop.css';

interface BackdropProps {
  onClick?: () => void; // Define the optional onClick prop
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  const backdropElement = document.getElementById('backdrop-hook');
  if (!backdropElement) {
    return null; // Return nothing if the element isn't found
  }

  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    backdropElement
  );
};

export default Backdrop;
