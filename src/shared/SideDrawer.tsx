import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

interface SideDrawerProps {
  show: boolean; // Determines if the side drawer is visible
  onClick: () => void; // Handler for click events
  children: ReactNode; // Content to be rendered inside the drawer
}

const SideDrawer: React.FC<SideDrawerProps> = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  const drawerHook = document.getElementById('drawer-hook');
  return drawerHook ? ReactDOM.createPortal(content, drawerHook) : null;
};

export default SideDrawer;
