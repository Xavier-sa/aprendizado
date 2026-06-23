<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';

function generatePatientCode(): string
{
    do {
        $code = strtoupper(substr(bin2hex(random_bytes(4)), 0, 8));
        $stmt = getPDO()->prepare('SELECT COUNT(*) FROM patients WHERE patient_code = :code');
        $stmt->execute([':code' => $code]);
        $count = $stmt->fetchColumn();
    } while ($count > 0);
    return $code;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit;
}

$task = $_GET['task'] ?? '';

if ($task === 'register') {
    $name = trim($_POST['name'] ?? '');
    $birthdate = trim($_POST['birthdate'] ?? '');
    $contact = trim($_POST['contact'] ?? '');
    $consent = isset($_POST['consent']) ? 1 : 0;

    if ($name === '' || $birthdate === '' || $contact === '' || !$consent) {
        header('Location: register.php?success=0');
        exit;
    }

    $patientCode = generatePatientCode();
    $stmt = getPDO()->prepare('INSERT INTO patients (name, birthdate, contact, consent, patient_code) VALUES (:name, :birthdate, :contact, :consent, :patient_code)');
    $stmt->execute([
        ':name' => $name,
        ':birthdate' => $birthdate,
        ':contact' => $contact,
        ':consent' => $consent,
        ':patient_code' => $patientCode,
    ]);

    header('Location: register.php?success=1&code=' . urlencode($patientCode));
    exit;
}

if ($task === 'book') {
    $patient = currentPatient();
    if (!$patient) {
        header('Location: index.php?patient_error=1');
        exit;
    }

    $date = trim($_POST['date'] ?? '');
    $time = trim($_POST['time'] ?? '');
    $repeat = isset($_POST['repeat']) ? 1 : 0;

    if ($date === '' || $time === '') {
        header('Location: patient-portal.php?error=1');
        exit;
    }

    if (!isSlotAvailable($date, $time)) {
        header('Location: patient-portal.php?error=2');
        exit;
    }

    $stmt = getPDO()->prepare('INSERT INTO appointments (patient_id, date, start_time, repeat_weekly) VALUES (:patient_id, :date, :start_time, :repeat_weekly)');
    $stmt->execute([
        ':patient_id' => $patient['id'],
        ':date' => normalizeDate($date),
        ':start_time' => $time,
        ':repeat_weekly' => $repeat,
    ]);

    if ($repeat && availableDaysForRepeat($date)) {
        $scheduled = true;
        $extraDates = [];
        $base = new DateTime($date);
        for ($i = 1; $i <= 3; $i++) {
            $candidate = clone $base;
            $candidate->modify("+{$i} week");
            $candidateDate = $candidate->format('Y-m-d');
            if (!isSlotAvailable($candidateDate, $time)) {
                $scheduled = false;
                break;
            }
            $extraDates[] = $candidateDate;
        }
        if ($scheduled) {
            $stmt = getPDO()->prepare('INSERT INTO appointments (patient_id, date, start_time, repeat_weekly) VALUES (:patient_id, :date, :start_time, :repeat_weekly)');
            foreach ($extraDates as $extraDate) {
                $stmt->execute([
                    ':patient_id' => $patient['id'],
                    ':date' => $extraDate,
                    ':start_time' => $time,
                    ':repeat_weekly' => 1,
                ]);
            }
        }
    }

    header('Location: patient-portal.php?success=1');
    exit;
}

if ($task === 'save_description') {
    if (!isAdmin()) {
        header('Location: index.php?error=forbidden');
        exit;
    }
    $content = trim($_POST['description'] ?? '');
    setMetaText('aba_description', $content);
    header('Location: admin.php?success=description');
    exit;
}

if ($task === 'add_finance') {
    if (!isAdmin()) {
        header('Location: index.php?error=forbidden');
        exit;
    }
    $type = $_POST['type'] ?? 'expense';
    $category = trim($_POST['category'] ?? '');
    $amount = floatval($_POST['amount'] ?? 0);
    $note = trim($_POST['note'] ?? '');

    if (!in_array($type, ['income', 'expense'], true) || $category === '' || $amount <= 0) {
        header('Location: admin.php?error=finance');
        exit;
    }

    $stmt = getPDO()->prepare('INSERT INTO finance_items (type, category, amount, note) VALUES (:type, :category, :amount, :note)');
    $stmt->execute([
        ':type' => $type,
        ':category' => $category,
        ':amount' => $amount,
        ':note' => $note,
    ]);

    header('Location: admin.php?success=finance');
    exit;
}

header('Location: index.php');
