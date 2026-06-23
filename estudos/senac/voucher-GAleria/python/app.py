from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
app.secret_key = 'senac@hubacademy2024'

# Configuração do banco de dados
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'galeria_voucher.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Modelos (Baseados no DER)
class Unidade(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    cidade = db.Column(db.String(50), nullable=False)
    turmas = db.relationship('Turma', backref='unidade', lazy=True)

class Administrador(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    senha = db.Column(db.String(255), nullable=False)
    data_cadastro = db.Column(db.DateTime, server_default=db.func.now())
    docentes = db.relationship('Docente', backref='administrador', lazy=True)

class Docente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    senha = db.Column(db.String(255), nullable=False)
    linkedin = db.Column(db.String(255))
    github = db.Column(db.String(255))
    data_cadastro = db.Column(db.DateTime, server_default=db.func.now())
    administrador_id = db.Column(db.Integer, db.ForeignKey('administrador.id'))
    turmas = db.relationship('Turma', secondary='docente_turma', backref=db.backref('docentes', lazy=True))

docente_turma = db.Table('docente_turma',
    db.Column('docente_id', db.Integer, db.ForeignKey('docente.id'), primary_key=True),
    db.Column('turma_id', db.Integer, db.ForeignKey('turma.id'), primary_key=True)
)

class Turma(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50), nullable=False)
    ano = db.Column(db.String(10), nullable=False)
    descricao = db.Column(db.Text)
    unidade_id = db.Column(db.Integer, db.ForeignKey('unidade.id'), nullable=False)
    alunos = db.relationship('Aluno', backref='turma', lazy=True)
    projetos = db.relationship('Projeto', backref='turma', lazy=True)

class Aluno(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100))
    linkedin = db.Column(db.String(255))
    github = db.Column(db.String(255))
    foto = db.Column(db.String(255))
    turma_id = db.Column(db.Integer, db.ForeignKey('turma.id'), nullable=False)

class Projeto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text)
    link = db.Column(db.String(255))
    turma_id = db.Column(db.Integer, db.ForeignKey('turma.id'), nullable=False)

class Estatistica(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    total_alunos = db.Column(db.Integer, default=0)
    total_projetos = db.Column(db.Integer, default=0)
    total_turmas = db.Column(db.Integer, default=0)
    total_horas_curso = db.Column(db.Integer, default=200)
    data_atualizacao = db.Column(db.DateTime, server_default=db.func.now())
    administrador_id = db.Column(db.Integer, db.ForeignKey('administrador.id'))

# Rotas da aplicação
@app.route('/')
def index():
    estatisticas = Estatistica.query.first()
    turmas = Turma.query.limit(3).all()
    return render_template('index.html', estatisticas=estatisticas, turmas=turmas)

@app.route('/turmas')
def listar_turmas():
    turmas = Turma.query.all()
    return render_template('turmas.html', turmas=turmas)

@app.route('/turma/<int:id>')
def detalhes_turma(id):
    turma = Turma.query.get_or_404(id)
    return render_template('detalhes_turma.html', turma=turma)

@app.route('/projetos')
def listar_projetos():
    projetos = Projeto.query.all()
    return render_template('projetos.html', projetos=projetos)

@app.route('/alunos')
def listar_alunos():
    alunos = Aluno.query.all()
    return render_template('alunos.html', alunos=alunos)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        senha = request.form['senha']
        
        # Verifica se é administrador
        admin = Administrador.query.filter_by(email=email).first()
        if admin and check_password_hash(admin.senha, senha):
            session['user_id'] = admin.id
            session['user_type'] = 'admin'
            flash('Login como administrador realizado com sucesso!', 'success')
            return redirect(url_for('admin_dashboard'))
        
        # Verifica se é docente
        docente = Docente.query.filter_by(email=email).first()
        if docente and check_password_hash(docente.senha, senha):
            session['user_id'] = docente.id
            session['user_type'] = 'docente'
            flash('Login como docente realizado com sucesso!', 'success')
            return redirect(url_for('docente_dashboard'))
        
        flash('Email ou senha incorretos!', 'danger')
    
    return render_template('login.html')

@app.route('/admin/dashboard')
def admin_dashboard():
    if 'user_type' not in session or session['user_type'] != 'admin':
        flash('Acesso não autorizado!', 'danger')
        return redirect(url_for('login'))
    
    estatisticas = Estatistica.query.first()
    turmas = Turma.query.count()
    alunos = Aluno.query.count()
    docentes = Docente.query.count()
    projetos = Projeto.query.count()
    
    return render_template('admin/dashboard.html', 
                         estatisticas=estatisticas,
                         turmas=turmas,
                         alunos=alunos,
                         docentes=docentes,
                         projetos=projetos)

@app.route('/docente/dashboard')
def docente_dashboard():
    if 'user_type' not in session or session['user_type'] != 'docente':
        flash('Acesso não autorizado!', 'danger')
        return redirect(url_for('login'))
    
    docente = Docente.query.get(session['user_id'])
    turmas = docente.turmas
    alunos = Aluno.query.filter(Aluno.turma_id.in_([t.id for t in turmas])).count()
    projetos = Projeto.query.filter(Projeto.turma_id.in_([t.id for t in turmas])).count()
    
    return render_template('docente/dashboard.html', 
                         docente=docente,
                         turmas=turmas,
                         alunos=alunos,
                         projetos=projetos)

@app.route('/logout')
def logout():
    session.clear()
    flash('Você foi deslogado com sucesso!', 'info')
    return redirect(url_for('index'))

# Funções auxiliares
def atualizar_estatisticas():
    estatisticas = Estatistica.query.first()
    if estatisticas:
        estatisticas.total_alunos = Aluno.query.count()
        estatisticas.total_projetos = Projeto.query.count()
        estatisticas.total_turmas = Turma.query.count()
        estatisticas.data_atualizacao = db.func.now()
        db.session.commit()

# Comandos para inicialização
@app.cli.command('initdb')
def initdb_command():
    """Inicializa o banco de dados com dados de exemplo"""
    db.create_all()
    
    # Criar unidades
    unidades = [
        Unidade(nome='Senac Campo Grande', cidade='Campo Grande'),
        Unidade(nome='Senac Corumbá', cidade='Corumbá'),
        Unidade(nome='Senac Dourados', cidade='Dourados'),
        Unidade(nome='Senac Ponta Porã', cidade='Ponta Porã'),
        Unidade(nome='Senac Três Lagoas', cidade='Três Lagoas')
    ]
    db.session.bulk_save_objects(unidades)
    db.session.commit()
    
    # Criar admin padrão
    admin = Administrador(
        nome='Admin Master',
        email='admin@senac.com',
        senha=generate_password_hash('senac123')
    )
    db.session.add(admin)
    db.session.commit()
    
    # Criar estatísticas iniciais
    estatisticas = Estatistica(
        total_alunos=0,
        total_projetos=0,
        total_turmas=0,
        total_horas_curso=200,
        administrador_id=admin.id
    )
    db.session.add(estatisticas)
    db.session.commit()
    
    print('Banco de dados inicializado com sucesso!')

if __name__ == '__main__':
    app.run(debug=True)