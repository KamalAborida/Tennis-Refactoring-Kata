import { TennisGame } from "./TennisGame";

export class TennisGame1 implements TennisGame {
  private m_score1: number = 0;
  private m_score2: number = 0;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  wonPoint(playerName: string): void {
    this.addAPointToPlayer(playerName);
  }

  private addAPointToPlayer(playerName: string) {
    if (playerName === "player1") this.m_score1 += 1;
    else this.m_score2 += 1;
  }

  getScore(): string {
    let score: string = "";
    let tempScore: number = 0;
    const areScoresEqual = this.m_score1 === this.m_score2;
    const isAScoreMoreThan4 = this.m_score1 >= 4 || this.m_score2 >= 4;
    
    if (areScoresEqual) {
      const equalScoreValue = this.m_score1 || this.m_score2 || 0;
      score = this.generateEqualScorePhrase(score, equalScoreValue);
    } else if (isAScoreMoreThan4) {
      score = this.generateMoreThan4ScorePhrase(score);
    } else {
      ({ tempScore, score } = this.generateStandardScorePhrase(tempScore, score));
    }

    return score;
  }

  private generateStandardScorePhrase(tempScore: number, score: string) {
    for (let i = 1; i < 3; i++) {
      if (i === 1) tempScore = this.m_score1;
      else {
        score += "-";
        tempScore = this.m_score2;
      }

      switch (tempScore) {
        case 0:
          score += "Love";
          break;
        case 1:
          score += "Fifteen";
          break;
        case 2:
          score += "Thirty";
          break;
        case 3:
          score += "Forty";
          break;
      }
    }
    return { tempScore, score };
  }

  private generateMoreThan4ScorePhrase(score: string) {
    const minusResult: number = this.m_score1 - this.m_score2;
    if (minusResult === 1) score = "Advantage player1";
    else if (minusResult === -1) score = "Advantage player2";
    else if (minusResult >= 2) score = "Win for player1";
    else score = "Win for player2";
    return score;
  }

  private generateEqualScorePhrase(score: string, equalScoreValue: number) {
    switch (equalScoreValue) {
      case 0:
        score = "Love-All";
        break;
      case 1:
        score = "Fifteen-All";
        break;
      case 2:
        score = "Thirty-All";
        break;
      default:
        score = "Deuce";
        break;
    }
    return score;
  }
}
