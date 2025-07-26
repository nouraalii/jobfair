import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';


@Component({
  selector: 'app-blank-layout',
  imports: [NavbarComponent,RouterOutlet,FooterComponent],
  templateUrl: './blank-layout.html',
  styleUrl: './blank-layout.scss'
})
export class BlankLayout {

}
