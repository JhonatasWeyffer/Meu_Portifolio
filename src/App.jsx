import React, { useRef, useState, useEffect } from "react";

/**
 * App
 * - Mostra imagem + textos
 * - Ao clicar na imagem alterna play/pause da música
 */
export default function App({
  imageSrc = "/img.jpeg",
  audioSrc = "/Shoot-To-Thrill.mp3",
}) {
  // estado que diz se o áudio está tocando
  const [isPlaying, setIsPlaying] = useState(false);

  // ref para o elemento Audio (persistente entre renders)
  const audioRef = useRef(null);

  // cria o Audio uma vez
  useEffect(() => {
    audioRef.current = new Audio(audioSrc);
    audioRef.current.preload = "auto";
    // opcional: reduzir volume inicial
    audioRef.current.volume = 0.6;

    // cleanup ao desmontar: pause e descarrega
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  // Função toggle para play/pause
  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // play() retorna uma Promise; lidar com bloqueio do navegador
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      // possível bloqueio de autoplay pelo navegador;
      // mostrar mensagem no console (ou exibir UI)
      console.error("Erro ao tentar reproduzir o áudio:", err);
    }
  };

  return (
    <div className="page-root">
      <main className="card" role="main" aria-labelledby="title">
        <p className="subtitle">
          <em>
            Portifólio — JhonWeyffer
          </em>
        </p>
        <button
          className="image-button"
          onClick={togglePlay}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? "Pausar música" : "Tocar música"}
        >
          <img src={imageSrc} alt="Em desenvolvimento" className="dev-image" />
        </button>

        <h1 id="title" className="title">Em desenvolvimento</h1>

        <p className="subtitle">
          <em>
            "Calma, estou apenas afinando o próximo truque."<br/>Pode voltar daqui a um tempo.
          </em>
        </p>
      </main>
    </div>
  );
}
