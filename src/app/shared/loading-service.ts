/**
 * Useful when a service need to indicate to the components or other
 * service that is using it when its loading or making some network operations
 *
 * They can subscribe and know when everything is done
 */

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';

export class LoadingService {
  /**
   * To indicate when we are loading
   */
  protected loading: BehaviorSubject<boolean>;

  /**
   * Set the behavior subject to indicate that we are loading
   */
  imLoading() {
    this.loading = new BehaviorSubject<boolean>(true);
  }

  /**
   * The wait finished
   */
  loadingDone() {
    // Indicate that we are not longer loading
    this.loading.next(false);
    // Close the subject
    this.loading.complete();
  }

  /**
   * Observable to indicate that we are loading or fetching users.
   * This will emit something only when finish to load
   *
   * @returns {Observable<boolean>} To subscribe and know it loads
   */
  isLoading(): Observable<boolean> {
    return this.loading.asObservable()
      // Emit something only when it loads
      .filter((res: boolean) => res === false);
  }
}