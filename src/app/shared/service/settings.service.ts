import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { defaults, AppSettings } from './settings';


@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private notice$ = new Subject<any>();

  private options = defaults;

  get notice(): Observable<any> {
    return this.notice$.asObservable();
  }
  get notify(): Observable<any> {
    return this._notify$.asObservable();
  }
  private _notify$ = new BehaviorSubject<any>({});
  setLayout(options?: AppSettings): AppSettings {
    this.options = Object.assign(defaults, options);
    return this.options;
  }

  setNavState(type: string, value: boolean) {
    this.notice$.next({ type, value } as any);
  }

  getOptions(): AppSettings {
    return this.options;
  }
    setLanguage(lang: string) {
    this.options.language = lang;
    this._notify$.next({ lang });
  }
}
