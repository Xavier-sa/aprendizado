<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $mode = $_POST['mode'] ?? '';

    if ($mode === 'admin') {
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';
        $user = getUserByEmail($email);

        if ($user && password_verify($password, $user['password']) && $user['role'] === 'admin') {
            $_SESSION['user_id'] = $user['id'];
            unset($_SESSION['patient_id']);
            header('Location: admin.php');
            exit;
        }
        header('Location: index.php?error=1');
        exit;
    }

    if ($mode === 'patient') {
        $code = trim($_POST['patient_code'] ?? '');
        $patient = getPatientByCode($code);

        if ($patient) {
            $_SESSION['patient_id'] = $patient['id'];
            unset($_SESSION['user_id']);
            header('Location: patient-portal.php');
            exit;
        }
        header('Location: index.php?patient_error=1');
        exit;
    }
}

if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    session_destroy();
    header('Location: index.php');
    exit;
}

header('Location: index.php');
