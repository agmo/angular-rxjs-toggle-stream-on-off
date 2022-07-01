import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MethodTwoService } from './method-two.service';
import { filter, finalize, map, mergeMap, repeat, repeatWhen, retryWhen, takeUntil } from 'rxjs/operators';
import { fromEvent, Observable, throwError, timer } from 'rxjs';

// Source: https://www.learnrxjs.io/learn-rxjs/operators/error_handling/retrywhen
export const genericRetryStrategy = ({
                                       maxRetryAttempts = 3,
                                       scalingDuration = 1000,
                                       excludedStatusCodes = []
                                     }: {
  maxRetryAttempts?: number,
  scalingDuration?: number,
  excludedStatusCodes?: number[]
} = {}) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      // if maximum number of retries have been met
      // or response is a status code we don't wish to retry, throw error
      if (
        retryAttempt > maxRetryAttempts ||
        excludedStatusCodes.find(e => e === error.status)
      ) {
        return throwError(error);
      }
      console.log(
        `Attempt ${retryAttempt}: retrying in ${retryAttempt *
        scalingDuration}ms`
      );
      // retry after 1s, 2s, etc...
      return timer(retryAttempt * scalingDuration);
    }),
    finalize(() => console.log('We are done!'))
  );
};

@Component({
  selector: 'app-method-two',
  templateUrl: './method-two.component.html',
  styleUrls: ['./method-two.component.scss']
})
export class MethodTwoComponent implements AfterViewInit {
  @ViewChild('input') input: ElementRef | undefined;

  checked: Observable<any> | undefined;
  joke$: Observable<{ value: string; }> | undefined;

  private durationInMs = 1000 * 30;

  constructor(private methodTwoService: MethodTwoService) {
  }

  ngAfterViewInit(): void {
    this.checked = fromEvent(this.input!.nativeElement, 'change').pipe(
      map((e: any) => e.target.checked)
    );
    this.joke$ = this.methodTwoService.joke$.pipe(
      // repeat will fetch new jokes every n milliseconds while the stream is active
      repeat({delay: this.durationInMs}),
      // takeUntil will stop the stream
      takeUntil(this.checked.pipe(filter(isChecked => isChecked))),
      // repeatWhen will resubscribe to resume the stream
      repeatWhen(() => this.checked!.pipe(filter(isChecked => !isChecked))),
      // retryWhen will reattempt to fetch jokes in case of an error
      retryWhen(genericRetryStrategy({
        maxRetryAttempts: 10,
        scalingDuration: this.durationInMs
      }))
    );
  }
}
