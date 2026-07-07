const endpoints = [
  "https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=English%20Premier%20League",
  "https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=Spanish%20La%20Liga",
  "https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=Italian%20Serie%20A",
  "https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=French%20Ligue%201",
  "https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=Dutch%20Eredivisie",
  "https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=German%20Bundesliga",
];

let allTeams = [];
let availableTeams = [];
let currentTeam = null;
let score = 0;

async function loadTeams() {
  const responses = await Promise.all(
    endpoints.map((url) => fetch(url).then((res) => res.json())),
  );

  responses.forEach((data) => {
    if (data.teams) allTeams.push(...data.teams);
  });

  startGame();
}

function filterByDifficulty() {
  const difficulty = document.getElementById("difficulty").value;

  return allTeams.filter((team) => {
    const capacity = parseInt(team.intStadiumCapacity) || 0;
    const hasSocials = team.strFacebook || team.strTwitter;

    if (difficulty === "easy") {
      return capacity > 40000 || hasSocials;
    }

    if (difficulty === "medium") {
      return capacity > 15000;
    }

    if (difficulty === "hard") {
      return capacity < 20000 && !hasSocials;
    }
  });
}

function startGame() {
  score = 0;
  document.getElementById("score").innerText = "Score: 0";
  document.getElementById("result").innerHTML = "";

  availableTeams = filterByDifficulty();
  nextTeam();
}

function nextTeam() {
  document.getElementById("answer").value = "";
  document.getElementById("result").innerHTML = "";

  if (availableTeams.length === 0) {
    alert("¡No more teams in this difficulty");
    return;
  }

  const index = Math.floor(Math.random() * availableTeams.length);
  currentTeam = availableTeams.splice(index, 1)[0];

  document.getElementById("logo").src = currentTeam.strBadge;
}

function checkAnswer() {
  const userAnswer = document
    .getElementById("answer")
    .value.trim()
    .toLowerCase();
  const correctAnswer = currentTeam.strTeam.toLowerCase();

  if (userAnswer === correctAnswer) {
    score++;
    document.getElementById("result").innerHTML = "✔️";
  } else {
    document.getElementById("result").innerHTML =
      "❌<br><small>" + currentTeam.strTeam + "</small>";
  }

  document.getElementById("score").innerText = "Points: " + score;

  setTimeout(nextTeam, 1500);
}

loadTeams();
