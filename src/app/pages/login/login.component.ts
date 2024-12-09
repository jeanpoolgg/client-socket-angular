import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  nombre = '';

  constructor(
    public _wsService: WebsocketService,
    private router: Router
  ) { }

  ngOnInit(){

  }

  ingresar(){
    this._wsService.loginWS(this.nombre).then(() => {
      console.log("Login exitoso");
      this.router.navigateByUrl('/mensajes');
    });
  }
}
