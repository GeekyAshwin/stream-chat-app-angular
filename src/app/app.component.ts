import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  ChannelPreviewContext,
  ChannelService,
  ChatClientService,
  CustomTemplatesService,
  MessageContext,
  StreamI18nService
} from "stream-chat-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private chatService: ChatClientService,
                     private streamService: StreamI18nService,
                     private channelService: ChannelService,
                     private templateService: CustomTemplatesService) {
  }
  title = 'stream-chat-app';
  @ViewChild('customMessageTemplate') messageTemplate!: TemplateRef<MessageContext>;
  @ViewChild('customChannelPreviewTemplate') channelPreviewTemplate!: TemplateRef<ChannelPreviewContext>;


  async ngOnInit() {
    const apiKey = 'cuxjn8tcjfrs';
    const userId = 'cool-breeze-0';
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY29vbC1icmVlemUtMCJ9.NxKxBi7939XuBvMV863jslEQ4zT7NdThA7a2KboD0xQ';
    this.chatService.init(apiKey, userId, userToken);
    this.streamService.setTranslation();

    const channel = this.chatService.chatClient.channel('messaging', 'talking-about-angular', {
      // add as many custom fields as you'd like
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
      name: 'Talking about Angular',
    });
    await channel.create();
    await this.channelService.init({
      type: 'messaging',
      id: {$eq: 'talking-about-angular'},
    });
  }

  ngAfterViewInit() {
    this.templateService.messageTemplate$.next(this.messageTemplate);
    this.templateService.channelPreviewTemplate$.next(this.channelPreviewTemplate);
  }
}
