function getRandomValue(min, max) {
  // returns random integer number between min and max
  return Math.floor(Math.random() * (max - min)) + min;
}

Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
    };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;

      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;

      // the monster will attack the player right after the player attacks the monster
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
    },
    specialAttackMonster() {
      this.currentRound++;

      // deals more damage but is only available every 3 rounds
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;

      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;

      const healValue = getRandomValue(8, 20);
      this.playerHealth + healValue > 100
        ? (this.playerHealth = 100)
        : (this.playerHealth += healValue);

      this.attackPlayer();
    },
  },
}).mount("#game");
