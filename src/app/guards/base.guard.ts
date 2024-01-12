import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface IBaseGuard {
  isValid():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>;
}
