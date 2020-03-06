import { Component } from '@angular/core';
import { SelectionEventModel } from './interfaces/selection-event-model';
import { DogsService } from './services/dogs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dander';

  constructor(private dogsService: DogsService) {}

  public onChoiceMade(event: SelectionEventModel) {
    console.warn(event);
  }

  public onLoadCards() {
    this.dogsService.reset();
  }
}
