<?php
require_once __DIR__ . '/config.php';

function parseSlots(string $start = '08:00', string $end = '20:00', int $interval = 50): array
{
    $slots = [];
    $current = DateTime::createFromFormat('H:i', $start);
    $last = DateTime::createFromFormat('H:i', $end);

    while ($current <= $last) {
        $slots[] = $current->format('H:i');
        $current->modify("+{$interval} minutes");
    }

    return $slots;
}

function normalizeDate(string $date): string
{
    return (new DateTime($date))->format('Y-m-d');
}

function getAppointmentsByDate(string $date): array
{
    $stmt = getPDO()->prepare('SELECT a.*, p.name AS patient_name FROM appointments a JOIN patients p ON p.id = a.patient_id WHERE date = :date ORDER BY start_time');
    $stmt->execute([':date' => normalizeDate($date)]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function isSlotAvailable(string $date, string $startTime, ?int $excludeAppointmentId = null): bool
{
    $sql = 'SELECT COUNT(*) FROM appointments WHERE date = :date AND start_time = :start_time';
    if ($excludeAppointmentId) {
        $sql .= ' AND id != :id';
    }
    $stmt = getPDO()->prepare($sql);
    $params = [':date' => normalizeDate($date), ':start_time' => $startTime];
    if ($excludeAppointmentId) {
        $params[':id'] = $excludeAppointmentId;
    }
    $stmt->execute($params);
    return $stmt->fetchColumn() === '0';
}

function getAppointmentBoard(string $date): array
{
    $week = [];
    $start = new DateTime($date);
    $start->modify('monday this week');
    for ($i = 0; $i < 7; $i++) {
        $day = clone $start;
        $day->modify("+{$i} days");
        $week[] = [
            'label' => $day->format('D d/m'),
            'date' => $day->format('Y-m-d'),
            'slots' => getAppointmentsByDate($day->format('Y-m-d'))
        ];
    }
    return $week;
}

function getPatientAge(string $birthdate): int
{
    $birth = new DateTime($birthdate);
    $today = new DateTime();
    return $today->diff($birth)->y;
}

function getFinanceTotals(): array
{
    $income = getPDO()->query("SELECT IFNULL(SUM(amount),0) FROM finance_items WHERE type = 'income'")->fetchColumn();
    $expense = getPDO()->query("SELECT IFNULL(SUM(amount),0) FROM finance_items WHERE type = 'expense'")->fetchColumn();
    return [
        'income' => (float) $income,
        'expense' => (float) $expense,
        'balance' => (float) $income - (float) $expense,
    ];
}

function getLastAppointments(int $limit = 30): array
{
    $stmt = getPDO()->prepare('SELECT a.*, p.name AS patient_name FROM appointments a JOIN patients p ON p.id = a.patient_id ORDER BY date DESC, start_time DESC LIMIT :limit');
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getPatients(): array
{
    $stmt = getPDO()->prepare('SELECT * FROM patients ORDER BY created_at DESC');
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getAgeDistribution(): array
{
    $rows = getPDO()->query('SELECT birthdate FROM patients')->fetchAll(PDO::FETCH_COLUMN);
    $groups = ['0-5' => 0, '6-10' => 0, '11-15' => 0, '16-25' => 0, '26+' => 0];
    foreach ($rows as $birthdate) {
        $age = getPatientAge($birthdate);
        if ($age <= 5) {
            $groups['0-5']++;
        } elseif ($age <= 10) {
            $groups['6-10']++;
        } elseif ($age <= 15) {
            $groups['11-15']++;
        } elseif ($age <= 25) {
            $groups['16-25']++;
        } else {
            $groups['26+']++;
        }
    }
    return $groups;
}

function getConsultationCounts(): array
{
    $stmt = getPDO()->query('SELECT p.name, COUNT(a.id) AS count FROM appointments a JOIN patients p ON p.id = a.patient_id GROUP BY p.id ORDER BY count DESC');
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getFinanceItems(): array
{
    $stmt = getPDO()->prepare('SELECT * FROM finance_items ORDER BY date DESC LIMIT 50');
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function availableDaysForRepeat(string $date): bool
{
    return (new DateTime($date))->format('l') === 'Tuesday';
}

function formatCurrency($value): string
{
    return 'R$ ' . number_format((float) $value, 2, ',', '.');
}
