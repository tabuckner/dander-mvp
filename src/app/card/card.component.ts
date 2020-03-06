import { Component, OnInit, Input, Output, EventEmitter, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { CardModel } from '../interfaces/card-model';
import { SelectionEventModel } from '../interfaces/selection-event-model';
import { CardChoices } from '../enums/card-choices.enum';
import { DogImageService } from '../services/dog-image.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit {
  @Input() public card: CardModel;
  @Output() public selectionMade = new EventEmitter<CardChoices>();
  public imageUrl: string;
  moveOutWidth: number;

  constructor(private renderer: Renderer2,
              private elRef: ElementRef,
              private image: DogImageService) { }

  ngOnInit() {
    this.image.getImageUrl(this.card.imageUrl).subscribe(image => this.imageUrl = image);
  }


  public onLike() {
    this.animateCard(CardChoices.like);
    this.selectionMade.emit(CardChoices.like);
  }

  public ngAfterViewInit() {
    this.moveOutWidth = document.documentElement.clientWidth * 1.5;
  }

  public onDislike() {
    this.animateCard(CardChoices.dislike);
    this.selectionMade.emit(CardChoices.dislike);
  }

  private animateCard(choice: CardChoices) {
    if (choice === CardChoices.like) {
      this.renderer.setStyle(
        this.elRef.nativeElement.querySelector('.mat-card'),
        'transform',
        'translate(' + this.moveOutWidth + 'px, -100px) rotate(-30deg)'
      );
      // this.toggleChoiceIndicator(false, true);
      // this.emitChoice(heart, this.cards[0]);
    } else {
      this.renderer.setStyle(
        this.elRef.nativeElement.querySelector('.mat-card'),
        'transform',
        'translate(-' + this.moveOutWidth + 'px, -100px) rotate(30deg)');
      // th
      // is.toggleChoiceIndicator(true, false);
      // this.emitChoice(heart, this.cards[0]);
    }
  }

}
