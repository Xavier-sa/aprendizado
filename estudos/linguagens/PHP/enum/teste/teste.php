<?php
// Define o enum Suit
enum Suit
{
    case Hearts;
    case Diamonds;
    case Clubs;
    case Spades;
}

// Função que recebe um valor do tipo Suit
function do_stuff(Suit $s)
{
    // Imprime o nome do valor recebido
    echo "Você escolheu o naipe: " . $s->name . PHP_EOL;
}

// Teste com cada naipe
do_stuff(Suit::Hearts);
do_stuff(Suit::Diamonds);
do_stuff(Suit::Clubs);
do_stuff(Suit::Spades);

var_dump( Suit::Diamonds->value);
?>


