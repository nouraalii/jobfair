import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../core/interface/iproduct.interface';
import { ProductService } from '../../core/service/product.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/service/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,                  
  imports: [CommonModule,RouterLink],            
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly _ProductService = inject(ProductService);
  private readonly _CartService = inject(CartService);
  featuredProducts: IProduct[] = [];
  allProducts: IProduct[] = [];

 errorMessage: string | null = null;
 successMessage: string | null = null;



 ngOnInit() {
  this._ProductService.getAllProducts().subscribe({
    next: (products: IProduct[]) => {
      // ✅ Add random ratings to each product
      const productsWithRatings = products.map(p => ({
        ...p,
        rating: {
          rate: Math.floor(Math.random() * 5) + 1,
          count: Math.floor(Math.random() * 100) + 1
        }
      }));

      const categoriesSeen = new Set<string>();
      this.featuredProducts = productsWithRatings.filter((p: IProduct) => {
        if (!categoriesSeen.has(p.category)) {
          categoriesSeen.add(p.category);
          return true;
        }
        return false;
      });

      this.allProducts = productsWithRatings;
      this.errorMessage = null; 
    },
    error: (err) => {
      console.error('API Error:', err);
      this.errorMessage = '⚠️ Unable to load products. Please refresh or try again later.';
    }
  });
}

addToCart(product: IProduct, event: Event) {
  event.stopPropagation();

  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    this.successMessage = '⚠️ Please log in or sign up first.';
    setTimeout(() => this.successMessage = null, 3000); // Hide after 3s
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


}
