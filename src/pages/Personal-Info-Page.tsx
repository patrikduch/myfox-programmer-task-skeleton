import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { User, Mail, Phone, Loader2 } from "lucide-react";
import { GET_CUSTOMER } from "../graphql/queries";
import { UPDATE_CUSTOMER } from "../graphql/mutations";
import { CUSTOMER_ID } from "../constants/graphql-constants";
import { useNavigate } from "react-router-dom";

const PersonalInfoPage: React.FC = () => {
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_CUSTOMER, {
    variables: { id: CUSTOMER_ID },
  });

  const [updateCustomer, { loading: updating, error: updateError }] =
    useMutation(UPDATE_CUSTOMER, {
      refetchQueries: [
        {
          query: GET_CUSTOMER,
          variables: { id: CUSTOMER_ID },
        },
      ],
    });

  const customer = data?.getCustomer;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string | undefined>("");

  // naplnění lokálního state po načtení zákazníka
  useEffect(() => {
    if (customer) {
      setName(customer.name ?? "");
      setSurname(customer.surname ?? "");
      setEmail(customer.email ?? "");
      setPhone(customer.phone ?? "");
    }
  }, [customer]);

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

  if (!customer) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
        <p className="text-yellow-600 font-medium">Zákazník nenalezen</p>
      </div>
    );
  }

  const handleSave = async () => {
    try {
      await updateCustomer({
        variables: {
          id: CUSTOMER_ID,
          data: {
            name,
            surname,
            email,
            phone: phone || null,
          },
        },
      });

      setIsEditing(false);
    } catch (err) {
      console.error("Update customer failed", err);
    }
  };

  const handleCancelEdit = () => {
    // reset zpět na původní hodnoty
    setName(customer.name ?? "");
    setSurname(customer.surname ?? "");
    setEmail(customer.email ?? "");
    setPhone(customer.phone ?? "");
    setIsEditing(false);
  };

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
            {isEditing ? (
              <>
                {name || "Jméno"} {surname || "Příjmení"}
              </>
            ) : (
              <>
                {customer.name} {customer.surname}
              </>
            )}
          </h3>
        </div>

        <div className="p-6 space-y-6">
          {/* Jméno + příjmení */}
          <div data-testid="personal-name-section" className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Jméno
            </label>
            <div className="flex flex-col gap-3 p-4 bg-slate-50 rounded-xl md:flex-row">
              <div className="flex items-center gap-3 flex-1">
                <User className="w-5 h-5 text-slate-400" />
                {isEditing ? (
                  <div className="flex flex-col w-full gap-2 md:flex-row">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jméno"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                    <input
                      type="text"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      placeholder="Příjmení"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                ) : (
                  <span className="text-slate-800 font-medium">
                    {customer.name} {customer.surname}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* E-mail */}
          <div data-testid="personal-email-section" className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              E-mail
            </label>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
              <Mail className="w-5 h-5 text-slate-400" />
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              ) : (
                <a
                  href={`mailto:${customer.email}`}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  {customer.email}
                </a>
              )}
            </div>
          </div>

          {/* Telefon */}
          <div data-testid="personal-phone-section" className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Telefon
            </label>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
              <Phone className="w-5 h-5 text-slate-400" />
              {isEditing ? (
                <input
                  type="tel"
                  value={phone ?? ""}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefon"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : customer.phone ? (
                <a
                  href={`tel:${customer.phone}`}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  {customer.phone}
                </a>
              ) : (
                <span className="text-slate-500">Neuvedeno</span>
              )}
            </div>
          </div>

          {updateError && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              Uložení změn se nezdařilo. Zkuste to prosím znovu.
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-3">
        <button
          data-testid="edit-profile-button"
          className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          disabled={updating}
        >
          {isEditing
            ? updating
              ? "Ukládám..."
              : "Uložit změny"
            : "Upravit profil"}
        </button>

        {isEditing && (
          <button
            type="button"
            className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
            onClick={handleCancelEdit}
          >
            Zrušit
          </button>
        )}

        {!isEditing && (
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
        )}
      </div>
    </div>
  );
};

export default PersonalInfoPage;
