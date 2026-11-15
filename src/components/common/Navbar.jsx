import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { Compass, PlusSquare, Bookmark, ShieldCheck } from 'lucide-react';
import { useIssues } from '../../context/IssueContext';

export const Navbar = () => {
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
    <header className="sticky top-0 z-50 bg-[#000000] border-b border-[#262626] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Nav Icons */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.to
                : location.pathname.startsWith(item.to);

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 py-1 text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'text-white'
                      : 'text-ig-muted hover:text-white'
                  }`}
                >
                  <div className="relative">
                    <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5] text-brand-500' : 'stroke-[1.8]'}`} />
                    {item.badge && (
                      <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 bg-brand-500 text-white text-[9px] font-bold rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span>{item.label}</span>

                  {isActive && (
                    <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-brand-500 rounded-full" />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <Link
              to="/report"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <PlusSquare className="w-4 h-4" />
              <span>Report Issue</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
