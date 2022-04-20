import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  playerMarbles = 10;
  partnerMarbles = 10;
  message = '';
  wager = 1;
  gameover = false;

  reset = () => {
    this.playerMarbles = 10;
    this.partnerMarbles = 10;
    this.message = '';
    this.wager = 1;
    this.gameover = false;
  };

  gamble = (playerChoice) => {
    const partnerHand = Math.floor(Math.random() * this.partnerMarbles + 1);
    console.log('wager', this.wager);
    switch (true) {
      case !this.isEven(partnerHand) && playerChoice === 'odd':
      case this.isEven(partnerHand) && playerChoice === 'even':
        this.message =
          'won this round, your partner has ' +
          partnerHand +
          ' marbles in their hand';
        this.playerMarbles += this.wager;
        this.partnerMarbles -= this.wager;
        this.partnerMarbles =
          this.partnerMarbles <= 0 ? 0 : this.partnerMarbles;
        this.playerMarbles = this.playerMarbles >= 20 ? 20 : this.playerMarbles;
        break;
      case !this.isEven(partnerHand) && playerChoice === 'even':
      case this.isEven(partnerHand) && playerChoice === 'odd':
        this.message =
          'lost this round, your partner has ' +
          partnerHand +
          ' marbles in their hand';
        this.playerMarbles -= this.wager;
        this.partnerMarbles += this.wager;
        this.wager =
          this.wager > this.playerMarbles ? this.playerMarbles : this.wager;
        this.playerMarbles = this.playerMarbles <= 0 ? 0 : this.playerMarbles;
        this.partnerMarbles =
          this.partnerMarbles >= 20 ? 20 : this.partnerMarbles;
        break;
      default:
    }
    if (this.playerMarbles === 0 || this.partnerMarbles === 0) {
      this.message = 'game over';
      this.gameover = true;
    }
  };

  updateWager = (event) => {
    this.wager = parseInt(event.target.value);
  };

  isEven = (number) => number % 2 === 0;
}
