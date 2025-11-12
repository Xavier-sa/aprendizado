# fiado_manager/app.py

from flask import Flask, render_template, request, redirect, url_for, flash
from config import Config
from models.cliente_model import ClienteModel
from models.compra_model import CompraModel
from datetime import date

# Inicialização do App
app = Flask(__name__, template_folder='templates')
app.config.from_object(Config)

# Instâncias dos Models (Injeção de dependência simples)
cliente_model = ClienteModel()
compra_model = CompraModel()

@app.before_request
def setup_data():
    """Busca dados globais e injeta no template antes de cada requisição."""
    if request.method == 'GET' and 'editar' not in request.args:
        # Busca clientes e totais apenas para leitura, otimizando performance
        app.clientes = cliente_model.get_all()
        app.totais_sistema = compra_model.get_system_totals()
    
# Rota Principal - Mapeada para a função index do Controller
@app.route('/', methods=['GET', 'POST'])
def index():
    # --- Controller: Processamento POST (Ações de Escrita) ---
    if request.method == 'POST':
        acao = request.form.get('acao')
        
        if acao == 'add_cliente':
            nome = request.form.get('nome')
            telefone = request.form.get('telefone')
            cliente_model.create(nome, telefone)
            flash(f"Cliente '{nome}' cadastrado com sucesso!", 'success')
            return redirect(url_for('index')) # Redireciona para evitar re-submissão
        
        if acao == 'add_compra':
            cliente_id = int(request.form.get('cliente_id'))
            produto = request.form.get('produto')
            valor = float(request.form.get('valor'))
            data_compra = request.form.get('data_compra')
            pago = 'pago' in request.form
            compra_model.create_purchase(cliente_id, produto, valor, data_compra, pago)
            flash("Compra registrada com sucesso!", 'success')
            return redirect(url_for('index'))

        if acao in ['marcar_pago', 'marcar_pendente']:
            compra_id = int(request.form.get('compra_id'))
            pago = acao == 'marcar_pago'
            compra_model.set_payment_status(compra_id, pago)
            flash("Status atualizado com sucesso!", 'info')
            return redirect(url_for('index', _anchor='compras')) # Mantém na aba Compras

        if acao == 'editar_compra':
            compra_id = int(request.form.get('compra_id'))
            produto = request.form.get('produto')
            valor = float(request.form.get('valor'))
            data_compra = request.form.get('data_compra')
            pago = 'pago' in request.form
            compra_model.update_purchase(compra_id, produto, valor, data_compra, pago)
            flash(f"Compra #{compra_id} editada com sucesso!", 'warning')
            return redirect(url_for('index'))
            
        if acao == 'deletar_compra':
            compra_id = int(request.form.get('compra_id'))
            compra_model.delete_purchase(compra_id)
            flash(f"Compra #{compra_id} excluída!", 'danger')
            return redirect(url_for('index'))


    # --- Controller: Processamento GET (Lógica de Leitura) ---
    
    # 1. Configura filtro de status
    filtro_status = request.args.get('status')
    status_int = None
    if filtro_status in ['0', '1']:
        status_int = int(filtro_status)
    
    # 2. Busca dados para a tabela principal
    clientes_compras = compra_model.get_aggregated_purchases(status_int)

    # 3. Busca dados para edição (se houver o parâmetro GET 'editar')
    compra_editar = None
    editar_id = request.args.get('editar', type=int)
    if editar_id:
        compra_editar = compra_model.get_purchase_for_edit(editar_id)
        if not compra_editar:
             flash("Compra para edição não encontrada.", 'error')
    
    # 4. Renderiza a View
    return render_template(
        'index.html',
        clientes=app.clientes,
        clientes_compras=clientes_compras,
        totais_sistema=app.totais_sistema,
        filtro_status=filtro_status,
        compra_editar=compra_editar,
        today=date.today().isoformat()
    )

if __name__ == '__main__':
    # Necessário para usar o flash messages
    app.run(debug=Config.DEBUG)