import { Component, OnInit} from '@angular/core';
import { ChatService } from './services/chat.service';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(
    public wsService: WebsocketService,
    public chatService: ChatService
  ){}

  ngOnInit(){
    this.chatService.getMessagesPrivate().subscribe(msg => {
      console.log(msg);
    });
  }

}
