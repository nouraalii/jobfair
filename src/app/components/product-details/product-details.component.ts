import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/service/product.service';
import { IProduct } from '../../core/interface/iproduct.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
product!: IProduct;
  productCode = '5448WR';
  features = ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Duis non eros dapibus', 'Iaculis ligula vitae'];

  sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  selectedSize = 'M';

  quantity = 1;
  private readonly _ProductService = inject(ProductService)

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this._ProductService.getProductDetails(id).subscribe((data: IProduct) => {
      this.product = data;
    });
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
  }

}
