import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit {

  usuariosActivosObs!: Observable<any>;

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit(): void {
    // Emitir el obtener usuarios
    this.chatService.emitirUsuariosActivos();

    this.usuariosActivosObs = this.chatService.getUsuariosActivos();
  }
}
