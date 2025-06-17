
import './App.css';

function App() {
  return (
    <div className="app-container">
        <div className="card-form">
            <div className="card-front">
                <div className="card-logo"></div>
                <div className="card-number">#### #### #### ####</div>
                <div className="card-holder-name">NOME DO TITULAR</div>
                <div className="card-expiry">MM/AA</div>
            </div>
            <div className="card-back">
                <div className="card-stripe"></div>
                <div className="card-cvv">CVV</div>
            </div>
    
            <form>
                <div className="form-group">
                    <label htmlFor="cardNumber">Número do Cartão</label>
                    <div className="input-container">
                        <input type="text" id="cardNumber" maxlength="19" placeholder="XXXX XXXX XXXX XXXX" />
                        <div className="validation-icon">
                            <i className="fas fa-check success-icon"></i>
                            <i className="fas fa-times error-icon"></i>
                        </div>
                    </div>
                    <div className="error-message"></div>
                </div>
                
                <div className="form-group">
                    <label htmlFor="cardHolder">Nome do Titular</label>
                    <div className="input-container">
                        <input type="text" id="cardHolder" placeholder="Nome Completo" />
                        <div className="validation-icon">
                            <i className="fas fa-check success-icon"></i>
                            <i className="fas fa-times error-icon"></i>
                        </div>
                    </div>
                    <div className="error-message"></div>
                </div>
                
                <div className="form-group form-row">
                    <div className="form-group-col">
                        <label htmlFor="expiryMonth">Validade</label>
                        <div className="input-container">
                            <input type="text" id="expiryDate" maxlength="5" placeholder="MM/AA" />
                            <div className="validation-icon">
                                <i className="fas fa-check success-icon"></i>
                                <i className="fas fa-times error-icon"></i>
                            </div>
                        </div>
                        <div className="error-message"></div>
                    </div>
                    <div className="form-group-col">
                        <label htmlFor="cvv">CVV</label>
                        <div className="input-container">
                            <input type="text" id="cvv" maxlength="4" placeholder="XXX" />
                            <div className="validation-icon">
                                <i className="fas fa-check success-icon"></i>
                                <i className="fas fa-times error-icon"></i>
                            </div>
                        </div>
                        <div className="error-message"></div>
                    </div>
                </div>
                
                <button type="submit" id="submitBtn" disabled>Cadastrar Cartão</button>
            </form>
        </div>
        <script src="script.js"></script>
    </div>
  );
}

export default App;
