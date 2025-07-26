import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchandsortService {
  private searchTermSource = new BehaviorSubject<string>('');  
  searchTerm$ = this.searchTermSource.asObservable();

  private sortOptionSource = new BehaviorSubject<string>('');  
  sortOption$ = this.sortOptionSource.asObservable();

  setSearchTerm(term: string) {
    this.searchTermSource.next(term);
  }

  setSortOption(option: string) {
    this.sortOptionSource.next(option);}

}
