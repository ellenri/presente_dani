import './styles.css'

function App() {
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
            <div className="amount">R$ 6.370,99</div>
            <div className="goal">Meta: R$ 11.500,00</div>
          </div>

          <div className="progress-bar">
            <div className="progress-value"></div>
          </div>

          <div className="footer">
            <div className="supporters">Apoiadores: 35</div>
            <button className="button">Quero Ajudar</button>
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
    </div>
  )
}

export default App
