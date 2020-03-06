import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectionEventModel } from '../interfaces/selection-event-model';
import { CardModel } from '../interfaces/card-model';
import { DogsService } from '../services/dogs.service';
import { CardChoices } from '../enums/card-choices.enum';

@Component({
  selector: 'app-card-stack',
  templateUrl: './card-stack.component.html',
  styleUrls: ['./card-stack.component.scss']
})
export class CardStackComponent implements OnInit {
  @Output() public choiceMade = new EventEmitter<SelectionEventModel>();
  public cards: CardModel[] = [];

  constructor(private dogsService: DogsService) { }

  ngOnInit() {
    this.dogsService.dogs$.subscribe(dogs => this.cards = dogs);
  }

  public onCardChoiceMade(choice: CardChoices, card: CardModel) {
    const selection: SelectionEventModel = { card, choice };
    this.choiceMade.emit(selection);
    setTimeout(() => {
      this.cards = this.cards.filter(_card => _card.breed !== card.breed);
    }, 300);
  }

}
