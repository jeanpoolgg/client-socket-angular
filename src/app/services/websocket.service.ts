import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;
  public usuario: Usuario | null = null;

  constructor(
    private socket: Socket,
    private router: Router

  ) {
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus(){
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.cargarStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  emit(evento: string, payload?: any, callback?: Function){
    this.socket.emit(evento, payload, callback);
  }

  listen(evento: string){
    return this.socket.fromEvent(evento);
  }

  getUsuario() {
    return this.usuario;
  }

  loginWS(nombre: string) {
    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', { nombre }, (resp:any) => {
        if (resp) {
          this.usuario = new Usuario(nombre);
          this.guardarStorage();
          resolve(resp);
        } else {
          reject('Error al configurar el usuario');
        }
      });
    });
  }

  logoutWS(){
    this.usuario = null;
    localStorage.removeItem('usuario');

    const payload = {
      nombre: 'sin-nombre'
    };

    this.emit('configurar-usuario', payload, () => {});
    this.router.navigateByUrl('');
  }


  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const parsedUsuario = JSON.parse(usuarioGuardado);
      // Verificar que parsedUsuario sea un objeto y tenga la propiedad nombre
      if (parsedUsuario && parsedUsuario.nombre) {
        this.usuario = new Usuario(parsedUsuario.nombre);
        this.loginWS(this.usuario.nombre).catch(err => {
          console.error(err);
        });
      }
    }
  }
}
