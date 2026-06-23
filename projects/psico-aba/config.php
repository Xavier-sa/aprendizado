<?php
// config.php
$envPath = __DIR__ . '/.env';
if (file_exists($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        [$key, $value] = array_map('trim', explode('=', $line, 2) + [1 => '']);
        if ($key !== '') {
            $_ENV[$key] = $value;
        }
    }
}

function env(string $key, $default = null)
{
    if (isset($_ENV[$key])) {
        return $_ENV[$key];
    }
    $value = getenv($key);
    return $value !== false ? $value : $default;
}

define('DB_PATH', __DIR__ . '/' . env('DB_PATH', 'data/database.sqlite'));
define('ADMIN_EMAIL', env('ADMIN_EMAIL', 'admin@psicoaba.com'));
define('ADMIN_PASS', env('ADMIN_PASS', 'senha123'));
define('CLINIC_NAME', env('CLINIC_NAME', 'PsicoABA'));
define('SESSION_LIFE', (int) env('SESSION_LIFE', 3600));

session_start();

if (!is_dir(dirname(DB_PATH))) {
    mkdir(dirname(DB_PATH), 0755, true);
}

$pdo = new PDO('sqlite:' . DB_PATH);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$pdo->exec('CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT,
    name TEXT
)');

$pdo->exec('CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    birthdate TEXT NOT NULL,
    contact TEXT NOT NULL,
    consent INTEGER NOT NULL DEFAULT 0,
    patient_code TEXT UNIQUE NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)');

$pdo->exec('CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY,
    patient_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    start_time TEXT NOT NULL,
    duration INTEGER NOT NULL DEFAULT 50,
    repeat_weekly INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(patient_id) REFERENCES patients(id)
)');

$pdo->exec('CREATE TABLE IF NOT EXISTS finance_items (
    id INTEGER PRIMARY KEY,
    type TEXT NOT NULL,
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    note TEXT,
    date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)');

$pdo->exec('CREATE TABLE IF NOT EXISTS meta_texts (
    key_name TEXT PRIMARY KEY,
    content TEXT NOT NULL
)');

$pdo->exec('CREATE TABLE IF NOT EXISTS patient_notes (
    id INTEGER PRIMARY KEY,
    patient_id INTEGER NOT NULL,
    note TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(patient_id) REFERENCES patients(id)
)');

function getPDO(): PDO
{
    global $pdo;
    return $pdo;
}

function getUserByEmail(string $email)
{
    $stmt = getPDO()->prepare('SELECT * FROM users WHERE email = :email');
    $stmt->execute([':email' => $email]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function getUserById(int $id)
{
    $stmt = getPDO()->prepare('SELECT * FROM users WHERE id = :id');
    $stmt->execute([':id' => $id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function getPatientByCode(string $code)
{
    $stmt = getPDO()->prepare('SELECT * FROM patients WHERE patient_code = :code');
    $stmt->execute([':code' => $code]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function currentUser()
{
    if (isset($_SESSION['user_id'])) {
        return getUserById((int) $_SESSION['user_id']);
    }
    return null;
}

function currentPatient()
{
    if (isset($_SESSION['patient_id'])) {
        $stmt = getPDO()->prepare('SELECT * FROM patients WHERE id = :id');
        $stmt->execute([':id' => (int) $_SESSION['patient_id']]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    return null;
}

function isAdmin()
{
    $user = currentUser();
    return $user && $user['role'] === 'admin';
}

function withLogin(string $role = null)
{
    if (!currentUser()) {
        header('Location: index.php?error=login');
        exit;
    }
    if ($role && currentUser()['role'] !== $role) {
        header('Location: index.php?error=forbidden');
        exit;
    }
}

function withPatientLogin()
{
    if (!currentPatient()) {
        header('Location: index.php?error=patient-login');
        exit;
    }
}

function runOnceAdmin()
{
    if (!getUserByEmail(ADMIN_EMAIL)) {
        $stmt = getPDO()->prepare('INSERT INTO users (email, password, role, name) VALUES (:email, :password, :role, :name)');
        $stmt->execute([
            ':email' => ADMIN_EMAIL,
            ':password' => password_hash(ADMIN_PASS, PASSWORD_DEFAULT),
            ':role' => 'admin',
            ':name' => 'Psicóloga ABA'
        ]);
    }
}

runOnceAdmin();

function getMetaText(string $key, string $default = ''): string
{
    $stmt = getPDO()->prepare('SELECT content FROM meta_texts WHERE key_name = :key');
    $stmt->execute([':key' => $key]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return $row ? $row['content'] : $default;
}

function setMetaText(string $key, string $content)
{
    $stmt = getPDO()->prepare('REPLACE INTO meta_texts (key_name, content) VALUES (:key, :content)');
    $stmt->execute([':key' => $key, ':content' => $content]);
}
