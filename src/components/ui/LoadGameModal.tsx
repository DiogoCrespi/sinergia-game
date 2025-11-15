/**
 * Modal para carregar o jogo
 */

import { useState, useEffect } from "react";
import { useGameStore } from "../../store/gameStore";
import { listSaves, getSavePreview, formatTimestamp, deleteSave } from "../../utils/saveManager";

interface LoadGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoadGameModal({ isOpen, onClose }: LoadGameModalProps) {
  const { loadGame, currentState } = useGameStore();
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [deletingSlot, setDeletingSlot] = useState<number | null>(null);
  const [saves, setSaves] = useState(listSaves());

  // Recarregar saves quando modal abrir
  useEffect(() => {
    if (isOpen) {
      setSaves(listSaves());
    }
  }, [isOpen]);

  const savePreviews = saves.map((save) => getSavePreview(save));

  const handleLoad = async (slot: number) => {
    if (!saves[slot]) {
      setLoadError("Nenhum save encontrado neste slot");
      return;
    }

    // Confirmar se há progresso atual
    if (currentState === "playing") {
      const confirm = window.confirm(
        "Carregar este save irá perder seu progresso atual. Deseja continuar?"
      );
      if (!confirm) return;
    }

    setLoading(true);
    setLoadError(null);

    const success = await loadGame(slot);

    if (success) {
      onClose();
    } else {
      setLoadError("Erro ao carregar save. O arquivo pode estar corrompido.");
    }

    setLoading(false);
  };

  const handleDelete = (slot: number) => {
    if (!saves[slot]) return;

    const confirm = window.confirm(
      `Tem certeza que deseja deletar o save do slot ${slot + 1}?`
    );
    if (!confirm) return;

    setDeletingSlot(slot);
    const success = deleteSave(slot);
    
    if (success) {
      // Atualizar lista de saves
      setSaves(listSaves());
    }
    
    setDeletingSlot(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-8 max-w-2xl w-full mx-4 border border-gray-700 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">Carregar Jogo</h2>

        <div className="space-y-4 mb-6">
          {[0, 1, 2, 3, 4].map((slot) => {
            const preview = savePreviews[slot];
            const hasSave = saves[slot] !== null;

            return (
              <div
                key={slot}
                className={`p-4 rounded-lg border-2 ${
                  hasSave
                    ? "border-gray-700 bg-gray-800/50"
                    : "border-gray-800 bg-gray-900/30 opacity-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left flex-1">
                    <div className="text-lg font-semibold text-white">
                      Slot {slot + 1}
                    </div>
                    {preview.exists ? (
                      <div className="text-sm text-gray-400 mt-1 space-y-1">
                        <div>Salvo em: {preview.timestamp}</div>
                        <div>
                          Amabilidade: {preview.amabilityScore} | {preview.progress}
                        </div>
                        <div className="text-xs text-gray-500">
                          Escolhas: {saves[slot]?.gameState.choicesHistory.length || 0}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 mt-1">Vazio</div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {hasSave && (
                      <>
                        <button
                          onClick={() => handleLoad(slot)}
                          disabled={loading}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-colors"
                        >
                          {loading ? "Carregando..." : "Carregar"}
                        </button>
                        <button
                          onClick={() => handleDelete(slot)}
                          disabled={deletingSlot === slot}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-colors"
                        >
                          {deletingSlot === slot ? "..." : "Deletar"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {loadError && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300">
            {loadError}
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

