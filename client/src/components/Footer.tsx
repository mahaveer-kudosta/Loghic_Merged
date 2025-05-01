import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-white mt-12 border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-gray-500">
          <p>Project Merger Tool for Replit</p>
          <p className="mt-1">© 2023 Replit Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
