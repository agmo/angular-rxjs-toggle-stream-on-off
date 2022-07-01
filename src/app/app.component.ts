import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { fromEvent, interval, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('input') input: ElementRef | undefined;

  checked: Observable<any> | undefined;
  count = 0;
  source: Observable<number> = interval(100);

  ngAfterViewInit(): void {
    this.checked = fromEvent(this.input!.nativeElement, 'change').pipe(
      map((e: any) => e.target.checked)
    );

    this.checked.pipe(
      filter(isChecked => !!isChecked),
      switchMap(() => this.source.pipe(
        takeUntil(this.checked!))
      )
    ).subscribe((count: number) => this.count = count);
  }
}
