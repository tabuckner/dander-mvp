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
  transitionInProgress: boolean;
  isMoving: boolean = false;

  constructor(private renderer: Renderer2,
    private elRef: ElementRef,
    private image: DogImageService) { }

  ngOnInit() {
    this.image.getImageUrl(this.card.imageUrl).subscribe(image => this.imageUrl = image);
  }

  public ngAfterViewInit() {
    this.moveOutWidth = document.documentElement.clientWidth * 1.5;
  }

  handlePan(event) {

    if (event.deltaX === 0 || (event.center.x === 0 && event.center.y === 0)) {
      return;
    }

    // if (this.transitionInProgress) {
    //   this.handleShift();
    // }

    // this.renderer.addClass(this.targetEl, 'moving');
    this.isMoving = true;

    // if (event.deltaX > 0) { this.toggleChoiceIndicator(false, true) }
    // if (event.deltaX < 0) { this.toggleChoiceIndicator(true, false) }

    const xMulti = event.deltaX * 0.03;
    const yMulti = event.deltaY / 80;
    const rotate = xMulti * yMulti;

    this.renderer.setStyle(
      this.targetEl,
      'transform',
      'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)'
    );
  }

  handlePanEnd(event) {

    // this.toggleChoiceIndicator(false,false);

    // this.renderer.removeClass(this.targetEl, 'moving');
    this.isMoving = false;

    const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
    if (keep) {

      this.renderer.setStyle(this.targetEl, 'transform', '');
      // this.shiftRequired = false;

    } else {

      const endX = Math.max(Math.abs(event.velocityX) * this.moveOutWidth, this.moveOutWidth);
      const toX = event.deltaX > 0 ? endX : -endX;
      const endY = Math.abs(event.velocityY) * this.moveOutWidth;
      const toY = event.deltaY > 0 ? endY : -endY;
      const xMulti = event.deltaX * 0.03;
      const yMulti = event.deltaY / 80;
      const rotate = xMulti * yMulti;

      this.renderer.setStyle(
        this.targetEl,
        'transform',
        'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)'
        );

      // this.shiftRequired = true;

      const heart = !!(event.deltaX > 0);
      heart ? this.onLike() : this.onDislike();
    }
    this.transitionInProgress = true;
  }

  public onLike() {
    this.animateCard(CardChoices.like);
    this.selectionMade.emit(CardChoices.like);
  }

  public onDislike() {
    this.animateCard(CardChoices.dislike);
    this.selectionMade.emit(CardChoices.dislike);
  }

  private animateCard(choice: CardChoices) {
    if (choice === CardChoices.like) {
      this.renderer.setStyle(
        this.targetEl,
        'transform',
        'translate(' + this.moveOutWidth + 'px, -100px) rotate(-30deg)'
      );
      // this.toggleChoiceIndicator(false, true);
      // this.emitChoice(heart, this.cards[0]);
    } else {
      this.renderer.setStyle(
        this.targetEl,
        'transform',
        'translate(-' + this.moveOutWidth + 'px, -100px) rotate(30deg)');
      // th
      // is.toggleChoiceIndicator(true, false);
      // this.emitChoice(heart, this.cards[0]);
    }
  }


  private get targetEl(): any {
    return this.elRef.nativeElement.querySelector('.mat-card');
  }
}
