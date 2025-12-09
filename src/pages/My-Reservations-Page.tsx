import { Plus, Loader2, Calendar as CalendarIcon } from "lucide-react";
import { useQuery } from "@apollo/client";
import { Calendar, CalendarState } from "@/types";
import { GET_CALENDARS } from "../graphql/queries";
import ReservationCard from "../components/Reservation-Card";
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
      <div
        data-testid="loading-spinner"
        className="flex items-center justify-center min-h-[60vh]"
      >
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
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
