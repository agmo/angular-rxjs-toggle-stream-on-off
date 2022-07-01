import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, interval, Observable } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-method-one',
  templateUrl: './method-one.component.html',
  styleUrls: ['./method-one.component.scss']
})
export class MethodOneComponent implements AfterViewInit {
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
