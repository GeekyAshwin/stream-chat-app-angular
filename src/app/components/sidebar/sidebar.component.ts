import {Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ChatClientService} from "stream-chat-angular";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  @Input() channels: any = [];
  @ViewChild('crudModal') modal : ElementRef | undefined;
  public form: any;

  constructor(private chatService: ChatClientService, private toast: ToastrService) {

  }


  ngOnInit() {
    this.form = new FormGroup({
      'channel_name' : new FormControl(),
      'channel_id' : new FormControl(),
      'image_link' : new FormControl(),
    })
  }

  async createChannel() {
    const data = this.form.getRawValue();
    const channel = this.chatService.chatClient.channel('messaging', data.channel_id, {
      name: data.channel_name,
      image: data.image_link
    });
    await channel.create();
    this.channels.push(channel);
    this.toast.success('Channel created');
    this.modal?.nativeElement.remove();
    return 'Channel Created';
  }
}
