DTO, ou Data Transfer Object, é um padrão de software que facilita a transferência de dados entre diferentes partes de uma aplicação, como entre o servidor e o cliente, ou entre diferentes camadas de uma aplicação. Essencialmente, é um objeto que armazena dados e não possui comportamento ou lógica de negócio, apenas a função de transportar dados. 
Em resumo:
Função: Transferir dados entre diferentes partes de uma aplicação. 
Características: Sem comportamento ou lógica de negócio, apenas armazenamento e transporte de dados. 
Utilização: Geralmente, usados para encapsular dados que serão enviados ou recebidos em uma API, para comunicação entre camadas de uma aplicação, ou para trabalhar com dados em diferentes formatos. 
Exemplo:
Imagine uma API que recebe dados de um usuário, como nome, email e endereço. Ao invés de passar esses dados diretamente para a camada de negócio, pode-se criar um DTO para encapsular esses dados e transferi-los para a camada de negócio, que pode então usar esses dados para criar ou atualizar um registro de usuário no banco de dados. 
Benefícios:
Separação de preocupações:
A lógica de negócio e a transferência de dados são separadas, o que facilita a manutenção e o desenvolvimento da aplicação.
Redução da complexidade:
O DTO pode simplificar o código, tornando-o mais legível e fácil de entender.
Melhora a comunicação:
A transferência de dados entre diferentes partes da aplicação pode ser feita de forma mais eficiente e padronizada. 