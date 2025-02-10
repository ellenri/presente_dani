import "./styles.css";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import QRCode from "qrcode";
import addAmountToPixCode from './pix/addAmount';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useHotjar from "./hooks/useHotjar";


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [amount, setAmount] = useState(0);
  const [pix, setPix] = useState<string | null>(null);
  const [apoiadores, setApoiadores] = useState(0);
  const meta = import.meta.env.VITE_META;

  useHotjar(Number(import.meta.env.VITE_HOTJAR_ID)); // Pegando o ID do Hotjar das variáveis de ambiente

  // Carrega os dados do Supabase ao iniciar
  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    if (valor) {
      updatePix();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valor]);

  const updatePix = async () => {
    const pixCodeWithoutAmount = '00020126360014BR.GOV.BCB.PIX0114+55629852019015204000053039865802BR5901N6001C62070503***63042660';
    const payload = addAmountToPixCode(pixCodeWithoutAmount, Number(valor));
    const url = await QRCode.toDataURL(payload);
    setPix(url);
    console.log('Extracted Amount:', payload);

  };

  const carregarDados = async () => {
    try {
      // Busca todos os doadores
      const { data: doadores, error } = await supabase
        .from("doadores")
        .select("*");

      if (error) throw error;

      // Calcula o total arrecadado
      const total =
        doadores?.reduce((acc, doador) => acc + doador.valor, 0) || 0;
      setAmount(total);
      setApoiadores(doadores?.length || 0);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Insere novo doador
      const { error } = await supabase
        .from("doadores")
        .insert([{ nome, valor: Number(valor) }]);

      if (error) throw error;

      // Atualiza os dados
      await carregarDados();

      // Avança para o próximo passo
      setStep(2);
    } catch (error) {
      console.error("Erro ao salvar doação:", error);
      alert("Erro ao processar doação. Por favor, tente novamente.");
    }
  };

  const copyPixKey = () => {
    if(valor) {
      const pixCodeWithoutAmount = '00020126360014BR.GOV.BCB.PIX0114+55629852019015204000053039865802BR5901N6001C62070503***63042660';
      const payload = addAmountToPixCode(pixCodeWithoutAmount, Number(valor));
      navigator.clipboard.writeText(payload);
      toast.success("Chave PIX copiada!");
    } else {
      toast.error("Não há chave PIX disponível.");
    }
  };

  const formatarMoeda = (valor: string | number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(valor));
  };

  return (
    <div className="container">
      {/* Cabeçalho */}
      <div className="header">
        <h1 className="title">
          Presente de Aniversário Daniele - CNH
          <span className="car-animation">🚗</span>
        </h1>
      </div>

      {/* Card Principal */}
      <div className="card">
        <img src="/dani.jpg" alt="Foto da Dani" className="card-image" />

        <div className="card-content">
          <div>
            <div className="category">Arrecadado</div>
            <div className="amount">{formatarMoeda(amount)}</div>
            <div className="goal">Meta: {formatarMoeda(meta)}</div>
          </div>

          <div className="progress-bar">
            <div
              className="progress-value"
              style={{ width: `${(amount / Number(meta)) * 100}%` }}
            ></div>
          </div>

          <div className="footer">
            <div className="supporters">Apoiadores: {apoiadores}</div>
            <button className="button" onClick={() => setIsModalOpen(true)}>
              Quero Ajudar
            </button>
          </div>
        </div>
      </div>

      {/* Descrição */}
      <div className="description">
        <p>Oi gente! Descrição do nosso presente:</p>
        <div className="grid-container">
          <div>Processo CNH 1ª via B 🚗</div>
          <br/>
          <div><strong>R$ 190,00</strong> Exames</div>
          <div><strong>R$ 350,00</strong> Curso online</div>
          <div><strong>R$ 422,50</strong> Taxa Detran</div>
          <div><strong>R$ 200,00</strong> Telemetria</div>
          <div><strong>R$ 800,00</strong> Pacote 20 aulas carro</div>
          <div><strong>R$ 50,00</strong> Aluguel Carro</div>
        </div>
        <p><strong>Total: R$ 2.012,50</strong></p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="close-button"
              onClick={() => {
                setIsModalOpen(false);
                setStep(1);
                setValor("");
                setNome("");
              }}
            >
              ×
            </button>

            {step === 1 ? (
              <form onSubmit={handleSubmit} className="form">
                <h2>Dados da Doação</h2>
                <div className="form-group">
                  <label htmlFor="nome">Seu Nome:</label>
                  <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="valor">Valor da Doação:</label>
                  <input
                    type="number"
                    id="valor"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    min="1"
                    step="0.01"
                    required
                  />
                </div>
                <button type="submit" className="button">
                  Continuar
                </button>
              </form>
            ) : (
              <div className="pix-container">
                <h2>Pagamento via PIX</h2>
                <div className="qr-code">
                  {pix && (
                    <img
                      src={pix}
                      alt="PIX QR Code"
                      style={{ width: "300px", height: "200px" }}
                    />
                  )}
                  {/* <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020126360014BR.GOV.BCB.PIX0114+55629852019015204000053039865802BR5901N6001C62070503***63042660"
                    alt="QR Code PIX"
                  /> */}
                </div>
                <div className="pix-key">
                  <p>Chave PIX: 62 985201901</p>
                  <button className="button" onClick={copyPixKey}>
                    Copiar Chave
                  </button>
                </div>
                <p>Ellen Ribeiro Borges - NuBank</p>
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
