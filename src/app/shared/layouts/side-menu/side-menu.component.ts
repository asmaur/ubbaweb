import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { IonRouterOutlet, IonFooter, IonImg } from "@ionic/angular/standalone";
import { MenuController, Platform, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { calendar, calendarOutline, hammer, help, informationCircleOutline, logIn, mapOutline, moonOutline, peopleOutline, personAdd, logOutOutline, filterOutline } from 'ionicons/icons';
import { NavigationEnd, Router } from '@angular/router';
import { tap, filter, map } from 'rxjs';
import { TabsPage } from 'src/app/pages/tabs/tabs.page';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  standalone: true,
  imports: [IonImg, IonFooter, IonRouterOutlet, TabsPage, 
    SharedModule
  ]
})
export class SideMenuComponent  implements OnInit {

  appPages = [
    {
      title: 'Schedule',
      url: '/home',
      icon: 'calendar'
    },
    {
      title: 'Speakers',
      url: '/search',
      icon: 'people'
    },
    {
      title: 'Map',
      url: '/app/tabs/map',
      icon: 'map'
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle'
    }
  ];
  loggedIn = false;
  dark = false;

  selectedPath = '';

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    // private storage: Storage,
    // private userData: UserData,
    // private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
  ) {
    addIcons({hammer, calendarOutline, mapOutline, personAdd, moonOutline, help, logIn, informationCircleOutline, peopleOutline, logOutOutline})
    
    this.router.events .pipe(
      filter((event) => event instanceof NavigationEnd),
      map((e) => e as NavigationEnd) 
    ).subscribe((e) => {
      console.log(e.url)
      this.selectedPath = e.url;
      console.log(this.selectedPath);
    })
  }

  ngOnInit() {}

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('hybrid')) {
        // StatusBar.hide();
        // SplashScreen.hide();
      }
    });
  }

  checkLoginStatus() {
    // return this.userData.isLoggedIn().then(loggedIn => {
    //   return this.updateLoggedInStatus(loggedIn);
    // });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    // this.userData.logout().then(() => {
    //   return this.router.navigateByUrl('/app/tabs/schedule');
    // });
  }

  openTutorial() {
    this.menu.enable(false);
    // this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }


}
