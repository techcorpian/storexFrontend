// src/layouts/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from '../shared/Menu';
import MobileMenu from '../shared/MobileMenu';
import SideFolders from '../shared/SideFolders';

const MainLayout: React.FC = () => {
  return (
    <div className="h-screen">
      <div className="flex">
        {/* Sidebar Menu */}
        <div className="h-full lg:flex hidden w-1/5">
          <Menu />
          <SideFolders/>
        </div>

        {/* Main Content */}
        <div className="w-full overflow-y-auto scrollbar-hide bg-gray-50 mb-16 md:mb-0"> 
          <Outlet />
        </div>

      </div>
      <MobileMenu/>
    </div>
  );
};

export default MainLayout;
