"use client";

import { useState } from "react";
import { Shield, Users, FileCheck, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

export default function GovernanceOnboarding() {
  const [step, setStep] = useState(1);
  const [decisionMakers, setDecisionMakers] = useState<Array<{
    name: string;
    email: string;
    role: string;
    authority: string;
    maxAmount?: number;
  }>>([]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    email: "",
    role: "",
    authority: "employee" as const,
    maxAmount: undefined as number | undefined
  });

  const authorityLevels = [
    { value: 'owner', label: 'Właściciel / Zarząd', description: 'Pełna władza decyzyjna' },
    { value: 'director', label: 'Dyrektor', description: 'Decyzje strategiczne' },
    { value: 'manager', label: 'Kierownik', description: 'Decyzje operacyjne' },
    { value: 'accountant', label: 'Główny księgowy', description: 'Kontrola finansowa' },
    { value: 'supervisor', label: 'Supervisor', description: 'Nadzór zespołu' },
    { value: 'employee', label: 'Pracownik', description: 'Wykonanie zadań' }
  ];

  const addDecisionMaker = () => {
    if (newPerson.name && newPerson.email && newPerson.authority) {
      setDecisionMakers([...decisionMakers, { ...newPerson }]);
      setNewPerson({
        name: "",
        email: "",
        role: "",
        authority: "employee",
        maxAmount: undefined
      });
    }
  };

  const removePerson = (index: number) => {
    setDecisionMakers(decisionMakers.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/30 mb-6">
            <Shield className="h-5 w-5 text-blue-400" />
            <span className="text-blue-300 text-sm font-semibold">Konfiguracja struktury zarządzania</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Zdefiniuj strukturę odpowiedzialności
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            To nie jest formularz. To moment, w którym stajesz się infrastrukturą.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                1
              </div>
              <span className="text-sm font-medium">Struktura władzy</span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-gray-300 dark:bg-gray-700">
              <div className={`h-full bg-blue-600 transition-all ${step >= 2 ? 'w-full' : 'w-0'}`} />
            </div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="text-sm font-medium">Reguły egzekwowania</span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-gray-300 dark:bg-gray-700">
              <div className={`h-full bg-blue-600 transition-all ${step >= 3 ? 'w-full' : 'w-0'}`} />
            </div>
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                3
              </div>
              <span className="text-sm font-medium">Potwierdzenie</span>
            </div>
          </div>
        </div>

        {/* Step 1: Decision Makers */}
        {step === 1 && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Kto może podejmować wiążące decyzje w tej firmie?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                To pytanie definiuje, kto ma władzę. System będzie to egzekwował.
              </p>
            </div>

            {/* Critical Warning */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    To nie jest lista kontaktów
                  </h3>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    Każda osoba, którą tutaj dodasz, otrzyma realną władzę w systemie. 
                    Będzie mogła zatwierdzać wydatki, podpisywać umowy i wiązać firmę zobowiązaniami.
                    <strong className="block mt-2">Wszystko zostanie zalogowane i będzie śledzone.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Add Person Form */}
            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Imię i nazwisko
                  </label>
                  <input
                    type="text"
                    value={newPerson.name}
                    onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Jan Kowalski"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newPerson.email}
                    onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="jan@firma.pl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Stanowisko
                </label>
                <input
                  type="text"
                  value={newPerson.role}
                  onChange={(e) => setNewPerson({ ...newPerson, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Prezes Zarządu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Poziom uprawnień
                </label>
                <select
                  value={newPerson.authority}
                  onChange={(e) => setNewPerson({ ...newPerson, authority: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {authorityLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label} — {level.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Maksymalna kwota decyzji (PLN) — opcjonalne
                </label>
                <input
                  type="number"
                  value={newPerson.maxAmount || ''}
                  onChange={(e) => setNewPerson({ ...newPerson, maxAmount: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Bez limitu"
                />
              </div>

              <button
                onClick={addDecisionMaker}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Dodaj osobę
              </button>
            </div>

            {/* Decision Makers List */}
            {decisionMakers.length > 0 && (
              <div className="space-y-3 mb-8">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Osoby z uprawnieniami ({decisionMakers.length})
                </h3>
                {decisionMakers.map((person, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white">{person.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{person.email} • {person.role}</div>
                      <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                        {authorityLevels.find(l => l.value === person.authority)?.label}
                        {person.maxAmount && ` • Limit: ${person.maxAmount.toLocaleString()} PLN`}
                      </div>
                    </div>
                    <button
                      onClick={() => removePerson(index)}
                      className="ml-4 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={decisionMakers.length === 0}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
              >
                Dalej: Reguły egzekwowania
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Enforcement Rules */}
        {step === 2 && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Jak system ma egzekwować porządek?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Wybierz, co system będzie blokował bez zatwierdzenia.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {[
                {
                  id: 'invoice_decision',
                  title: 'Faktury wymagają decyzji',
                  description: 'Żadna faktura nie może być wyeksportowana do księgowości bez powiązania z zatwierdzoną decyzją.',
                  recommended: true
                },
                {
                  id: 'asset_registration',
                  title: 'Środki trwałe muszą być zarejestrowane',
                  description: 'Amortyzacja niemożliwa bez rejestracji w systemie i powiązania z decyzją zakupu.',
                  recommended: true
                },
                {
                  id: 'expense_approval',
                  title: 'Wydatki bez zatwierdzenia = ryzyko osobiste',
                  description: 'Wydatki niezatwierdzone są oznaczane jako potencjalne ryzyko osobiste pracownika.',
                  recommended: true
                },
                {
                  id: 'contract_owner',
                  title: 'Umowy bez właściciela są nieważne',
                  description: 'Każda umowa musi mieć przypisaną osobę odpowiedzialną i decyzję zatwierdzającą.',
                  recommended: true
                },
                {
                  id: 'decision_budget',
                  title: 'Przekroczenie budżetu decyzji = blokada',
                  description: 'System nie pozwoli na wydatki przekraczające zatwierdzony budżet decyzji.',
                  recommended: false
                }
              ].map(rule => (
                <label key={rule.id} className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    defaultChecked={rule.recommended}
                    className="mt-1 h-5 w-5 text-blue-600 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{rule.title}</span>
                      {rule.recommended && (
                        <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                          Zalecane
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{rule.description}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-8 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold transition-colors"
              >
                Wstecz
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Dalej: Potwierdzenie
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Potwierdź strukturę zarządzania
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Od tego momentu system staje się infrastrukturą.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Co się stanie:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FileCheck className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Wszystkie osoby z listy otrzymają uprawnienia zgodnie z przypisanymi poziomami
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Reguły egzekwowania zostaną aktywowane i system będzie je wymuszał
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Każda decyzja, zatwierdzenie i odmowa będą logowane z pełnym śladem audytu
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
              <p className="text-sm text-blue-900 dark:text-blue-100 text-center">
                <strong>Pamiętaj:</strong> System nie będzie krzyczeć. Po prostu będzie odmawiał wykonania operacji, 
                które nie spełniają zdefiniowanych reguł. To cicha, ale skuteczna egzekucja.
              </p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-8 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold transition-colors"
              >
                Wstecz
              </button>
              <button
                onClick={() => {
                  alert('Struktura zarządzania została zapisana. System jest teraz aktywny.');
                }}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                Aktywuj system
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
