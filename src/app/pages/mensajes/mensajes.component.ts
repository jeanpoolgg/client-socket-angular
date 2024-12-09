import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.css'
})
export class MensajesComponent {

  public usuarioNombre: string | null;

  constructor(
    public wsService: WebsocketService
  ) {
    const usuario = this.wsService.getUsuario();
    this.usuarioNombre = usuario ? usuario.nombre : null;
  }

  salir() {
    this.wsService.logoutWS();
  }



}
