<?php

function e($value)
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function redirect($path)
{
    header("Location: $path");
    exit;
}
