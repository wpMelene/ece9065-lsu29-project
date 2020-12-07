import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
  // 消息中专服务
  @Injectable()
  export class MessageService {
   private subject = new Subject<any>();
   /**
   * content模块里面进行信息传输，类似广播
   * @param type 发送的信息类型
   *    1-你的信息
   *    2-你的信息
   *    3-你的信息
   *    4-你的信息
   *    5-你的信息
   */  
  public subscription: Subscription;

   constructor(private message: MessageService) {
  }
   sendMessage(type: number) {
    console.log('TAG' + '---------->>>' + type);
    this.subject.next({type: type});
   }

   clearMessage() {
    this.subject.next();
   }

   getMessage(): Observable<any> {
    return this.subject.asObservable();
   }
  // 使用该服务的地方，需要注册MessageService服务；

  // 消息接受的地方；
  
  ngAfterViewInit(): void {
    this.subscription = this.message.getMessage().subscribe(msg => {
     // 根据msg，来处理你的业务逻辑。
    })
   }

   // 组件生命周期结束的时候，记得注销一下，不然会卡；
   ngOnDestroy(): void {
    this.subscription.unsubscribe();
   }

   // 调用该服务的方法，发送信息；
   send():void {
    this.message.sendMessage('Message send.'); // 发送信息消息
   }
  }