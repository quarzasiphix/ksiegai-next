"use client";

import { useState } from "react";
import { Shield, Settings, FileText, AlertCircle, CheckCircle2, Plus, Trash2, Edit2 } from "lucide-react";

export default function AccountantDashboard() {
  const [activeTab, setActiveTab] = useState<'rules' | 'authority' | 'audit'>('rules');
  const [showRuleForm, setShowRuleForm] = useState(false);

  const ruleTypes = [
    { value: 'invoice_export', label: 'Eksport faktur', description: 'Kontrola eksportu do księgowości' },
    { value: 'asset_registration', label: 'Rejestracja środków trwałych', description: 'Wymóg rejestracji przed amortyzacją' },
    { value: 'expense_approval', label: 'Zatwierdzanie wydatków', description: 'Kontrola wydatków przed księgowaniem' },
    { value: 'contract_validity', label: 'Ważność umów', description: 'Wymogi dla ważnych umów' },
    { value: 'decision_required', label: 'Wymagana decyzja', description: 'Operacje wymagające decyzji' },
    { value: 'field_required', label: 'Wymagane pola', description: 'Obowiązkowe pola w dokumentach' },
    { value: 'approval_chain', label: 'Łańcuch zatwierdzeń', description: 'Wielopoziomowe zatwierdzenia' }
  ];

  const enforcementActions = [
    { value: 'block', label: 'Zablokuj', description: 'Całkowita blokada operacji', color: 'red' },
    { value: 'warn', label: 'Ostrzeż', description: 'Pokaż ostrzeżenie, ale pozwól kontynuować', color: 'yellow' },
    { value: 'require_approval', label: 'Wymagaj zatwierdzenia', description: 'Przekieruj do zatwierdzenia', color: 'blue' }
  ];

  const existingRules = [
    {
      id: '1',
      name: 'Faktury wymagają decyzji',
      type: 'decision_required',
      entity: 'invoice',
      action: 'block',
      active: true,
      message: 'Faktura nie może być wyeksportowana bez powiązania z zatwierdzoną decyzją.'
    },
    {
      id: '2',
      name: 'Środki trwałe muszą być zarejestrowane',
      type: 'asset_registration',
      entity: 'asset',
      action: 'block',
      active: true,
      message: 'Amortyzacja niemożliwa bez rejestracji środka trwałego.'
    },
    {
      id: '3',
      name: 'Wydatki powyżej 5000 PLN wymagają zatwierdzenia',
      type: 'expense_approval',
      entity: 'expense',
      action: 'require_approval',
      active: true,
      message: 'Wydatek przekracza limit i wymaga zatwierdzenia przez kierownika.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Panel księgowego
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Definiujesz reguły. System je egzekwuje.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>Twoja rola:</strong> Jako księgowy, masz pełną kontrolę nad regułami biznesowymi. 
              Klient nie może ich ominąć. System staje się narzędziem, które egzekwuje Twoje standardy.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'rules'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Reguły egzekwowania
            </div>
          </button>
          <button
            onClick={() => setActiveTab('authority')}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'authority'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Uprawnienia
            </div>
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'audit'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Dziennik audytu
            </div>
          </button>
        </div>

        {/* Rules Tab */}
        {activeTab === 'rules' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Reguły egzekwowania
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Zdefiniuj, co system ma blokować, ostrzegać lub wymagać zatwierdzenia.
                </p>
              </div>
              <button
                onClick={() => setShowRuleForm(!showRuleForm)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
              >
                <Plus className="h-5 w-5" />
                Nowa reguła
              </button>
            </div>

            {/* New Rule Form */}
            {showRuleForm && (
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800 mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Utwórz nową regułę
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nazwa reguły
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="np. Faktury powyżej 10000 PLN wymagają podwójnego zatwierdzenia"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Typ reguły
                      </label>
                      <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                        {ruleTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Typ dokumentu
                      </label>
                      <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                        <option value="invoice">Faktura</option>
                        <option value="expense">Wydatek</option>
                        <option value="contract">Umowa</option>
                        <option value="asset">Środek trwały</option>
                        <option value="decision">Decyzja</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Akcja egzekwowania
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {enforcementActions.map(action => (
                        <label
                          key={action.value}
                          className="flex items-start gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
                        >
                          <input type="radio" name="action" value={action.value} className="mt-1" />
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">{action.label}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{action.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Komunikat dla użytkownika
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Co użytkownik zobaczy, gdy reguła zostanie naruszona?"
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowRuleForm(false)}
                      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold transition-colors"
                    >
                      Anuluj
                    </button>
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                      Utwórz regułę
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Existing Rules */}
            <div className="space-y-3">
              {existingRules.map(rule => (
                <div
                  key={rule.id}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {rule.name}
                        </h3>
                        {rule.active ? (
                          <span className="flex items-center gap-1 text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                            <CheckCircle2 className="h-3 w-3" />
                            Aktywna
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                            <AlertCircle className="h-3 w-3" />
                            Nieaktywna
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {rule.entity}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          rule.action === 'block' 
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                            : rule.action === 'warn'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        }`}>
                          {rule.action === 'block' ? 'Blokada' : rule.action === 'warn' ? 'Ostrzeżenie' : 'Wymaga zatwierdzenia'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {rule.message}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Authority Tab */}
        {activeTab === 'authority' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Zarządzanie uprawnieniami
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Kontroluj, kto może zatwierdzać decyzje i na jakie kwoty.
            </p>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
              <p className="text-center text-gray-500 dark:text-gray-400">
                Funkcja w przygotowaniu
              </p>
            </div>
          </div>
        )}

        {/* Audit Tab */}
        {activeTab === 'audit' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Dziennik audytu egzekwowania
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Pełna historia wszystkich blokad, ostrzeżeń i nadpisań.
            </p>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
              <p className="text-center text-gray-500 dark:text-gray-400">
                Funkcja w przygotowaniu
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
