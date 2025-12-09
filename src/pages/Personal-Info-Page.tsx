import { useQuery } from "@apollo/client";
import { User, Mail, Phone, Loader2 } from "lucide-react";
import { GET_CUSTOMER } from "../graphql/queries";
import { CUSTOMER_ID } from "../constants/graphql-constants";
import { useNavigate } from "react-router-dom";

const PersonalInfoPage: React.FC = () => {
  const { data, loading, error } = useQuery(GET_CUSTOMER, {
    variables: { id: CUSTOMER_ID },
  });

  const navigate = useNavigate();

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
          Nepodařilo se načíst osobní údaje
        </p>
        <p className="text-red-500 text-sm mt-2">{error.message}</p>
      </div>
    );
  }

  const customer = data?.getCustomer;

  if (!customer) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
        <p className="text-yellow-600 font-medium">Zákazník nenalezen</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Osobní údaje</h2>
        <p className="text-sm text-slate-600 mt-1">Vaše účetové informace</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">
            {customer.name} {customer.surname}
          </h3>
        </div>

        <div className="p-6 space-y-6">
          <div data-testid="personal-name-section" className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Jméno
            </label>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
              <User className="w-5 h-5 text-slate-400" />
              <span className="text-slate-800 font-medium">
                {customer.name} {customer.surname}
              </span>
            </div>
          </div>

          <div data-testid="personal-email-section" className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              E-mail
            </label>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
              <Mail className="w-5 h-5 text-slate-400" />
              <a
                href={`mailto:${customer.email}`}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                {customer.email}
              </a>
            </div>
          </div>

          <div data-testid="personal-phone-section" className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Telefon
            </label>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
              <Phone className="w-5 h-5 text-slate-400" />
              <a
                href={`tel:${customer.phone}`}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                {customer.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-3">
        <button
          data-testid="edit-profile-button"
          className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
          onClick={() => console.log("Edit profile")}
        >
          Upravit profil
        </button>
        <button
          data-testid="logout-button"
          className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
          onClick={() => {
            navigate("/");
            console.log("Simulation of logout");
          }}
        >
          Odhlásit se
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoPage;
