import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat, MessageType } from '../../models';
import * as moment from 'moment';
import { AlertController} from 'ionic-angular';
@Component({
 templateUrl: 'chats.html'
})
export class ChatsPage {
 chats: Observable<Chat[]>;
 constructor( public alertCtrl: AlertController) {
  this.chats = this.findChats();
 }

 removeChat(chat: Chat): void {
  this.chats = this.chats.map((chatsArray: Chat[]) => {
   const chatIndex = chatsArray.indexOf(chat);
   if (chatIndex !== -1) {
    chatsArray.splice(chatIndex, 1);
   }

   return chatsArray;
  });
 }

  confirmaDelete(event, chat) {  
    let alert = this.alertCtrl.create({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que quer excluir <b>' + chat.title + '</b>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            this.removeChat(chat);
          }
        }
      ]

    });
    alert.present();


    event.stopPropagation();
  }


 private findChats(): Observable<Chat[]> {

  return Observable.of([
   {
    _id: '0',
    title: 'Sala 1',
    picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',

    lastMessage: {
     content: 'oi pai',
     createdAt: moment().subtract(1, 'hours').toDate(),
     type: MessageType.TEXT
    }
   },
   {
    _id: '1',
    title: 'Sala 2',
    picture: 'https://randomuser.me/api/portraits/thumb/lego/1.jpg',

    lastMessage: {
     content: 'Oi filho',
     createdAt: moment().subtract(2, 'hours').toDate(),
     type: MessageType.TEXT
    }
   }






  ]);

 }
}