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
  const [loadingSlot, setLoadingSlot] = useState<number | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [deletingSlot, setDeletingSlot] = useState<number | null>(null);
  const [saves, setSaves] = useState(listSaves());

  // Recarregar saves quando modal abrir
  useEffect(() => {
    if (isOpen) {
      setSaves(listSaves());
      setLoadError(null);
      setLoadingSlot(null);
      setDeletingSlot(null);
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

    setLoadingSlot(slot);
    setLoadError(null);

    try {
      const success = await loadGame(slot);

      if (success) {
        onClose();
      } else {
        setLoadError("Erro ao carregar save. O arquivo pode estar corrompido.");
      }
    } catch (error) {
      setLoadError("Erro ao carregar save. O arquivo pode estar corrompido.");
    } finally {
      setLoadingSlot(null);
    }
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
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={(e) => {
        // Fechar ao clicar no backdrop (não fechar se estiver carregando)
        if (e.target === e.currentTarget && loadingSlot === null) {
          onClose();
        }
      }}
    >
      <div 
        style={{
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '1rem',
          padding: '2rem',
          maxWidth: '42rem',
          width: '100%',
          border: '1px solid rgba(55, 65, 81, 0.8)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 
          className="text-3xl font-bold text-white mb-6"
          style={{
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
          }}
        >
          Carregar Jogo
        </h2>

        <div className="space-y-3 mb-6">
          {[0, 1, 2, 3, 4].map((slot) => {
            const preview = savePreviews[slot];
            const hasSave = saves[slot] !== null;
            const isLoadingSlot = loadingSlot === slot;

            return (
              <div
                key={slot}
                style={{
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  border: `2px solid ${hasSave ? 'rgba(55, 65, 81, 0.8)' : 'rgba(31, 41, 55, 0.5)'}`,
                  backgroundColor: hasSave 
                    ? 'rgba(31, 41, 55, 0.6)' 
                    : 'rgba(17, 24, 39, 0.4)',
                  opacity: hasSave ? 1 : 0.6,
                  transition: 'all 0.2s'
                }}
                className="hover:border-gray-600"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="text-left flex-1 min-w-0">
                    <div 
                      className="text-lg font-semibold text-white mb-2"
                      style={{
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      Slot {slot + 1}
                    </div>
                    {preview.exists ? (
                      <div 
                        className="text-sm text-gray-300 space-y-1"
                        style={{
                          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                        }}
                      >
                        <div className="font-medium">Salvo em: {preview.timestamp}</div>
                        <div>
                          Amabilidade: <span className="text-blue-400 font-semibold">{preview.amabilityScore}</span> | {preview.progress}
                        </div>
                        <div className="text-xs text-gray-400">
                          Escolhas: {saves[slot]?.gameState.choicesHistory.length || 0}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 mt-1">Vazio</div>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {hasSave && (
                      <>
                        <button
                          onClick={() => handleLoad(slot)}
                          disabled={isLoadingSlot}
                          style={{
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)'
                          }}
                          className="px-4 py-2 bg-blue-600/90 hover:bg-blue-700/90 disabled:bg-gray-800/50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                        >
                          {isLoadingSlot ? "Carregando..." : "Carregar"}
                        </button>
                        <button
                          onClick={() => handleDelete(slot)}
                          disabled={deletingSlot === slot || isLoadingSlot}
                          style={{
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)'
                          }}
                          className="px-4 py-2 bg-red-600/90 hover:bg-red-700/90 disabled:bg-gray-800/50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
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
          <div 
            className="mb-4 p-3 bg-red-900/40 border border-red-700/50 rounded-lg text-red-200"
            style={{
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            {loadError}
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={onClose}
            disabled={loadingSlot !== null}
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
            className="px-6 py-3 bg-gray-700/90 hover:bg-gray-600/90 disabled:bg-gray-800/50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

