/**
 * Modal para salvar o jogo
 */

import { useState, useEffect } from "react";
import { useGameStore } from "../../store/gameStore";
import { listSaves, getSavePreview, formatTimestamp } from "../../utils/saveManager";

interface SaveGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SaveGameModal({ isOpen, onClose }: SaveGameModalProps) {
  const { saveGame } = useGameStore();
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saves, setSaves] = useState(listSaves());

  // Recarregar saves quando modal abrir
  useEffect(() => {
    if (isOpen) {
      setSaves(listSaves());
    }
  }, [isOpen]);

  const savePreviews = saves.map((save) => getSavePreview(save));

  const handleSave = async () => {
    if (selectedSlot === null) {
      setSaveError("Por favor, selecione um slot");
      return;
    }

    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    // Verificar se slot já tem save
    const existingSave = saves[selectedSlot];
    if (existingSave) {
      const confirm = window.confirm(
        `O slot ${selectedSlot + 1} já contém um save de ${formatTimestamp(existingSave.timestamp)}. Deseja sobrescrever?`
      );
      if (!confirm) {
        setSaving(false);
        return;
      }
    }

    const success = saveGame(selectedSlot);

    if (success) {
      setSaveSuccess(true);
      setSaves(listSaves()); // Atualizar lista
      setTimeout(() => {
        onClose();
        setSaveSuccess(false);
        setSelectedSlot(null);
      }, 1500);
    } else {
      setSaveError("Erro ao salvar. Verifique se há espaço suficiente.");
    }

    setSaving(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-8 max-w-2xl w-full mx-4 border border-gray-700 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">Salvar Jogo</h2>

        <div className="space-y-4 mb-6">
          {[0, 1, 2, 3, 4].map((slot) => {
            const preview = savePreviews[slot];
            return (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selectedSlot === slot
                    ? "border-blue-500 bg-blue-900/30"
                    : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-lg font-semibold text-white">
                      Slot {slot + 1}
                    </div>
                    {preview.exists ? (
                      <div className="text-sm text-gray-400 mt-1">
                        <div>Salvo em: {preview.timestamp}</div>
                        <div>
                          Amabilidade: {preview.amabilityScore} | {preview.progress}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 mt-1">Vazio</div>
                    )}
                  </div>
                  {selectedSlot === slot && (
                    <div className="text-blue-400 text-xl">✓</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {saveError && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300">
            {saveError}
          </div>
        )}

        {saveSuccess && (
          <div className="mb-4 p-3 bg-green-900/30 border border-green-700 rounded-lg text-green-300">
            Jogo salvo com sucesso!
          </div>
        )}

        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving || selectedSlot === null}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}

