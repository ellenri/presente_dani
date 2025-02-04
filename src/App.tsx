import './styles.css'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [nome, setNome] = useState('')
  const [valor, setValor] = useState('')
  const [amount, setAmount] = useState(0)
  const [apoiadores, setApoiadores] = useState(0)
  const chavePix = '123456789' // Substitua pela sua chave PIX real
  const meta = import.meta.env.VITE_META

  // Carrega os dados do Supabase ao iniciar
  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    try {
      // Busca todos os doadores
      const { data: doadores, error } = await supabase
        .from('doadores')
        .select('*')

      if (error) throw error

      // Calcula o total arrecadado
      const total = doadores?.reduce((acc, doador) => acc + doador.valor, 0) || 0
      setAmount(total)
      setApoiadores(doadores?.length || 0)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Insere novo doador
      const { error } = await supabase
        .from('doadores')
        .insert([
          { nome, valor: Number(valor) }
        ])

      if (error) throw error

      // Atualiza os dados
      await carregarDados()
      
      // Avança para o próximo passo
      setStep(2)
    } catch (error) {
      console.error('Erro ao salvar doação:', error)
      alert('Erro ao processar doação. Por favor, tente novamente.')
    }
  }

  const copyPixKey = () => {
    navigator.clipboard.writeText(chavePix)
    alert('Chave PIX copiada!')
  }

  const formatarMoeda = (valor: string | number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(valor))
  }

  return (
    <div className="container">
      {/* Cabeçalho */}
      <div className="header">       
        <h1 className="title">Intercâmbio na República Tcheca: Me ajude nessa jornada</h1>
        <div className="id">ID: 5223815</div>
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
            <button className="button" onClick={() => setIsModalOpen(true)}>Quero Ajudar</button>
          </div>
        </div>
      </div>

      {/* Descrição */}
      <div className="description">
        <p>
          Oi gente! Estou fazendo um intercâmbio pelo Rotary na República Tcheca. 
          Tem uma viagem proposta por eles para os intercambistas para fazer um tour histórico pelo continente,
          mas o custo é muito alto para mim. Por isso fiz essa vaquinha e agradeceria muito se vocês pudessem
          colaborar com qualquer valor para me ajudar a ir com o grupo. Desde já, gratidão!
        </p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={() => {
              setIsModalOpen(false)
              setStep(1)
              setValor('')
              setNome('')
            }}>×</button>

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
                <button type="submit" className="button">Continuar</button>
              </form>
            ) : (
              <div className="pix-container">
                <h2>Pagamento via PIX</h2>
                <div className="qr-code">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020126580014BR.GOV.BCB.PIX0136123456789520400005303986540510.005802BR5913Daniela Silva6008Brasilia62070503***6304E2CA" alt="QR Code PIX" />
                </div>
                <div className="pix-key">
                  <p>Chave PIX: {chavePix}</p>
                  <button className="button" onClick={copyPixKey}>Copiar Chave</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
