<?php
require_once 'config.php';
requireLogin();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $studentId = $_SESSION['student_id'];
    $moduleNumber = (int)$_POST['module'];
    $totalQuestions = (int)$_POST['total_questions'];
    $correctAnswers = (int)$_POST['correct_answers'];
    $answeredQuestions = (int)$_POST['answered_questions'];
    
    // Calculate unanswered questions and percentage
    $unansweredQuestions = $totalQuestions - $answeredQuestions;
    $percentage = ($totalQuestions > 0) ? round(($correctAnswers / $totalQuestions) * 100, 2) : 0;
    $certificationEligible = ($percentage >= 40) ? 1 : 0;
    
    try {
        $pdo = getConnection();
        
        // Check if student already took this module test
        $stmt = $pdo->prepare("SELECT id FROM test_results WHERE student_id = ? AND module_number = ?");
        $stmt->execute([$studentId, $moduleNumber]);
        
        if ($stmt->rowCount() > 0) {
            // Update existing record
            $stmt = $pdo->prepare("
                UPDATE test_results 
                SET total_questions = ?, answered_questions = ?, unanswered_questions = ?, 
                    test_score = ?, percentage = ?, certification_eligible = ?, test_taken_at = CURRENT_TIMESTAMP
                WHERE student_id = ? AND module_number = ?
            ");
            $stmt->execute([
                $totalQuestions, $answeredQuestions, $unansweredQuestions, 
                $correctAnswers, $percentage, $certificationEligible, 
                $studentId, $moduleNumber
            ]);
        } else {
            // Insert new record
            $stmt = $pdo->prepare("
                INSERT INTO test_results 
                (student_id, module_number, total_questions, answered_questions, unanswered_questions, test_score, percentage, certification_eligible) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $studentId, $moduleNumber, $totalQuestions, $answeredQuestions, 
                $unansweredQuestions, $correctAnswers, $percentage, $certificationEligible
            ]);
        }
        
        // Get overall progress
        $stmt = $pdo->prepare("
            SELECT 
                COUNT(*) as modules_taken,
                AVG(percentage) as average_percentage,
                SUM(CASE WHEN certification_eligible = 1 THEN 1 ELSE 0 END) as eligible_modules
            FROM test_results WHERE student_id = ?
        ");
        $stmt->execute([$studentId]);
        $progress = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $overallEligible = ($progress['average_percentage'] >= 40 && $progress['modules_taken'] >= 8);
        
        echo json_encode([
            'success' => true,
            'score' => $correctAnswers,
            'total' => $totalQuestions,
            'percentage' => $percentage,
            'certification_eligible' => $certificationEligible,
            'overall_eligible' => $overallEligible,
            'modules_taken' => $progress['modules_taken'],
            'average_percentage' => round($progress['average_percentage'], 2)
        ]);
        
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Failed to save quiz results.']);
    }
}
?>