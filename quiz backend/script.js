// Modal functionality
function openModal(type) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');

    let content = '';

    switch (type) {
        case 'register':
            content = `
                <h2>Exam Registration</h2>
                <p>You will be redirected to the official SAKSHAM registration portal.</p>
                <p><strong>Exam Date:</strong> October 25, 2025</p>
                <p><strong>Important:</strong> Use the same email ID that you used for course enrollment.</p>
                <button onclick="closeModal()" style="background-color: #0984e3; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin-top: 15px;">Continue to Registration</button>
            `;
            break;
        case 'payment':
            content = `
                <h2>Check Payment Status</h2>
                <p>Enter your registered email ID to check payment status:</p>
                <input type="email" placeholder="Enter your email" style="width: 100%; padding: 10px; margin: 15px 0; border: 1px solid #ddd; border-radius: 5px;">
                <button onclick="checkPayment()" style="background-color: #27ae60; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Check Status</button>
            `;
            break;
    }

    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function checkPayment() {
    closeModal();
}

// Navigation functionality
function showSection(section) {
    document.querySelectorAll('.main-content > div:not(.announcement-notice)').forEach(div => {
        div.style.display = 'none';
    });

    if (section === 'announcements') {
        document.querySelector('.announcement-notice').style.display = 'block';
    } else if (section === 'about') {
        // Currently no specific 'about' section content to show, so hide all.
    } else if (section === 'quiz') {
        document.getElementById('module-selection').style.display = 'block';
    } else if (section === 'review') {
        // Currently no specific 'review' section content to show, so hide all.
    }
    // Note: The original script did not handle 'progress' or 'qa' sections here.
}

function showWeek(weekNum) {
    // Original script did not have specific content display for showWeek
}

function showLecture(moduleNum) {
    // Original script did not have specific content display for showLecture
}

function showQuiz(moduleNum) {
    // Original script used a dropdown, this function was not directly called from sidebar buttons.
    // It will be re-implemented to trigger the dropdown-based quiz start.
    document.getElementById('module-select').value = moduleNum;
    startQuiz(); // Trigger the quiz start based on the selected module
}

function showProgress() {
    // Hide all known main content sections and elements explicitly
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('progress-container').style.display = 'none';
    document.getElementById('qa-section').style.display = 'none';
    document.querySelector('.announcement-notice').style.display = 'none';
    document.querySelector('.main-title').style.display = 'none';
    document.querySelector('.check-progress-btn').style.display = 'none';
    document.querySelector('.date').style.display = 'none';
    document.querySelectorAll('.content-text').forEach(p => p.style.display = 'none');
    document.querySelector('.important-note').style.display = 'none';
    document.querySelector('.exam-info').style.display = 'none';
    document.querySelector('.note-section').style.display = 'none';

    document.getElementById('progress-container').style.display = 'block';
    updateProgressBar(); // Ensure progress bar is updated when shown
}

// New function to populate the course module dropdown
function populateCourseModules() {
    const courseModuleSelect = document.getElementById('course-module-select');
    for (let i = 1; i <= 11; i++) { // Assuming modules 1 to 11
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Module ${i}`;
        courseModuleSelect.appendChild(option);
    }
}

function showInfo(type) {
    if (type === 'nptel') {
        alert('NPTEL courses are online courses offered by IITs and IISc. They include video lectures, assignments, and certification exams.');
    }
}

function showExamCities() {
    const cities = [
        'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata',
        'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
        'Bhopal', 'Thiruvananthapuram', 'Guwahati', 'Bhubaneswar'
    ];

    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');

    let content = '<h2>Available Exam Cities</h2><ul style="text-align: left; max-height: 300px; overflow-y: auto;">';
    cities.forEach(city => {
        content += `<li style="padding: 5px 0;">${city}</li>`;
    });
    content += '</ul>';

    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Highlight important dates
    const dates = document.querySelectorAll('.highlight');
    dates.forEach(date => {
        date.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#fff3cd';
            this.style.padding = '2px 4px';
            this.style.borderRadius = '3px';
        });

        date.addEventListener('mouseout', function() {
            this.style.backgroundColor = 'transparent';
            this.style.padding = '0';
        });
    });

    // Add animation to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Quiz functionality initialization
    populateModules();
    startQuizBtn.addEventListener('click', startQuiz);
    quizNextBtn.addEventListener('click', nextQuestion);
});

// Quiz Data Structure
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
    ],
    3: [
        {
            question: "What is the primary purpose of conducting a Hazard, Vulnerability, and Risk Assessment (HVRA)?",
            options: ["To allocate blame after a disaster has occurred.", "To identify potential threats and understand their potential impact in order to prioritize action.", "To document the history of past disasters for academic purposes.", "To secure funding from international donors."],
            answer: "To identify potential threats and understand their potential impact in order to prioritize action."
        },
        {
            question: "Which government body is the nodal agency for flood forecasting in India?",
            options: ["Central Water Commission (CWC)", "National Centre for Seismology (NCS)", "Geological Survey of India (GSI)", "India Meteorological Department (IMD)"],
            answer: "Central Water Commission (CWC)"
        },
        {
            question: "A 'Risk Matrix' is a tool used in risk assessment to:",
            options: ["Map the exact locations of emergency shelters.", "Prioritize risks by qualitatively analyzing their likelihood and potential consequences.", "Calculate the exact financial cost of a future disaster.", "Assign specific tasks to response team members."],
            answer: "Prioritize risks by qualitatively analyzing their likelihood and potential consequences."
        },
        {
            question: "The classification of India into different 'Seismic Zones' (from Zone II to Zone V) is a direct outcome of a national-level:",
            options: ["Social Vulnerability Assessment", "Hazard Assessment", "Capacity Assessment", "Post-Disaster Needs Assessment"],
            answer: "Hazard Assessment"
        },
        {
            question: "Identifying that elderly residents living alone in multi-story urban buildings are at higher risk during an earthquake is an example of:",
            options: ["Hazard mapping", "Social vulnerability assessment", "Structural assessment of the building.", "Economic impact analysis."],
            answer: "Social vulnerability assessment"
        },
        {
            question: "A topographical map showing areas likely to be inundated during a 100-year flood event is a direct output of:",
            options: ["Capacity assessment", "Social vulnerability analysis", "Hazard mapping", "A needs assessment."],
            answer: "Hazard mapping"
        },
        {
            question: "The 'Vulnerability Atlas of India' is a crucial tool for:",
            options: ["Planners, engineers, and policymakers to understand the varying levels of hazard exposure across the country.", "Response teams to know where to deploy first.", "Tourists to identify safe travel destinations.", "Calculating the national GDP."],
            answer: "Planners, engineers, and policymakers to understand the varying levels of hazard exposure across the country."
        },
        {
            question: "A qualitative risk assessment primarily relies on:",
            options: ["Complex mathematical formulas and financial data.", "Descriptive scales (e.g., low, medium, high) and expert judgment.", "Satellite imagery and GPS coordinates exclusively.", "Historical casualty figures only."],
            answer: "Descriptive scales (e.g., low, medium, high) and expert judgment."
        },
        {
            question: "Why is HVRA considered a continuous and dynamic process?",
            options: ["Because the assessment tools become obsolete very quickly.", "Because risk profiles change over time due to factors like climate change, urbanization, and new development.", "Because it is a legal requirement to update it every month.", "Because the initial assessments are generally inaccurate."],
            answer: "Because risk profiles change over time due to factors like climate change, urbanization, and new development."
        },
        {
            question: "The use of satellite imagery from ISRO's satellites for disaster management is crucial for:",
            options: ["Preventing earthquakes.", "Large-scale mapping of hazard-prone areas and rapid damage assessment.", "Providing financial aid to victims.", "Managing the legal framework of disasters."],
            answer: "Large-scale mapping of hazard-prone areas and rapid damage assessment."
        }
    ],
    4: [
        {
            question: "'Structural Mitigation' refers to:",
            options: ["Any physical construction or measure to reduce the possible impacts of hazards.", "Changes in laws and official procedures.", "Public awareness campaigns and training programs.", "The organizational chart of a disaster management authority."],
            answer: "Any physical construction or measure to reduce the possible impacts of hazards."
        },
        {
            question: "The enforcement of India's 'National Building Code' for earthquake-resistant construction is a key example of:",
            options: ["Structural Mitigation", "Disaster Preparedness", "Disaster Response", "Post-disaster reconstruction"],
            answer: "Structural Mitigation"
        },
        {
            question: "Which of the following is a prime example of 'Non-structural Mitigation'?",
            options: ["Building a cyclone shelter.", "Constructing a river embankment.", "Implementing land-use zoning regulations to prevent construction in high-risk areas.", "Retrofitting a hospital to make it earthquake-resistant."],
            answer: "Implementing land-use zoning regulations to prevent construction in high-risk areas."
        },
        {
            question: "The practice of 'retrofitting' a building involves:",
            options: ["Demolishing it and building a new one from scratch.", "Strengthening an existing structure to make it more resistant to forces like earthquakes or cyclones.", "Converting a building into a temporary emergency shelter.", "Conducting a routine safety audit."],
            answer: "Strengthening an existing structure to make it more resistant to forces like earthquakes or cyclones."
        },
        {
            question: "The Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) in India is often used for mitigation works like:",
            options: ["Building large-scale industrial plants.", "Drought-proofing by constructing check-dams and percolation tanks.", "Distributing food and water during a response.", "Conducting search and rescue operations."],
            answer: "Drought-proofing by constructing check-dams and percolation tanks."
        },
        {
            question: "Why is investing in disaster mitigation considered highly cost-effective?",
            options: ["It generates immediate revenue for the government.", "It completely eliminates the need for any disaster preparedness.", "Studies show that every dollar spent on mitigation saves multiple dollars in future losses.", "It is always cheaper than response activities."],
            answer: "Studies show that every dollar spent on mitigation saves multiple dollars in future losses."
        },
        {
            question: "India's 'Coastal Regulation Zone' (CRZ) rules, which govern development near the coastline, are a form of:",
            options: ["Structural mitigation", "Emergency response", "Non-structural mitigation", "Community preparedness drill"],
            answer: "Non-structural mitigation"
        },
        {
            question: "Crop diversification and promoting drought-resistant crop varieties in arid regions is a form of:",
            options: ["Structural mitigation", "Economic or livelihood-based mitigation", "Emergency response", "Post-disaster recovery"],
            answer: "Economic or livelihood-based mitigation"
        },
        {
            question: "Building a sea wall to protect a coastal city from storm surges is an example of:",
            options: ["Structural Mitigation", "Preparedness", "Recovery", "Response"],
            answer: "Structural Mitigation"
        },
        {
            question: "Public awareness campaigns on how to make homes safer from common hazards are a key part of:",
            options: ["Non-structural mitigation", "Search and rescue", "Relief distribution", "Structural mitigation"],
            answer: "Non-structural mitigation"
        }
    ],
    5: [
        {
            question: "The primary goal of Disaster Preparedness is to:",
            options: ["Prevent any natural hazard from occurring.", "Ensure that resources and procedures are in place for an effective response when a disaster strikes.", "Rebuild the community after a disaster has occurred.", "Analyze the causes of past disasters."],
            answer: "Ensure that resources and procedures are in place for an effective response when a disaster strikes."
        },
        {
            question: "An Early Warning System (EWS) is most effective when it is:",
            options: ["Technologically advanced but only understood by scientists.", "Focused solely on broadcasting a loud siren.", "People-centric, understandable, and capable of triggering timely action by the community at risk.", "Managed by a single, isolated government agency."],
            answer: "People-centric, understandable, and capable of triggering timely action by the community at risk."
        },
        {
            question: "In India, who is responsible for issuing official warnings for cyclones?",
            options: ["The Prime Minister's Office", "The National Disaster Management Authority (NDMA)", "The India Meteorological Department (IMD)", "The Indian Navy"],
            answer: "The India Meteorological Department (IMD)"
        },
        {
            question: "Conducting a full-scale evacuation drill for a coastal community is a preparedness activity designed to:",
            options: ["Test plans, identify gaps, and train personnel and the public.", "Fulfill a legal formality with no real practical purpose.", "Create a controlled sense of panic to gauge public reaction.", "Map out the hazard-prone zones."],
            answer: "Test plans, identify gaps, and train personnel and the public."
        },
        {
            question: "An Emergency Operations Center (EOC) is a:",
            options: ["Field hospital for treating injured people.", "Temporary shelter for displaced populations.", "Centralized command and control facility for managing a disaster.", "Warehouse for storing relief supplies."],
            answer: "Centralized command and control facility for managing a disaster."
        },
        {
            question: "The 'Aapda Mitra' scheme in India focuses on:",
            options: ["Providing financial loans for mitigation projects.", "Training community volunteers in basic disaster response skills.", "A new early warning satellite system.", "A mobile app for weather forecasting."],
            answer: "Training community volunteers in basic disaster response skills."
        },
        {
            question: "A \"Go-Bag\" or \"Emergency Kit\" is a preparedness measure recommended for:",
            options: ["Government agencies only", "Households and individuals to be self-sufficient for the first 72 hours.", "International relief workers exclusively.", "Scientific research teams."],
            answer: "Households and individuals to be self-sufficient for the first 72 hours."
        },
        {
            question: "The 'India Disaster Resource Network' (IDRN) is a web-based platform that provides:",
            options: ["A real-time tracker for cyclones.", "A systematic inventory of equipment and human resources available for response.", "A portal for donating to relief funds.", "A list of all historical disasters."],
            answer: "A systematic inventory of equipment and human resources available for response."
        },
        {
            question: "Mock drills conducted by the National Disaster Response Force (NDRF) in collaboration with states are a key part of:",
            options: ["Mitigation", "Recovery", "Preparedness", "Response"],
            answer: "Preparedness"
        },
        {
            question: "A 'Disaster Management Plan' (DMP) is a document that:",
            options: ["Is a historical record of past disasters in a region.", "Outlines the roles, responsibilities, and standard operating procedures for managing a disaster.", "Is a financial statement of all relief funds collected.", "Is a list of people affected by a past disaster."],
            answer: "Outlines the roles, responsibilities, and standard operating procedures for managing a disaster."
        }
    ],
    6: [
        {
            question: "The \"Golden Hours\" in disaster response typically refer to:",
            options: ["The time when media coverage is at its peak.", "The first 72 hours after a disaster, which are considered most critical for finding survivors.", "The daily briefings held at the Emergency Operations Center.", "The period when international aid is most generous."],
            answer: "The first 72 hours after a disaster, which are considered most critical for finding survivors."
        },
        {
            question: "The primary and most immediate objective of the disaster response phase is:",
            options: ["To restore the national economy.", "To conduct a detailed economic damage assessment for insurance claims.", "To save lives, provide first aid, and meet the basic needs of survivors.", "To clear all debris and rubble from the affected area."],
            answer: "To save lives, provide first aid, and meet the basic needs of survivors."
        },
        {
            question: "The 'Incident Command System' (ICS), or Incident Response System (IRS) as adapted in India, is a standardized tool for:",
            options: ["Ensuring efficient and coordinated management of response operations among various agencies.", "Calculating the total economic loss from a disaster.", "Predicting the timing of the next disaster.", "Distributing financial compensation to victims."],
            answer: "Ensuring efficient and coordinated management of response operations among various agencies."
        },
        {
            question: "The process of 'Triage' in a mass casualty incident involves:",
            options: ["Providing the exact same treatment to all victims.", "Sorting and prioritizing casualties based on the severity of their injuries to maximize the number of survivors.", "Transporting all victims to the same hospital regardless of its capacity.", "Counting the number of fatalities for official records."],
            answer: "Sorting and prioritizing casualties based on the severity of their injuries to maximize the number of survivors."
        },
        {
            question: "In India, the primary responsibility for disaster response lies with the:",
            options: ["Central Government", "Respective State Government", "National Disaster Response Force (NDRF)", "United Nations"],
            answer: "Respective State Government"
        },
        {
            question: "What is the role of the Indian Armed Forces (Army, Navy, Air Force) in disaster response?",
            options: ["They are the default first responders in every situation.", "They provide crucial support to the civil administration when requested, especially for logistics, rescue, and medical aid.", "They are only involved in disasters that cross international borders.", "Their role is strictly limited to providing medical assistance."],
            answer: "They provide crucial support to the civil administration when requested, especially for logistics, rescue, and medical aid."
        },
        {
            question: "An Emergency Operations Centre (EOC) activated during a disaster serves as the:",
            options: ["Main shelter for all displaced people.", "Nerve center for information collection, coordination, and decision-making.", "Primary storage facility for relief materials.", "Media briefing center only."],
            answer: "Nerve center for information collection, coordination, and decision-making."
        },
        {
            question: "A \"windshield survey\" or Rapid Assessment is conducted during the initial hours of a response to:",
            options: ["Get a quick, initial overview of the extent of damage and identify priority areas.", "Finalize the exact number of casualties.", "Test the durability of vehicle windshields in a disaster zone.", "Plan the long-term reconstruction strategy."],
            answer: "Get a quick, initial overview of the extent of damage and identify priority areas."
        },
        {
            question: "The specialized battalions of the National Disaster Response Force (NDRF) are comprised of personnel on deputation from:",
            options: ["The Indian Administrative Service (IAS).", "Central Armed Police Forces (CAPFs).", "The Indian Forest Service (IFS).", "State government administrative offices."],
            answer: "Central Armed Police Forces (CAPFs)."
        },
        {
            question: "Setting up temporary relief camps and distributing essential supplies like food, water, and medicines is a key ______ activity.",
            options: ["Mitigation", "Preparedness", "Response", "Recovery Planning"],
            answer: "Response"
        }
    ],
    7: [
        {
            question: "The main difference between a Rapid Needs Assessment (RNA) and a Detailed Assessment is:",
            options: ["The RNA is done after recovery is complete, while the detailed one is done during the response.", "The RNA is quick and provides a general overview for immediate relief, while the detailed one is comprehensive and informs long-term recovery.", "The RNA is performed by international teams, while the detailed one is done by local officials.", "The RNA focuses only on infrastructure, while the detailed one focuses only on people."],
            answer: "The RNA is quick and provides a general overview for immediate relief, while the detailed one is comprehensive and informs long-term recovery."
        },
        {
            question: "In India, an 'Inter-Ministerial Central Team' (IMCT) is sent to an affected state to:",
            options: ["Take over the response operations from the state government.", "Assess the extent of damage to validate the state's request for central financial assistance.", "Conduct mock drills for future disasters.", "Distribute relief materials directly to the people."],
            answer: "Assess the extent of damage to validate the state's request for central financial assistance."
        },
        {
            question: "The 'WASH' sector, which is a critical focus in any needs assessment, stands for:",
            options: ["Weather, Atmosphere, and Seismic Hazards.", "Water, Sanitation, and Hygiene.", "Warning, Alert, and System Hub.", "Worker and Survivor Health."],
            answer: "Water, Sanitation, and Hygiene."
        },
        {
            question: "Why is it important to conduct a needs assessment before distributing large-scale aid?",
            options: ["To ensure the aid provided matches the actual needs of different groups within the affected population.", "It is a legal requirement by all donor agencies, but has little practical value.", "To deliberately delay the aid distribution process.", "To identify who is to blame for the situation."],
            answer: "To ensure the aid provided matches the actual needs of different groups within the affected population."
        },
        {
            question: "Financial assistance for immediate relief in India is primarily drawn from the State Disaster Response Fund (SDRF). If these funds are exhausted, the state can request assistance from the:",
            options: ["World Bank", "National Disaster Response Fund (NDRF)", "Contingency Fund of India", "Prime Minister's National Relief Fund (PMNRF)"],
            answer: "National Disaster Response Fund (NDRF)"
        },
        {
            question: "A 'participatory assessment' is one where:",
            options: ["Only external experts are involved in the process.", "The affected community is actively involved in identifying their own needs and priorities.", "The assessment is done remotely using only satellite images.", "The government dictates all the findings without consultation."],
            answer: "The affected community is actively involved in identifying their own needs and priorities."
        },
        {
            question: "Why is 'baseline data' (information about the community's condition before the disaster) important for a damage assessment?",
            options: ["It helps to accurately measure the impact and losses caused by the disaster.", "It provides a complete list of all community members for roll call.", "It fulfills a bureaucratic requirement but is not used in the analysis.", "It is required for forecasting the weather."],
            answer: "It helps to accurately measure the impact and losses caused by the disaster."
        },
        {
            question: "Assessing the damage to crops, livestock, and small businesses falls under the category of:",
            options: ["Infrastructure assessment", "Livelihood assessment", "Psychosocial assessment", "Environmental impact assessment"],
            answer: "Livelihood assessment"
        },
        {
            question: "The information gathered from a needs assessment is primarily used by disaster managers to:",
            options: ["Write academic research papers for international journals.", "Plan and prioritize the response and recovery efforts effectively.", "Create a documentary about the disaster.", "Support the political campaigns of local leaders."],
            answer: "Plan and prioritize the response and recovery efforts effectively."
        },
        {
            question: "A key challenge in conducting assessments in a diverse country like India is:",
            options: ["The lack of any established government procedures.", "Ensuring the inclusion of marginalized groups (women, disabled, lower castes) whose needs may be overlooked.", "The fact that disasters impact all social groups uniformly.", "The absence of any technology to assist in the process."],
            answer: "Ensuring the inclusion of marginalized groups (women, disabled, lower castes) whose needs may be overlooked."
        }
    ],
    8: [
        {
            question: "The recovery phase is best described as a:",
            options: ["Short-term process of providing emergency food and water.", "Long-term process of restoring and improving a community's social, economic, and physical well-being.", "Phase focused on issuing early warnings.", "Legal process of declaring a state of emergency."],
            answer: "Long-term process of restoring and improving a community's social, economic, and physical well-being."
        },
        {
            question: "The principle of \"Building Back Better\" (BBB), widely promoted by the UN, means:",
            options: ["Rebuilding structures exactly as they were before, but doing it much faster.", "Using the recovery and reconstruction process as an opportunity to reduce underlying vulnerabilities and build resilience.", "Focusing exclusively on the economic recovery of large businesses.", "Using cheaper, substandard materials to speed up the reconstruction process."],
            answer: "Using the recovery and reconstruction process as an opportunity to reduce underlying vulnerabilities and build resilience."
        },
        {
            question: "The reconstruction program after the 2001 Bhuj Earthquake in Gujarat is often cited as a large-scale example of:",
            options: ["A slow and ineffective recovery process.", "An owner-driven reconstruction and \"Building Back Better\" approach.", "A recovery effort managed entirely by foreign agencies.", "A focus on providing temporary shelters only."],
            answer: "An owner-driven reconstruction and \"Building Back Better\" approach."
        },
        {
            question: "Providing psychosocial support and mental health services is a critical component of:",
            options: ["Early warning systems.", "Long-term rehabilitation.", "Structural mitigation.", "Debris management."],
            answer: "Long-term rehabilitation."
        },
        {
            question: "What is the key difference between 'Rehabilitation' and 'Reconstruction'?",
            options: ["There is no difference; the terms are interchangeable.", "Rehabilitation focuses on restoring people's well-being and services, while reconstruction focuses on rebuilding physical infrastructure.", "Reconstruction always happens first, followed by rehabilitation.", "Rehabilitation is done by NGOs, while reconstruction is done by the government."],
            answer: "Rehabilitation focuses on restoring people's well-being and services, while reconstruction focuses on rebuilding physical infrastructure."
        },
        {
            question: "Restoring agricultural activities, small businesses, and other income-generating activities is known as:",
            options: ["Livelihood recovery", "Physical reconstruction", "Rapid assessment", "Emergency sheltering"],
            answer: "Livelihood recovery"
        },
        {
            question: "An \"owner-driven\" reconstruction model, often used in India, is successful because it:",
            options: ["Is faster and cheaper than any contractor-driven model.", "Empowers the local community, incorporates local knowledge, and fosters a sense of ownership.", "Eliminates the need for any government oversight or technical guidance.", "Requires no specialized skills for construction."],
            answer: "Empowers the local community, incorporates local knowledge, and fosters a sense of ownership."
        },
        {
            question: "The recovery phase presents a crucial opportunity to:",
            options: ["Integrate disaster risk reduction measures into the reconstruction process.", "Quickly forget about the disaster and move on.", "Test the effectiveness of the initial response teams.", "Elect new government officials."],
            answer: "Integrate disaster risk reduction measures into the reconstruction process."
        },
        {
            question: "Debris management is an important and often challenging aspect of:",
            options: ["Preparedness", "Early recovery and reconstruction", "Hazard assessment", "Public awareness campaigns"],
            answer: "Early recovery and reconstruction"
        },
        {
            question: "A sustainable recovery process ensures that:",
            options: ["All reconstruction is funded by international donors.", "The focus is on rapid economic growth, regardless of the environmental impact.", "The needs of the present are met without compromising the ability of future generations to meet their own needs.", "The community becomes completely dependent on external aid."],
            answer: "The needs of the present are met without compromising the ability of future generations to meet their own needs."
        }
    ],
    9: [
        {
            question: "The entire legal and institutional framework for disaster management in India is built upon the:",
            options: ["Environment (Protection) Act, 1860", "The Indian Penal Code, 1860", "The Disaster Management Act, 2005", "The Right to Information Act, 2005"],
            answer: "The Disaster Management Act, 2005"
        },
        {
            question: "Who is the chairperson of the National Disaster Management Authority (NDMA) in India?",
            options: ["The President of India", "The Union Home Minister", "The Prime Minister of India", "The Cabinet Secretary"],
            answer: "The Prime Minister of India"
        },
        {
            question: "The primary global framework for Disaster Risk Reduction, adopted by UN member states including India in 2015, is the:",
            options: ["Kyoto Protocol", "Paris Agreement", "Sendai Framework for Disaster Risk Reduction", "Hyogo Framework for Action"],
            answer: "Sendai Framework for Disaster Risk Reduction"
        },
        {
            question: "In India's three-tiered disaster management structure, the State Disaster Management Authority (SDMA) is headed by the:",
            options: ["Governor of the State", "Chief Minister of the State", "State Home Minister", "Chief Secretary of the State"],
            answer: "Chief Minister of the State"
        },
        {
            question: "The 'National Executive Committee' (NEC), chaired by the Union Home Secretary, is responsible for:",
            options: ["Carrying out on-ground search and rescue operations.", "Assisting the NDMA and acting as the primary coordinating body for the country.", "Heading the State Disaster Management Authority.", "Commanding the Indian Armed Forces during a disaster."],
            answer: "Assisting the NDMA and acting as the primary coordinating body for the country."
        },
        {
            question: "At the district level, the District Disaster Management Authority (DDMA) is chaired by the:",
            options: ["Superintendent of Police", "District Collector / District Magistrate", "Chief Medical Officer", "Member of Parliament (MP) of that district."],
            answer: "District Collector / District Magistrate"
        },
        {
            question: "The National Disaster Response Force (NDRF) was created under the provisions of:",
            options: ["A resolution by the United Nations.", "The Disaster Management Act, 2005.", "A presidential ordinance.", "The Indian Police Act."],
            answer: "The Disaster Management Act, 2005."
        },
        {
            question: "The concept of \"mainstreaming\" DRR (Disaster Risk Reduction) into development planning means:",
            options: ["Creating a separate government department solely for DRR.", "Integrating risk reduction principles into all development sectors like infrastructure, housing, and education.", "Relying only on technology for disaster management.", "Making disaster management a compulsory subject in schools."],
            answer: "Integrating risk reduction principles into all development sectors like infrastructure, housing, and education."
        },
        {
            question: "The State Disaster Response Fund (SDRF) is:",
            options: ["The primary fund available to state governments for providing immediate relief.", "A fund managed exclusively by the central government.", "A fund meant only for long-term reconstruction projects.", "A voluntary donation-based fund."],
            answer: "The primary fund available to state governments for providing immediate relief."
        },
        {
            question: "According to the DM Act of 2005, obstructing a government official in the discharge of their duties during a disaster is:",
            options: ["A praiseworthy act", "A punishable offense", "A civil dispute", "A matter to be ignored"],
            answer: "A punishable offense"
        }
    ],
    10: [
        {
            question: "The core principle of Community-Based Disaster Management (CBDM) is that:",
            options: ["The community is a passive victim and should always wait for external help.", "The community is the first responder and should be central to managing its own risk.", "Disaster management is too complex for local communities to understand.", "Only professionally trained experts should be involved in disaster management."],
            answer: "The community is the first responder and should be central to managing its own risk."
        },
        {
            question: "Why is local and traditional knowledge considered crucial in CBDM?",
            options: ["It is scientifically more accurate than satellite data.", "It provides historical context and deep understanding of local vulnerabilities, resources, and coping mechanisms.", "It is the only information available in most remote communities.", "It helps in securing international funding."],
            answer: "It provides historical context and deep understanding of local vulnerabilities, resources, and coping mechanisms."
        },
        {
            question: "In India, the 73rd and 74th Constitutional Amendments empowering local self-governance are significant for CBDM because they:",
            options: ["Made disaster management a central government subject.", "Created a formal role for Panchayati Raj Institutions (PRIs) and Urban Local Bodies (ULBs) in local planning, including for disasters.", "Created the National Disaster Response Force.", "Banned the involvement of communities in disaster management."],
            answer: "Created a formal role for Panchayati Raj Institutions (PRIs) and Urban Local Bodies (ULBs) in local planning, including for disasters."
        },
        {
            question: "A 'Village Disaster Management Plan' (VDMP), developed through a participatory process, typically includes:",
            options: ["The national budget for disaster management.", "A local resource and vulnerability map, evacuation routes, and a list of community task force members.", "Contact details of international aid agencies.", "A detailed seismic history of the entire country."],
            answer: "A local resource and vulnerability map, evacuation routes, and a list of community task force members."
        },
        {
            question: "The role of an external agency (like an NGO or government department) in CBDM should primarily be that of a:",
            options: ["Commander", "Director", "Facilitator", "Benefactor"],
            answer: "Facilitator"
        },
        {
            question: "A key advantage of the CBDM approach is that it:",
            options: ["Is generally more expensive than top-down approaches.", "Fosters local ownership, sustainability, and empowerment within the community.", "Eliminates the need for any government involvement.", "Works effectively without any external support or resources."],
            answer: "Fosters local ownership, sustainability, and empowerment within the community."
        },
        {
            question: "The success of Odisha's cyclone preparedness model is largely attributed to:",
            options: ["A top-down, command-and-control system with no community involvement.", "A robust system that combines technology-driven early warnings with active community-level participation in evacuation and shelter management.", "A complete reliance on the National Disaster Response Force (NDRF).", "The absence of any major cyclones after 1999."],
            answer: "A robust system that combines technology-driven early warnings with active community-level participation in evacuation and shelter management."
        },
        {
            question: "A 'Social Map' created by a community often identifies:",
            options: ["The GDP of the state.", "Key resources, infrastructure, and the location of highly vulnerable households (e.g., elderly, disabled).", "Official administrative boundaries of the district.", "International flight paths over the area."],
            answer: "Key resources, infrastructure, and the location of highly vulnerable households (e.g., elderly, disabled)."
        },
        {
            question: "In an urban context, Resident Welfare Associations (RWAs) can play a significant role in:",
            options: ["Preparing apartment or neighborhood-level disaster management plans.", "Directing the municipal corporation's city-wide response.", "Amending the National Building Code.", "They are private bodies with no role in disaster management."],
            answer: "Preparing apartment or neighborhood-level disaster management plans."
        },
        {
            question: "A participatory risk assessment is one where:",
            options: ["Only external experts are involved.", "The affected community is actively involved in identifying and analyzing its own risks and capacities.", "The assessment is done remotely using only social media.", "The government dictates all the findings."],
            answer: "The affected community is actively involved in identifying and analyzing its own risks and capacities."
        }
    ],
    11: [
        {
            question: "The impact of global climate change on disasters is primarily seen through:",
            options: ["A decrease in the number of natural hazards.", "An increase in the frequency and intensity of hydro-meteorological hazards like cyclones, floods, and heatwaves.", "The complete elimination of geophysical hazards like earthquakes.", "Making all disasters perfectly predictable."],
            answer: "An increase in the frequency and intensity of hydro-meteorological hazards like cyclones, floods, and heatwaves."
        },
        {
            question: "A \"gender-sensitive approach\" to disaster management is important because:",
            options: ["Men and women are often impacted by and cope with disasters differently, and have different needs and vulnerabilities.", "It is a mandatory requirement for all international funding.", "It ensures that only women receive aid during a disaster.", "It is a traditional practice in all cultures."],
            answer: "Men and women are often impacted by and cope with disasters differently, and have different needs and vulnerabilities."
        },
        {
            question: "Geographic Information Systems (GIS) and remote sensing are technologies used in disaster management for:",
            options: ["Hazard mapping, damage assessment, and planning evacuation routes.", "Sending text message warnings to individuals.", "Managing the financial distribution of aid.", "Providing psychological counseling."],
            answer: "Hazard mapping, damage assessment, and planning evacuation routes."
        },
        {
            question: "For India to achieve its Sustainable Development Goals (SDGs), effective disaster risk management is essential because:",
            options: ["The SDGs are only about managing disasters.", "Disasters can destroy decades of development gains in health, education, and poverty reduction.", "The UN has mandated it as the top priority over all other goals.", "The SDGs and disaster management are completely unrelated topics."],
            answer: "Disasters can destroy decades of development gains in health, education, and poverty reduction."
        },
        {
            question: "The role of the media in a disaster can be both positive and negative. A potential negative role is:",
            options: ["Disseminating official warnings and safety information accurately.", "Spreading unverified rumors or misinformation that can cause panic.", "Raising funds for relief efforts from the public.", "Highlighting the work of emergency responders to boost morale."],
            answer: "Spreading unverified rumors or misinformation that can cause panic."
        },
        {
            question: "During the COVID-19 pandemic, which was notified as a disaster in India, the institutional framework of the ______ was used to manage the national response.",
            options: ["Indian Penal Code", "Disaster Management Act, 2005", "Right to Information Act", "This act was not used for the pandemic response."],
            answer: "Disaster Management Act, 2005"
        },
        {
            question: "A 'cascading disaster' refers to:",
            options: ["A disaster that occurs in an area with many waterfalls.", "A primary disaster that triggers a sequence of secondary disasters (e.g., an earthquake causing a tsunami, which in turn causes a nuclear accident).", "A disaster that happens at the same time every year.", "A very small-scale emergency event."],
            answer: "A primary disaster that triggers a sequence of secondary disasters (e.g., an earthquake causing a tsunami, which in turn causes a nuclear accident)."
        },
        {
            question: "School safety programs that include structural retrofitting of buildings and regular student drills are vital because:",
            options: ["Schools are often used as community shelters during a disaster.", "Children are a particularly vulnerable group.", "It helps educate the next generation on preparedness.", "All of the above."],
            answer: "All of the above."
        },
        {
            question: "Ensuring that emergency shelters are accessible to people with disabilities (e.g., having ramps) is an example of:",
            options: ["An inclusive disaster management practice.", "A cost-cutting measure.", "A security protocol.", "A public relations strategy."],
            answer: "An inclusive disaster management practice."
        },
        {
            question: "Integrating indigenous/traditional knowledge with modern scientific knowledge in disaster planning often leads to:",
            options: ["More culturally appropriate and effective local solutions.", "Confusion and conflicting plans that cannot be implemented.", "The complete exclusion of scientific data.", "Higher overall costs for disaster management."],
            answer: "More culturally appropriate and effective local solutions."
        }
    ]
};

// Quiz elements
const moduleSelect = document.getElementById('module-select');
const startQuizBtn = document.getElementById('start-quiz-btn');
const quizSection = document.getElementById('quiz-section');
const quizDisplay = document.getElementById('quiz-display');
const quizQuestion = document.getElementById('quiz-question');
const quizOptions = document.getElementById('quiz-options');
const quizNextBtn = document.getElementById('quiz-next-btn');

let currentModule = null;
let currentQuestionIndex = 0;
let score = 0;

// Populate module select dropdown
function populateModules() {
    for (const moduleNum in quizData) {
        const option = document.createElement('option');
        option.value = moduleNum;
        option.textContent = `Module ${moduleNum}`;
        moduleSelect.appendChild(option);
    }
}

// Start quiz function
function startQuiz() {
    currentModule = parseInt(moduleSelect.value);
    if (isNaN(currentModule) || !quizData[currentModule]) {
        alert('Please select a valid module.');
        return;
    }
    
    quizSection.style.display = 'block';
    document.getElementById('module-selection').style.display = 'none';
    quizDisplay.style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

// Load a question
function loadQuestion() {
    const questions = quizData[currentModule];
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        quizQuestion.textContent = question.question;
        quizOptions.innerHTML = ''; // Clear previous options

        question.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('quiz-option'); // Add a class for styling
            button.addEventListener('click', () => selectOption(button, option, question.answer));
            quizOptions.appendChild(button);
        });
    } else {
        showResults();
    }
}

// Handle option selection
function selectOption(button, selectedOption, correctAnswer) {
    // Disable all options after selection
    Array.from(quizOptions.children).forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correctAnswer) {
            btn.classList.add('correct');
        } else {
            btn.classList.add('incorrect');
        }
    });

    if (selectedOption === correctAnswer) {
        score++;
    }
}

// Go to next question
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

// Show quiz results (placeholder for now)
function showResults() {
    const totalQuestions = quizData[currentModule].length;
    alert(`Quiz Finished! Your score: ${score} out of ${totalQuestions} (${(score / totalQuestions * 100).toFixed(0)}%)`);
    document.getElementById('module-selection').style.display = 'block'; // Show module selection again
    quizDisplay.style.display = 'none';
}