import { TennisGame } from "./TennisGame";
import { ScoreEnums } from "./helpers/ScoreEnums";

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
      return score;
    }

    if (isAScoreMoreThan4) {
      score = this.generateMoreThan4ScorePhrase(score);
      return score;
    }

    score = this.generateStandardScorePhrase(tempScore, score);
    return score;
  }

  private generateStandardScorePhrase(tempScore: number, score: string) {
    const players = [this.player1Name, this.player2Name];

    players.forEach((player, index) => {
      if (index === 0) tempScore = this.m_score1;

      if (index === 1) {
        score += "-";
        tempScore = this.m_score2;
      }

      switch (tempScore) {
        case 0:
          score += ScoreEnums.LOVE;
          break;
        case 1:
          score += ScoreEnums.FIFTEEN;
          break;
        case 2:
          score += ScoreEnums.THIRTY;
          break;
        case 3:
          score += ScoreEnums.FORTY;
          break;
      }
    });

    return score;
  }

  private generateMoreThan4ScorePhrase(score: string) {
    const minusResult: number = this.m_score1 - this.m_score2;
    switch (minusResult) {
      case 1:
        return ScoreEnums.ADVANTAGE_PLAYER1;
      case -1:
        return ScoreEnums.ADVANTAGE_PLAYER2;
      default:
        if (minusResult >= 2) return ScoreEnums.WIN_FOR_PLAYER1;
        return ScoreEnums.WIN_FOR_PLAYER2;
    }
  }

  private generateEqualScorePhrase(score: string, equalScoreValue: number) {
    switch (equalScoreValue) {
      case 0:
        score = ScoreEnums.LOVE_ALL;
        break;
      case 1:
        score = ScoreEnums.FIFTEEN_ALL;
        break;
      case 2:
        score = ScoreEnums.THIRTY_ALL;
        break;
      default:
        score = ScoreEnums.DEUCE;
        break;
    }
    return score;
  }
}
