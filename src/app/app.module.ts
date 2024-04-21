import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TranslateModule} from "@ngx-translate/core";
import {StreamChatModule, StreamTextareaModule} from "stream-chat-angular";
import {MessageComponent} from "./message/message.component";
import {ChannelPreviewComponent} from "./channel-preview/channel-preview.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot(),
    StreamChatModule,
    StreamTextareaModule,
    MessageComponent,
    ChannelPreviewComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
