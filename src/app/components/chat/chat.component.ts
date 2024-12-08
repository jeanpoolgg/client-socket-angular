import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {
  texto = '';
  mensajeSubscription!: Subscription;
  mensajes: any[] = [];
  elemento!: HTMLElement;

  constructor(
    public _chatService: ChatService
  ) {}

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes') as HTMLElement;

    this.mensajeSubscription = this._chatService.getMessages().subscribe(msg => {
      // console.log(msg);
      this.mensajes.push(msg);

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });

  }

  ngOnDestroy(): void {
    this.mensajeSubscription.unsubscribe();
  }

  enviar() {

    if (this.texto.trim().length === 0) {
      return;
    }

    this._chatService.sendMessage(this.texto);
    this.texto = '';

  };
}
