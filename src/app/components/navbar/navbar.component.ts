import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchandsortService } from '../../core/service/searchandsort.service';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private readonly _SearchandsortService = inject(SearchandsortService);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  isMenuOpen = false;
  isDark = false;


  onSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this._SearchandsortService.setSearchTerm(term);

    if (term.trim() !== '') {
      this._Router.navigate(['/products']);
    }
  }


  toggleDarkMode() {
    this.isDark = !this.isDark;
    const root = document.documentElement;
    if (this.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  logout() {
    this._AuthService.logout();
    this._Router.navigate(['/signup']); 
  }

  get currentUser() {
    return this._AuthService.getCurrentUser();
  }
}
