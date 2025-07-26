import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/service/product.service';
import { IProduct } from '../../core/interface/iproduct.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchandsortService } from '../../core/service/searchandsort.service';
import { CartService } from '../../core/service/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly _ProductService = inject(ProductService);
  private readonly _SearchandsortService = inject(SearchandsortService);
  private readonly _CartService = inject(CartService);

  allProducts: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  sortOption: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;


  ngOnInit() {
    this._ProductService.getAllProducts().subscribe({
      next: (products) => {
        this.allProducts = products.map(p => ({
          ...p,
          rating: {
            rate: Math.floor(Math.random() * 5) + 1, 
            count: Math.floor(Math.random() * 100) + 1
          }
        }));

        this.filteredProducts = [...this.allProducts];
        this.errorMessage = null;
      },
      error: (err) => {
        console.error('API Error:', err);
        this.errorMessage = '⚠️ Failed to load products. Please try again later.';
      }
    });

    this._SearchandsortService.searchTerm$.subscribe((term: string) => {
      this.applyFilters(term, this.sortOption);
    });
  }

addToCart(product: IProduct, event: Event) {
  event.stopPropagation();

  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    this.successMessage = '⚠️ Please log in or sign up first.';
    setTimeout(() => this.successMessage = null, 3000); 
    return;
  }

  const user = JSON.parse(storedUser);
  const products = [{ productId: product.id, quantity: 1 }];

  this._CartService.createCart(products).subscribe({
    next: () => {
      this.successMessage = '✅ Product added to cart!';
      setTimeout(() => this.successMessage = null, 3000);

      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existing = cart.find((p: any) => p.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    },
    error: () => {
      this.successMessage = '❌ Failed to add product.';
      setTimeout(() => this.successMessage = null, 3000);
    }
  });
}

  onSortChange() {
    this.applyFilters('', this.sortOption);
  }

  applyFilters(term?: string, sortOption?: string) {
    let products = [...this.allProducts];

    if (term && term.trim() !== '') {
      products = products.filter(p => p.title.toLowerCase().includes(term.toLowerCase()));
    }

    if (sortOption === 'priceAsc') products.sort((a, b) => a.price - b.price);
    if (sortOption === 'priceDesc') products.sort((a, b) => b.price - a.price);
    if (sortOption === 'nameAsc') products.sort((a, b) => a.title.localeCompare(b.title));
    if (sortOption === 'nameDesc') products.sort((a, b) => b.title.localeCompare(a.title));

    this.filteredProducts = products;
  }
}
