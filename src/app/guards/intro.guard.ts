import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(
    private navCtrl: NavController,
    private storage: Storage) { }

  async canActivate() {
    const mostreIntro = await this.storage.get('MostreLaIntro');
    if (mostreIntro) {
      return true;
    } else {
      this.navCtrl.navigateForward('/intro');
      return false;
    }
  }

}
