module.exports.create_ourusers_table_query = 'CREATE TABLE ourusers(id int AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, roles VARCHAR(255) NOT NULL, PRIMARY KEY(id))';
module.exports.create_coaches_table_query = 'CREATE TABLE coaches(coach_id int AUTO_INCREMENT, coach_name VARCHAR(255) NOT NULL, age int, salary int, PRIMARY KEY(coach_id))';
module.exports.create_teams_table_query = 'CREATE TABLE teams(team_id int AUTO_INCREMENT, team_name VARCHAR(255) NOT NULL, coach_id int NOT NULL, PRIMARY KEY(team_id), FOREIGN KEY(coach_id) references coaches(coach_id))';
module.exports.create_players_table_query='CREATE TABLE players(player_id int AUTO_INCREMENT, player_name VARCHAR(255) NOT NULL, age int, coach_id int NOT NULL, team_id int NOT NULL, PRIMARY KEY(player_id), FOREIGN KEY(coach_id) references coaches(coach_id), FOREIGN KEY(team_id) references teams(team_id))';