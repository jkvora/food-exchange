import { Injectable } from '@angular/core';


import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import { SOCKET_EVENT } from '../models/common.model';
import { environment } from 'src/environments/environment';


@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(environment.API_URL);
    }

    public send(message): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('message', (data: any) => observer.next(data));
        });
    }

    public onEvent(event: SOCKET_EVENT): Observable<any> {
        return new Observable<SOCKET_EVENT>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
