import { useEffect, useState } from "react";
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  MoreVertical,
  Download,
  Phone,
  User,
} from "lucide-react";
import { format } from "date-fns";
import { cs } from "date-fns/locale/cs";
import { Calendar } from "@/types";
import { getImageUrl } from "@/utils/url-utils";

interface ReservationCardProps {
  calendar: Calendar;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ calendar }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [resolvedImageUrl, setResolvedImageUrl] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const dateFrom = new Date(calendar.from);
  const dateTo = new Date(calendar.to);

  const formattedDate = format(dateFrom, "d. MMMM yyyy", { locale: cs });
  const timeFrom = format(dateFrom, "HH:mm");
  const timeTo = format(dateTo, "HH:mm");

  const firstCart = calendar.carts?.[0];
  const itemName = firstCart?.item?.name || firstCart?.name || "Rezervácia";
  const itemPicture = firstCart?.item?.picture;
  const shopName = calendar.shop?.name || calendar.subject?.name || "";

  const imageSecret =
    itemPicture?.secret || calendar.subject?.microsite?.logo?.secret || null;

  useEffect(() => {
    let cancelled = false;

    setResolvedImageUrl(null);
    setImageError(false);

    if (!imageSecret) {
      setIsImageLoading(false);
      return;
    }

    setIsImageLoading(true);

    const loadImage = async () => {
      try {
        const url = await getImageUrl(imageSecret);
        if (!cancelled) {
          if (url) {
            setResolvedImageUrl(url);
          } else {
            setImageError(true);
            setIsImageLoading(false);
          }
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error loading image URL", err);
          setImageError(true);
          setIsImageLoading(false);
        }
      }
    };

    loadImage();

    return () => {
      cancelled = true;
    };
  }, [imageSecret]);

  const handleMenuClick = (action: string) => {
    console.log(`Action: ${action}`);
    setShowMenu(false);
  };

  return (
    <div
      data-testid={`reservation-card-${calendar.id}`}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-200"
    >
      <div className="relative h-40 bg-gradient-to-br from-blue-400 to-indigo-500">
        {imageSecret && !imageError ? (
          <>
            {(!resolvedImageUrl || isImageLoading) && (
              <div className="w-full h-full bg-slate-200 animate-pulse" />
            )}

            {resolvedImageUrl && (
              <img
                src={resolvedImageUrl}
                alt={itemName}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isImageLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setIsImageLoading(false)}
                onError={() => {
                  setImageError(true);
                  setIsImageLoading(false);
                }}
              />
            )}
          </>
        ) : (
          // fallback jen když není secret nebo došlo k chybě
          <div className="w-full h-full flex items-center justify-center text-white">
            <CalendarIcon className="w-16 h-16 opacity-50" />
          </div>
        )}

        {/* MENU BUTTON */}
        <div className="absolute top-3 right-3">
          <button
            data-testid={`menu-button-${calendar.id}`}
            onClick={() => setShowMenu(!showMenu)}
            className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors shadow-lg"
          >
            <MoreVertical className="w-5 h-5 text-slate-700" />
          </button>

          {showMenu && (
            <div
              data-testid={`menu-dropdown-${calendar.id}`}
              className="absolute top-12 right-0 bg-white rounded-xl shadow-xl border border-slate-100 min-w-[200px] py-2 z-10"
            >
              <button
                data-testid={`menu-route-${calendar.id}`}
                onClick={() => handleMenuClick("route")}
                className="w-full px-4 py-2 text-left hover:bg-slate-50 transition-colors flex items-center gap-3 text-slate-700"
              >
                <MapPin className="w-4 h-4" />
                <span>Trasa</span>
              </button>
              <button
                data-testid={`menu-calendar-${calendar.id}`}
                onClick={() => handleMenuClick("calendar")}
                className="w-full px-4 py-2 text-left hover:bg-slate-50 transition-colors flex items-center gap-3 text-slate-700"
              >
                <Download className="w-4 h-4" />
                <span>Přidat do kalendáře</span>
              </button>
              <button
                data-testid={`menu-contacts-${calendar.id}`}
                onClick={() => handleMenuClick("contacts")}
                className="w-full px-4 py-2 text-left hover:bg-slate-50 transition-colors flex items-center gap-3 text-slate-700"
              >
                <Phone className="w-4 h-4" />
                <span>Přidat do kontaktů</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{itemName}</h3>
          <p className="text-sm text-slate-600">{shopName}</p>
        </div>

        <div className="flex items-start gap-3">
          <CalendarIcon className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-800">
              {formattedDate}
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
              <Clock className="w-4 h-4" />
              <span>
                {timeFrom} - {timeTo}
              </span>
            </div>
          </div>
        </div>

        {calendar.shop?.address && (
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-slate-600 flex-1">
              {calendar.shop.address.street && (
                <p>{calendar.shop.address.street}</p>
              )}
              {(calendar.shop.address.city || calendar.shop.address.zip) && (
                <p>
                  {calendar.shop.address.zip && `${calendar.shop.address.zip} `}
                  {calendar.shop.address.city}
                </p>
              )}
            </div>
          </div>
        )}

        {calendar.shop?.phone && (
          <div className="hidden lg:flex items-start gap-3">
            <Phone className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <a
              href={`tel:${calendar.shop.phone}`}
              className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              {calendar.shop.phone}
            </a>
          </div>
        )}

        {calendar.employees &&
          calendar.employees.length > 0 &&
          calendar.employees[0].userMyFox && (
            <div className="hidden lg:block">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Kontaktní osoba
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-slate-800">
                    {calendar.employees[0].userMyFox.name}{" "}
                    {calendar.employees[0].userMyFox.surname}
                  </p>
                  {calendar.employees[0].userMyFox.phone && (
                    <a
                      href={`tel:${calendar.employees[0].userMyFox.phone}`}
                      className="text-xs text-blue-600 hover:text-blue-700"
                    >
                      {calendar.employees[0].userMyFox.phone}
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

        {calendar.note && (
          <div className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3 mt-3">
            <p className="font-medium text-slate-700 mb-1">Poznámka:</p>
            <p>{calendar.note}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;
