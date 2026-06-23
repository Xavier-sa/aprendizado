import smtplib
from email.mime.text import MIMEText

def enviar_email(remetente, senha, destinatario, assunto, mensagem):
    # Criação do objeto MIME
    msg = MIMEText(mensagem)
    msg['Subject'] = assunto
    msg['From'] = remetente
    msg['To'] = destinatario

    # Configuração do servidor SMTP
    with smtplib.SMTP('smtp.gmail.com', 587) as servidor:
        servidor.starttls()  # Segurança
        servidor.login(remetente, senha)  # Login
        servidor.sendmail(remetente, destinatario, msg.as_string())  # Envio

# Usando a função
enviar_email('seu_email@gmail.com', 'sua_senha', 'destinatario@gmail.com', 'Assunto', 'Mensagem de teste!')
