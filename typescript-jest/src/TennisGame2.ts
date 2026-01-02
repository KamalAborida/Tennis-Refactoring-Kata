import { TennisGame } from "./TennisGame";

export class TennisGame2 implements TennisGame {
  P1point: number = 0;
  P2point: number = 0;

  P1res: string = "";
  P2res: string = "";

  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  getScore(): string {
    let score: string = "";

    if (this.isXAll()) {
      score = this.generateXAllScore();
    }

    if (this.isDeuce()) score = "Deuce";

    if (this.isP2LoveAndP1NotLove()) {
      score = this.generateP2LoveAndP1NotLoveScore(score);
    }

    if (this.isP1LoveAndP2NotLove()) {
      score = this.generateP1LoveAndP2NotLoveScore(score);
    }

    if (this.P1point > this.P2point && this.P1point < 4) {
      if (this.P1point === 2) this.P1res = "Thirty";
      if (this.P1point === 3) this.P1res = "Forty";
      if (this.P2point === 1) this.P2res = "Fifteen";
      if (this.P2point === 2) this.P2res = "Thirty";
      score = this.P1res + "-" + this.P2res;
    }

    if (this.P2point > this.P1point && this.P2point < 4) {
      if (this.P2point === 2) this.P2res = "Thirty";
      if (this.P2point === 3) this.P2res = "Forty";
      if (this.P1point === 1) this.P1res = "Fifteen";
      if (this.P1point === 2) this.P1res = "Thirty";
      score = this.P1res + "-" + this.P2res;
    }

    if (this.isPlayer1Advantage()) {
      score = "Advantage player1";
    }

    if (this.isPlayer2Advantage()) {
      score = "Advantage player2";
    }

    if (this.isPlayer1WinCondition()) {
      score = "Win for player1";
    }

    if (this.isPlayer2WinCondition()) {
      score = "Win for player2";
    }

    return score;
  }

  private isPlayer2Advantage() {
    return this.P2point > this.P1point && this.P1point >= 3;
  }

  private isPlayer1Advantage() {
    return this.P1point > this.P2point && this.P2point >= 3;
  }

  private isPlayer2WinCondition() {
    return (
      this.P2point >= 4 && this.P1point >= 0 && this.P2point - this.P1point >= 2
    );
  }

  private isPlayer1WinCondition() {
    return (
      this.P1point >= 4 && this.P2point >= 0 && this.P1point - this.P2point >= 2
    );
  }

  private generateP2LoveAndP1NotLoveScore(score: string) {
    if (this.P1point === 1) this.P1res = "Fifteen";
    if (this.P1point === 2) this.P1res = "Thirty";
    if (this.P1point === 3) this.P1res = "Forty";

    this.P2res = "Love";
    score = this.P1res + "-" + this.P2res;
    return score;
  }

  private generateP1LoveAndP2NotLoveScore(score: string) {
    if (this.P2point === 1) this.P2res = "Fifteen";
    if (this.P2point === 2) this.P2res = "Thirty";
    if (this.P2point === 3) this.P2res = "Forty";

    this.P1res = "Love";
    score = this.P1res + "-" + this.P2res;
    return score;
  }

  private isDeuce() {
    return this.arePointsEqual() && this.P1point >= 3;
  }

  private generateXAllScore() {
    let score: string = "";
    if (this.P1point === 0) score = "Love";
    if (this.P1point === 1) score = "Fifteen";
    if (this.P1point === 2) score = "Thirty";
    score += "-All";
    return score;
  }

  private isXAll() {
    return this.arePointsEqual() && this.P1point < 3;
  }

  private isP2LoveAndP1NotLove() {
    return this.P1point > 0 && this.P2point === 0;
  }

  private isP1LoveAndP2NotLove() {
    return this.P2point > 0 && this.P1point === 0;
  }

  private arePointsEqual() {
    return this.P1point === this.P2point;
  }

  SetP1Score(score: number): void {
    for (let i = 0; i < score; i++) {
      this.P1Score();
    }
  }

  SetP2Score(score: number): void {
    for (let i = 0; i < score; i++) {
      this.P2Score();
    }
  }

  P1Score(): void {
    this.P1point++;
  }

  P2Score(): void {
    this.P2point++;
  }

  wonPoint(player: string): void {
    if (player === "player1") this.P1Score();
    else this.P2Score();
  }
}
