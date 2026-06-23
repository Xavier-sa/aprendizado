<?php
require_once('../../config/env.php');
require_once('../componentes/navbar.php');
require_once('../componentes/sidebar.php');
?>

<?php require_once('../componentes/head.php'); ?>
<body>

    
    <main class="content">
        <div class="profile-container">
            <div class="profile-header">
                <h1>Perfil Usuario</h1>
            </div>

            <div class="profile-details">
                <div class="profile-img">

                <img src="<?php echo IMG_PATH; ?>adm.jpg" alt="imagem-usuario">
                  
                </div>
                <div class="sobre">
                <div class="bio">
                    <h2>Sobre Mim</h2>
                    <p>
                        Me chamo Wellingon Xavier, formado gestão pública, desenvolvedor em formação. Comecei minha jornada na área de TI após atuar em funções operacionais e agora estou buscando expandir minhas habilidades em desenvolvimento de sistemas.
                    </p>
                    <p>
                        Tenho experiência  vendas, monitor , orientador, freelances, carga e descarga, motorista(A/D), manutenção de motos, marcenaria e construção básica, etc.. .Atualmente, estou focado em me especializar na área de desenvolvimento de software, buscando oportunidades para ter uma noção de qual direção seguir na area de TI.
                    </p>
                </div>
            </div>
        </div>
        </div>

    </main>

    <?php require_once('../componentes/footer.php'); ?>

</body>
</html>
