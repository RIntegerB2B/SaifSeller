import { Component, OnInit } from '@angular/core';
import {Notification} from './subscribe.model';
import { SwPush, SwUpdate } from '@angular/service-worker';
import {SettingsService} from '../settings.service';

@Component({
  selector: 'app-subsrcibe',
  templateUrl: './subsrcibe.component.html',
  styleUrls: ['./subsrcibe.component.css']
})
export class SubsrcibeComponent implements OnInit {
  subscribeModel: Notification;
/*   readonly VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY'; */

  constructor(private swUpdate: SwUpdate, private settingService: SettingsService, private swPush: SwPush) { }

  ngOnInit() {
  }
  subscribe() {
    console.log('Subscribed users');
    this.swPush.requestSubscription({
      serverPublicKey: 'BNMN_-1BUbcWu_HDPo-fedCKVZRtbx_Lv1718BzoFfiERREFBeknxGLmJvn5dzU1xM5zS-v5nkE8gU1ak49YOcE'
    })
      .then(sub => {
        this.subscribeModel = new Notification();
        this.subscribeModel.userSubscriptions = sub;
        this.settingService.addPushSubscriber(this.subscribeModel).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

}
