class Franchise {
    constructor(name, position) {
      this.name = name;
      this.position = position;
    }
    describe() {
      return `${this.name} plays ${this.position}.`;
    }
  }

  class Team {
    constructor(name) {
      this.name = name;
      this.players = [];
    }

    addPlayer(player) {
        if (player instanceof Franchise) {
            this.players.push(player);
        } else {
            throw new Error(`Invalid: ${player}`);
        }
    }
   
    describe() {
      return `${this.name} has ${this.players.length} players.`;
    }
  }

  class Menu {
    constructor() {
      this.teams = [];
      this.selectedTeam = null;
    }

    start() {
      let selection = this.showMainMenuOptions();

      while (selection != 0) {
        switch (selection) {
           case "1":
            this.createTeam();
            break;
           case "2":
            this.viewTeam();
            break;
           case "3":
            this.deleteTeam();
            break;
           case "4":
            this.displayTeams();
            break;
           default:
            selection = 0;
        }
        selection = this.showMainMenuOptions();
      }
      
      alert('Goodbye!');
    }

    showMainMenuOptions() {
      return prompt(`
        0) Exit Menu
        1) Create NFL team
        2) View created NFL team
        `);
    }

    showTeamMenuOptions(teamInfo) {
      return prompt(`
         0) back
         1) create player
         2) delete player
         --------------------------
         ${teamInfo}
        `);
    }

    createTeam() {
      let name = prompt("Enter name for new NFL team:");
      this.teams.push(new Team(name));
    }

    viewTeam() {
      let index = prompt("Enter the position of the team you wish to view, starting from 0:");
      if (index > -1 && index < this.teams.length) {
        this.selectedTeam = this.teams[index];
        let description = "NFL team Name: " + this.selectedTeam.name + "\n";

        for (let i = 0; i < this.selectedTeam.players.length; i++) {
          description +=
            i +
            ") " +
            this.selectedTeam.players[i].name +
            " - " +
            this.selectedTeam.players[i].position +
            "\n";
        }

        let selection = this.showTeamMenuOptions(description);
        switch (selection) {
          case "1":
            this.createPlayer();
            break;
          case "2":
            this.deletePlayer();
        }
      }
    }

    deletedTeam() {
        let index = prompt("Enter the NFL team you wish to delete:");
        if (index > -1 && index < this.teams.length) {
            this.teams.splice(index, 1);
        }
    }

    createPlayer() {
        let name = prompt('Enter name for new player:');
        let position = prompt('Enter position for new player:');
        this.selectedTeam.players.push(new Franchise(name, position));
    }

    deletePlayer() {
        let index = prompt('Enter the position of the player you wish to delete, starting from 0:');
        if(index > -1 && index < this.selectedTeam.players.length) {
            this.selectedTeam.players.splice(index, 1);
        }
    }
  }

  let menu = new Menu();
  menu.start();
