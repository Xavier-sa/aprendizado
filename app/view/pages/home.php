<?php
require_once('../../config/env.php');
require_once('../componentes/navbar.php');
require_once('../componentes/sidebar.php');
?>

<?php require_once('../componentes/head.php'); ?>
<body>
    <!-- arquivo responsável pela tela Home -->
    <main class="content">
        <div class="login">
            <div>
            <h1>Xavier Solutions</h1>
            <span style="font-size: 100px; display: block; text-align: center; padding: 20px;">&#128187;</span>
            <h1>Seja Bem-vindo!</h1>
            <p>Transformamos suas ideias em soluções digitais inovadoras. Explore nossos serviços e entre em contato para saber mais.</p>
            <!-- Centralizar ícone 'expand_circle_down' -->
            <a href="<?php echo PG_PATH; ?>sobre.php" style="display: block; text-align: center;">
                <span class="material-symbols-outlined" style="font-size: 48px;">expand_circle_down</span>Saiba mais
            </a>      
            <p>Para acessar o sistema, você precisa fazer login. Caso não tenha um usuário, entre em contato com o administrador.</p>
            <!-- Centralizar ícone 'home_pin' -->
            <p><a href="<?php echo PG_PATH; ?>login.php" target='_blank' style="display: block; text-align: center;">
                <span class="material-symbols-outlined" style="font-size: 48px;">home_pin</span>Login</a>
            </p>
        </div> 
    </div>
    </main>
    <?php require_once('../componentes/footer.php'); ?>
</body>
</html>
