import { User } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-semibold">
            WhiteBoard
          </Link>
        </div>

        {/* Icons Section */}
        <div className="flex items-center space-x-4">
          <button
            aria-label="Profile"
            className="p-2 rounded-full hover:bg-opacity-20"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
