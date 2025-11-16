/**
 * Componente para executar testes do sistema de condições no navegador
 */

import { useState } from "react";
import { runAllTests } from "../../utils/conditions.test";

export function ConditionsTestRunner() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<string>("");

  const handleRunTests = () => {
    setIsRunning(true);
    setResults("");

    // Capturar console.log
    const originalLog = console.log;
    const logs: string[] = [];

    console.log = (...args: any[]) => {
      logs.push(args.map((arg) => String(arg)).join(" "));
      originalLog(...args);
    };

    try {
      runAllTests();
    } catch (error) {
      logs.push(`❌ Erro ao executar testes: ${error}`);
    } finally {
      console.log = originalLog;
      setResults(logs.join("\n"));
      setIsRunning(false);
    }
  };

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🧪 Testes do Sistema de Condições</h1>

        <div className="mb-6">
          <button
            onClick={handleRunTests}
            disabled={isRunning}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
          >
            {isRunning ? "Executando..." : "Executar Todos os Testes"}
          </button>
        </div>

        {results && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Resultados:</h2>
            <pre className="whitespace-pre-wrap font-mono text-sm overflow-auto max-h-96 bg-gray-900 p-4 rounded">
              {results}
            </pre>
          </div>
        )}

        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📋 Suites de Testes:</h2>
          <ul className="space-y-2 text-gray-300">
            <li>✅ Condições de Pontuação (amabilityScore, empathyScore, etc.)</li>
            <li>✅ Condições de Progresso (playthroughCount)</li>
            <li>✅ Condições de Histórico (choicesMade)</li>
            <li>✅ Condições de Personagens (charactersMet)</li>
            <li>✅ Combinações de Condições (AND lógico)</li>
            <li>✅ Edge Cases (valores limites, null/undefined)</li>
            <li>✅ ConditionRequirement (ranges, personagens, escolhas)</li>
          </ul>
        </div>

        <div className="mt-6 bg-blue-900/30 rounded-lg p-4 border border-blue-700">
          <p className="text-sm">
            <strong>Nota:</strong> Os testes também podem ser executados via console do navegador
            importando e chamando <code className="bg-gray-700 px-2 py-1 rounded">runAllTests()</code>
          </p>
        </div>
      </div>
    </div>
  );
}


