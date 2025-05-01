import { FC } from "react";

interface HeaderProps {
  logoUrl: string;
  navigationItems: Array<{
    label: string;
    href: string;
  }>;
  username: string;
}

const Header: FC<HeaderProps> = ({ logoUrl, navigationItems, username }) => {
  return (
    <header className="bg-white border-b border-lightGray">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={logoUrl} alt="Replit Logo" className="h-8 w-8" />
          <span className="font-bold text-xl text-primary">Project Merger</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item, index) => (
              <a 
                key={index} 
                href={item.href} 
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">{username}</span>
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
              {username.substring(0, 2).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
