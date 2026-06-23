<?php
session_start();
require_once __DIR__ . '/storage.php';

define('USERS_FILE', __DIR__ . '/../data/users.json');

function register($name, $email, $password)
{
    $users = readJson(USERS_FILE);

    foreach ($users as $user) {
        if ($user['email'] === $email) {
            return false;
        }
    }

    $users[] = [
        'id' => generateId($users),
        'name' => $name,
        'email' => $email,
        'password' => password_hash($password, PASSWORD_DEFAULT)
    ];

    writeJson(USERS_FILE, $users);
    return true;
}

function loginUser($email, $password)
{
    $users = readJson(USERS_FILE);

    foreach ($users as $user) {
        if ($user['email'] === $email && password_verify($password, $user['password'])) {
            session_regenerate_id(true);
            $_SESSION['user'] = $user;
            return true;
        }
    }
    return false;
}

function requireAuth()
{
    if (!isset($_SESSION['user'])) {
        header("Location: login.php");
        exit;
    }
}
