import { Outlet, NavLink } from "react-router-dom";
import { Calendar, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { ROUTES } from "@/constants/routes-constants";

const BaseLayout: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">Moje události</h1>
          <button
            data-testid="menu-toggle-button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          data-testid="mobile-menu"
          className="lg:hidden fixed inset-0 top-[73px] bg-white/95 backdrop-blur-sm z-40 px-4 py-6"
        >
          <nav className="flex flex-col gap-2">
            <NavLink
              data-testid="nav-reservations-mobile"
              to={ROUTES.RESERVATIONS}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Moje rezervace</span>
            </NavLink>
            <NavLink
              data-testid="nav-personal-mobile"
              to={ROUTES.PERSONAL}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Osobní údaje</span>
            </NavLink>
          </nav>
        </div>
      )}

      <main className="max-w-md lg:max-w-6xl xl:max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50">
        <div className="max-w-md mx-auto flex">
          <NavLink
            data-testid="nav-reservations-bottom"
            to={ROUTES.RESERVATIONS}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`
            }
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs font-medium">Rezervace</span>
          </NavLink>
          <NavLink
            data-testid="nav-personal-bottom"
            to={ROUTES.PERSONAL}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`
            }
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Osobní údaje</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default BaseLayout;
