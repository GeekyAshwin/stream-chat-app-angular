import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { Channel } from 'stream-chat';
import {ChannelService, ChatClientService, DefaultStreamChatGenerics} from 'stream-chat-angular';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-channel-preview',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './channel-preview.component.html',
  styles: ['.container {margin: 12px}', '.preview {font-size: 14px}'],
})
export class ChannelPreviewComponent implements OnChanges, OnInit {
  @Input() channel: Channel<DefaultStreamChatGenerics> | undefined;
  public channels: Channel<DefaultStreamChatGenerics>[] = [];
  messagePreview: string | undefined;

  constructor(private channelService: ChannelService, private chatService: ChatClientService) {}

  ngOnChanges(): void {
    const messages = this?.channel?.state?.messages;
    if (!messages) {
      return;
    }
    this.messagePreview = messages[messages.length - 1].text?.slice(0, 30);
  }

  setAsActiveChannel() {
    void this.channelService.setAsActiveChannel(this.channel!);
  }

  async createChannel() {
    const channelId = 'best-friends';
    const channelType = 'messaging';
    const image = 'https://plus.unsplash.com/premium_photo-1669135330275-9f19f00245a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVzdCUyMGZyaWVuZHN8ZW58MHx8MHx8fDA%3D';
    const name: string = 'Best Friends 2024';

    const channel = this.chatService.chatClient.channel(channelType, channelId, {
      image: image,
      name: name
    });
    await channel.create();

    return 'Channel Created';
  }

  getChannels() {
    this.chatService.chatClient.queryChannels({
      type: 'messaging'
    }).then((data) => {
      this.channels = data;
    });
  }

  ngOnInit(): void {
    this.getChannels();
    console.log(this.channels)
  }
}
