import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Compass, PlusSquare, Bookmark } from 'lucide-react';
import { useIssues } from '../../context/IssueContext';

export const MobileNav = () => {
  const location = useLocation();
  const { userReports } = useIssues();

  const navItems = [
    {
      to: '/',
      label: 'Explore',
      icon: Compass,
      exact: true,
    },
    {
      to: '/report',
      label: 'Report',
      icon: PlusSquare,
    },
    {
      to: '/track',
      label: 'Track',
      icon: Bookmark,
      badge: userReports.length > 0 ? userReports.length : null,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#000000]/95 backdrop-blur-md border-t border-[#262626] py-2 px-6 shadow-2xl">
      <div className="flex items-center justify-around max-w-sm mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center p-1 transition-colors relative ${
                isActive ? 'text-[#F97316]' : 'text-[#888888] hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 px-1.5 py-0.2 bg-[#F97316] text-white text-[9px] font-bold rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 font-semibold">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
