<?php
require_once 'config.php';
requireLogin();

// Get student progress
$pdo = getConnection();
$stmt = $pdo->prepare("
    SELECT 
        module_number,
        total_questions,
        answered_questions,
        unanswered_questions,
        test_score,
        percentage,
        certification_eligible,
        test_taken_at
    FROM test_results 
    WHERE student_id = ? 
    ORDER BY module_number
");
$stmt->execute([$_SESSION['student_id']]);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Calculate overall stats
$totalModules = count($results);
$averagePercentage = $totalModules > 0 ? array_sum(array_column($results, 'percentage')) / $totalModules : 0;
$eligibleForCertification = $averagePercentage >= 40 && $totalModules >= 8;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SAKSHAM - Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            line-height: 1.6;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .header-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
        }

        .logo {
            font-size: 1.8em;
            font-weight: bold;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .logout-btn {
            background: rgba(255,255,255,0.2);
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
        }

        .container {
            max-width: 1200px;
            margin: 20px auto;
            padding: 0 20px;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            text-align: center;
        }

        .stat-number {
            font-size: 2.5em;
            font-weight: bold;
            color: #667eea;
        }

        .stat-label {
            color: #666;
            margin-top: 10px;
        }

        .certification-status {
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
            text-align: center;
            font-weight: bold;
        }

        .eligible {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .not-eligible {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        .quiz-section {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }

        .quiz-header {
            margin-bottom: 25px;
        }

        .quiz-controls {
            display: flex;
            gap: 15px;
            align-items: center;
            margin-bottom: 30px;
        }

        select, button {
            padding: 12px 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }

        .start-quiz-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            cursor: pointer;
            transition: transform 0.2s ease;
        }

        .start-quiz-btn:hover {
            transform: translateY(-2px);
        }

        .quiz-area {
            display: none;
            border-top: 2px solid #eee;
            padding-top: 30px;
        }

        .question {
            font-size: 18px;
            margin-bottom: 20px;
            font-weight: 500;
        }

        .options {
            display: grid;
            gap: 10px;
            margin-bottom: 25px;
        }

        .option-btn {
            padding: 15px;
            background: #f8f9fa;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            text-align: left;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .option-btn:hover {
            background: #e9ecef;
        }

        .option-btn.selected {
            background: #cce5ff;
            border-color: #667eea;
        }

        .option-btn.correct {
            background: #d4edda;
            border-color: #28a745;
        }

        .option-btn.incorrect {
            background: #f8d7da;
            border-color: #dc3545;
        }

        .quiz-navigation {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .next-btn {
            background: #28a745;
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 5px;
            cursor: pointer;
        }

        .progress-table {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid #eee;
        }

        th {
            background: #f8f9fa;
            font-weight: 600;
        }

        .status-badge {
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
        }

        .eligible-badge {
            background: #d4edda;
            color: #155724;
        }

        .not-eligible-badge {
            background: #f8d7da;
            color: #721c24;
        }

        .not-taken {
            color: #6c757d;
            font-style: italic;
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="header-content">
            <div class="logo">SAKSHAM Dashboard</div>
            <div class="user-info">
                <span>Welcome, <?php echo htmlspecialchars($_SESSION['email']); ?></span>
                <a href="auth.php?action=logout" class="logout-btn">Logout</a>
            </div>
        </div>
    </header>

    <div class="container">
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number"><?php echo $totalModules; ?></div>
                <div class="stat-label">Modules Completed</div>
            </div>
            <div class="stat-card">
                <div class="stat-number"><?php echo round($averagePercentage, 1); ?>%</div>
                <div class="stat-label">Average Score</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">11</div>
                <div class="stat-label">Total Modules</div>
            </div>
        </div>

        <div class="certification-status <?php echo $eligibleForCertification ? 'eligible' : 'not-eligible'; ?>">
            <?php if ($eligibleForCertification): ?>
                🎉 Congratulations! You are eligible for certification exam.
            <?php else: ?>
                📚 Complete at least 8 modules with 40%+ average score to be eligible for certification.
            <?php endif; ?>
        </div>

        <div class="quiz-section">
            <div class="quiz-header">
                <h2>Take Quiz</h2>
                <p>Select a module to start or retake the quiz</p>
            </div>

            <div class="quiz-controls">
                <select id="module-select">
                    <option value="">Select Module</option>
                    <?php for($i = 1; $i <= 11; $i++): ?>
                        <option value="<?php echo $i; ?>">Module <?php echo $i; ?></option>
                    <?php endfor; ?>
                </select>
                <button class="start-quiz-btn" onclick="startQuiz()">Start Quiz</button>
            </div>

            <div id="quiz-area" class="quiz-area">
                <div class="quiz-progress">
                    <span id="question-counter">Question 1 of 10</span>
                </div>
                <div id="quiz-question" class="question"></div>
                <div id="quiz-options" class="options"></div>
                <div class="quiz-navigation">
                    <div id="quiz-info"></div>
                    <button id="next-btn" class="next-btn" onclick="nextQuestion()" style="display:none;">Next Question</button>
                    <button id="finish-btn" class="next-btn" onclick="finishQuiz()" style="display:none;">Finish Quiz</button>
                </div>
            </div>
        </div>

        <div class="progress-table">
            <h3 style="padding: 20px; margin: 0; background: #f8f9fa; border-bottom: 1px solid #eee;">Your Progress</h3>
            <table>
                <thead>
                    <tr>
                        <th>Module</th>
                        <th>Questions</th>
                        <th>Answered</th>
                        <th>Score</th>
                        <th>Percentage</th>
                        <th>Status</th>
                        <th>Date Taken</th>
                    </tr>
                </thead>
                <tbody>
                    <?php for($i = 1; $i <= 11; $i++): ?>
                        <?php 
                        $moduleResult = null;
                        foreach($results as $result) {
                            if($result['module_number'] == $i) {
                                $moduleResult = $result;
                                break;
                            }
                        }
                        ?>
                        <tr>
                            <td>Module <?php echo $i; ?></td>
                            <?php if($moduleResult): ?>
                                <td><?php echo $moduleResult['total_questions']; ?></td>
                                <td><?php echo $moduleResult['answered_questions']; ?></td>
                                <td><?php echo $moduleResult['test_score']; ?></td>
                                <td><?php echo $moduleResult['percentage']; ?>%</td>
                                <td>
                                    <span class="status-badge <?php echo $moduleResult['certification_eligible'] ? 'eligible-badge' : 'not-eligible-badge'; ?>">
                                        <?php echo $moduleResult['certification_eligible'] ? 'Eligible' : 'Not Eligible'; ?>
                                    </span>
                                </td>
                                <td><?php echo date('M j, Y', strtotime($moduleResult['test_taken_at'])); ?></td>
                            <?php else: ?>
                                <td class="not-taken">-</td>
                                <td class="not-taken">-</td>
                                <td class="not-taken">-</td>
                                <td class="not-taken">-</td>
                                <td class="not-taken">Not Taken</td>
                                <td class="not-taken">-</td>
                            <?php endif; ?>
                        </tr>
                    <?php endfor; ?>
                </tbody>
            </table>
        </div>
    </div>

    <script>
        // Quiz Data (same as your original)
        const quizData = {
            1: [
                {
                    question: "A 'hazard' is best defined as:",
                    options: ["The complete breakdown of a community's social functions.", "The probability that a damaging event will occur.", "A potentially damaging physical event, phenomenon, or human activity.", "The susceptibility of a community to damaging forces."],
                    answer: "A potentially damaging physical event, phenomenon, or human activity."
                },
                {
                    question: "In disaster management terminology, 'vulnerability' refers to:",
                    options: ["The intensity of a natural phenomenon like an earthquake or cyclone.", "The characteristics of a community that make it susceptible to the damaging effects of a hazard.", "The process of responding to an emergency event.", "The physical infrastructure of a region."],
                    answer: "The characteristics of a community that make it susceptible to the damaging effects of a hazard."
                },
                {
                    question: "The Bhopal Gas Tragedy of 1984 is a globally cited example of which type of hazard?",
                    options: ["Geophysical", "Meteorological", "Technological (Man-made)", "Hydrological"],
                    answer: "Technological (Man-made)"
                },
                {
                    question: "The capacity of a system or community to resist, absorb, and recover from the effects of a hazard in a timely manner is known as:",
                    options: ["Mitigation", "Preparedness", "Resilience", "Response"],
                    answer: "Resilience"
                },
                {
                    question: "The equation Risk=Hazard×Vulnerability implies that:",
                    options: ["Risk can exist even if there is no vulnerable population.", "A high-intensity hazard in a community with very low vulnerability may result in a low-risk situation.", "Risk is solely determined by the type of hazard.", "Vulnerability is a constant that cannot be reduced."],
                    answer: "A high-intensity hazard in a community with very low vulnerability may result in a low-risk situation."
                },
                {
                    question: "The frequent seismic activity in the Himalayan region, making it prone to earthquakes, is primarily due to:",
                    options: ["Volcanic activity in the region.", "The collision of the Indian Plate with the Eurasian Plate.", "Excessive dam construction.", "Deforestation in the Himalayan foothills."],
                    answer: "The collision of the Indian Plate with the Eurasian Plate."
                },
                {
                    question: "A 'slow-onset' disaster, such as a drought affecting the Marathwada region of Maharashtra, is characterized by:",
                    options: ["A sudden and violent impact.", "A gradual development over a long period, making it more predictable.", "Being exclusively caused by human activity.", "Having no significant long-term consequences."],
                    answer: "A gradual development over a long period, making it more predictable."
                },
                {
                    question: "A massive landslide in a remote, uninhabited part of the Himalayas is correctly classified as a:",
                    options: ["Disaster", "Catastrophe", "Hazard Event", "National Calamity"],
                    answer: "Hazard Event"
                },
                {
                    question: "The 'Coping Capacity' of a community refers to:",
                    options: ["The total population of the affected area.", "The strengths, attributes, and resources available within the community to manage adverse conditions.", "The maximum amount of international aid the community is eligible for.", "The number of emergency shelters available."],
                    answer: "The strengths, attributes, and resources available within the community to manage adverse conditions."
                },
                {
                    question: "A situation that requires a response but can be managed using a community's or region's own resources is typically called an:",
                    options: ["Emergency", "Catastrophe", "Hazard", "Outbreak"],
                    answer: "Emergency"
                }
            ],
            2: [
                {
                    question: "The Disaster Management Cycle is best understood as:",
                    options: ["A rigid, linear sequence of actions that must be followed in order.", "A continuous and integrated process for managing all stages of a disaster.", "A framework that focuses only on post-disaster relief activities.", "A model used exclusively by international response teams."],
                    answer: "A continuous and integrated process for managing all stages of a disaster."
                },
                {
                    question: "Actions taken to reduce or eliminate the impacts and risks of hazards before they occur are part of which phase?",
                    options: ["Response", "Recovery", "Mitigation", "Preparedness"],
                    answer: "Mitigation"
                },
                {
                    question: "The immediate deployment of the National Disaster Response Force (NDRF) for search and rescue operations after a building collapse is a ______ phase activity.",
                    options: ["Mitigation", "Preparedness", "Response", "Recovery"],
                    answer: "Response"
                },
                {
                    question: "The development of a community evacuation plan and the regular conducting of mock drills are key elements of:",
                    options: ["Recovery", "Response", "Preparedness", "Mitigation"],
                    answer: "Preparedness"
                },
                {
                    question: "The 'Paradigm Shift' in India's official approach to disaster management, post-2005, moved from a relief-centric model to a more:",
                    options: ["Response-only focused model.", "Foreign aid-dependent model.", "Proactive, holistic, and integrated model covering prevention, mitigation, and preparedness.", "Top-down, military-led model."],
                    answer: "Proactive, holistic, and integrated model covering prevention, mitigation, and preparedness."
                },
                {
                    question: "The long-term process of restoring livelihoods, rebuilding infrastructure, and providing psychosocial support after a disaster is known as:",
                    options: ["Response", "Preparedness", "Assessment", "Recovery"],
                    answer: "Recovery"
                },
                {
                    question: "The construction of cyclone shelters as part of the National Cyclone Risk Mitigation Project in India is a classic example of:",
                    options: ["Mitigation", "Preparedness", "Response", "Recovery"],
                    answer: "Mitigation"
                },
                {
                    question: "The \"pre-disaster\" phases of the cycle are:",
                    options: ["Response and Recovery.", "Mitigation and Preparedness.", "Preparedness and Response.", "Assessment and Recovery."],
                    answer: "Mitigation and Preparedness."
                },
                {
                    question: "The main difference between Mitigation and Preparedness is:",
                    options: ["Mitigation is long-term, while Preparedness is short-term.", "Mitigation aims to reduce the hazard's impact, while Preparedness aims to improve the response to it.", "Mitigation is done by the central government, while Preparedness is done by local communities.", "Mitigation is more expensive than Preparedness."],
                    answer: "Mitigation aims to reduce the hazard's impact, while Preparedness aims to improve the response to it."
                },
                {
                    question: "The transition from the 'Response' to the 'Recovery' phase is marked by a shift from:",
                    options: ["Meeting immediate, life-saving needs to addressing long-term rebuilding and restoration.", "Planning and drills to active operations.", "Assessing damage to issuing warnings.", "Long-term goals to short-term needs."],
                    answer: "Meeting immediate, life-saving needs to addressing long-term rebuilding and restoration."
                }
            ]
        };

        let currentModule = null;
        let currentQuestionIndex = 0;
        let selectedAnswers = [];
        let quizQuestions = [];

        function startQuiz() {
            const moduleSelect = document.getElementById('module-select');
            currentModule = parseInt(moduleSelect.value);
            
            if (!currentModule || !quizData[currentModule]) {
                alert('Please select a valid module.');
                return;
            }

            quizQuestions = [...quizData[currentModule]];
            currentQuestionIndex = 0;
            selectedAnswers = new Array(quizQuestions.length).fill(null);
            
            document.getElementById('quiz-area').style.display = 'block';
            loadQuestion();
        }

        function loadQuestion() {
            if (currentQuestionIndex < quizQuestions.length) {
                const question = quizQuestions[currentQuestionIndex];
                document.getElementById('question-counter').textContent = 
                    `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
                document.getElementById('quiz-question').textContent = question.question;
                
                const optionsContainer = document.getElementById('quiz-options');
                optionsContainer.innerHTML = '';
                
                question.options.forEach((option, index) => {
                    const button = document.createElement('button');
                    button.className = 'option-btn';
                    button.textContent = option;
                    button.onclick = () => selectOption(button, option, index);
                    
                    if (selectedAnswers[currentQuestionIndex] === option) {
                        button.classList.add('selected');
                    }
                    
                    optionsContainer.appendChild(button);
                });
                
                updateNavigationButtons();
            }
        }

        function selectOption(button, option, index) {
            document.querySelectorAll('.option-btn').forEach(btn => 
                btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedAnswers[currentQuestionIndex] = option;
            updateNavigationButtons();
        }

        function updateNavigationButtons() {
            const nextBtn = document.getElementById('next-btn');
            const finishBtn = document.getElementById('finish-btn');
            const hasAnswer = selectedAnswers[currentQuestionIndex] !== null;
            
            if (currentQuestionIndex === quizQuestions.length - 1) {
                nextBtn.style.display = 'none';
                finishBtn.style.display = hasAnswer ? 'block' : 'none';
            } else {
                nextBtn.style.display = hasAnswer ? 'block' : 'none';
                finishBtn.style.display = 'none';
            }
        }

        function nextQuestion() {
            currentQuestionIndex++;
            loadQuestion();
        }

        function finishQuiz() {
            let correctAnswers = 0;
            let answeredQuestions = 0;
            
            for (let i = 0; i < quizQuestions.length; i++) {
                if (selectedAnswers[i] !== null) {
                    answeredQuestions++;
                    if (selectedAnswers[i] === quizQuestions[i].answer) {
                        correctAnswers++;
                    }
                }
            }
            
            // Submit quiz results
            const formData = new FormData();
            formData.append('module', currentModule);
            formData.append('total_questions', quizQuestions.length);
            formData.append('correct_answers', correctAnswers);
            formData.append('answered_questions', answeredQuestions);
            
            fetch('submit_quiz.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(`Quiz completed!\nScore: ${data.score}/${data.total} (${data.percentage}%)\n${data.certification_eligible ? 'Eligible for certification!' : 'Keep practicing to improve your score.'}`);
                    location.reload(); // Refresh to show updated progress
                } else {
                    alert('Error saving quiz results. Please try again.');
                }
            })
            .catch(error => {
                alert('Network error. Please try again.');
            });
        }
    </script>
</body>
</html>