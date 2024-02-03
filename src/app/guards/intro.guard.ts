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
    private storage: Storage
    ) { }

  async canActivate() {
    const mostreIntro = await this.storage.get('MostreIntro');
    if (mostreIntro) {
      console.log('Ya mostre la intro.');
      return true;
    } else {
      console.log('No mostre la intro.');
      this.navCtrl.navigateForward('/intro');
      return false;
    }
  }

}
