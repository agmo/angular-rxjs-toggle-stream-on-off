import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { fromEvent, interval, Observable } from 'rxjs';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('input') input: { nativeElement: FromEventTarget<unknown>; };

  checked: Observable<any>;
  count = 0;
  source: Observable<number>;

  ngAfterViewInit(): void {
    this.source = interval(100);

    this.checked = fromEvent(this.input.nativeElement, 'change').pipe(
      map((e: any) => e.target.checked)
    );

    this.checked.pipe(
      filter(isChecked => !!isChecked),
      switchMap(() => this.source.pipe(
        takeUntil(this.checked))
      )
    ).subscribe((count: number) => this.count = count);
  }
}
