import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { useQuery } from "@apollo/client";
import { Calendar, CalendarState } from "@/types";
import { GET_CALENDARS } from "@/graphql/queries";
import ReservationCard from "@/components/Reservation-Card";
import { CUSTOMER_ID } from "@/constants/graphql-constants";
import { getFormUrl } from "@/utils/url-utils";

const MyReservations: React.FC = () => {
  const { data, loading, error } = useQuery(GET_CALENDARS, {
    variables: { customerId: CUSTOMER_ID },
  });

  const calendars: Calendar[] = data?.listCalendars || [];

  const currentReservations = calendars.filter(
    (cal) => cal.state === CalendarState.Open
  );

  const handleCreateReservation = () => {
    const alias = calendars[0]?.subject?.alias || "default";
    window.location.href = getFormUrl(alias);
  };

  if (loading) {
    return (
      <div className="space-y-6 pb-24 animate-pulse">
        {/* Skeleton header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-40 bg-slate-200 rounded-lg" />
            <div className="h-4 w-24 bg-slate-200 rounded-lg" />
          </div>
          <div className="h-12 w-12 rounded-full bg-slate-200" />
        </div>

        {/* Skeleton cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
            >
              {/* Image skeleton */}
              <div className="h-40 bg-slate-200" />

              {/* Content skeleton */}
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <div className="h-4 w-3/4 bg-slate-200 rounded-lg" />
                  <div className="h-3 w-1/2 bg-slate-200 rounded-lg" />
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-slate-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-1/3 bg-slate-200 rounded-lg" />
                    <div className="h-3 w-1/2 bg-slate-200 rounded-lg" />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-slate-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-2/3 bg-slate-200 rounded-lg" />
                    <div className="h-3 w-1/3 bg-slate-200 rounded-lg" />
                  </div>
                </div>

                <div className="h-3 w-1/4 bg-slate-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <p className="text-red-600 font-medium">
          Nepodarilo sa načítať rezervácie
        </p>
        <p className="text-red-500 text-sm mt-2">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Moje rezervace</h2>
          <p className="text-sm text-slate-600 mt-1">
            {currentReservations.length}{" "}
            {currentReservations.length === 1 ? "rezervace" : "rezervací"}
          </p>
        </div>
        <button
          data-testid="create-reservation-button"
          onClick={handleCreateReservation}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          aria-label="Vytvořit novou rezervaci"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {currentReservations.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-slate-100">
          <CalendarIcon className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <p className="text-slate-600 text-lg font-medium mb-2">
            Zatím nemáte žádné rezervace
          </p>
          <p className="text-slate-500 text-sm mb-6">
            Vytvořte si první rezervaci
          </p>
          <button
            data-testid="empty-state-create-button"
            onClick={handleCreateReservation}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Vytvořit rezervaci
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {currentReservations.map((calendar) => (
            <ReservationCard key={calendar.id} calendar={calendar} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReservations;
