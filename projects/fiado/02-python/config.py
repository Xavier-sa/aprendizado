# fiado_manager/config.py

from os import environ

class Config:
    """Configurações de ambiente para o aplicativo."""
    # Configurações do Banco de Dados MySQL (Mantenha o sistema_fiado como no PHP)
    MYSQL_HOST = environ.get('MYSQL_HOST', 'localhost')
    MYSQL_DATABASE = environ.get('MYSQL_DATABASE', 'sistema_fiado')
    MYSQL_USER = environ.get('MYSQL_USER', 'root')
    MYSQL_PASSWORD = environ.get('MYSQL_PASSWORD', '')
    
    # Configurações do Flask
    SECRET_KEY = environ.get('SECRET_KEY', 'uma_chave_secreta_forte_para_sessao')
    DEBUG = True