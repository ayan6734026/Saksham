<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit();
}

// Handle Registration
if ($_POST['action'] === 'register') {
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $password = $_POST['password'];
    
    // Validation
    if (!$email) {
        echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
        exit();
    }
    
    if (strlen($password) < 6) {
        echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters long.']);
        exit();
    }
    
    try {
        $pdo = getConnection();
        
        // Check if email already exists
        $stmt = $pdo->prepare("SELECT id FROM students WHERE email = ?");
        $stmt->execute([$email]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => false, 'message' => 'Email already registered. Please login.']);
            exit();
        }
        
        // Hash password and insert user
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO students (email, password) VALUES (?, ?)");
        $stmt->execute([$email, $hashedPassword]);
        
        echo json_encode(['success' => true, 'message' => 'Registration successful! Please login.']);
        
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Registration failed. Please try again.']);
    }
}

// Handle Login
if ($_POST['action'] === 'login') {
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $password = $_POST['password'];
    
    if (!$email || !$password) {
        echo json_encode(['success' => false, 'message' => 'Please fill all fields correctly.']);
        exit();
    }
    
    try {
        $pdo = getConnection();
        $stmt = $pdo->prepare("SELECT id, password FROM students WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['student_id'] = $user['id'];
            $_SESSION['email'] = $email;
            echo json_encode(['success' => true, 'message' => 'Login successful!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
        }
        
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Login failed. Please try again.']);
    }
}

// Handle Logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    session_destroy();
    header('Location: index.html');
    exit();
}
?>

