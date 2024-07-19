import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonContent, IonMenu, IonMenuButton, IonButtons, IonButton, IonIcon, IonList, IonMenuToggle, IonItem, IonLabel, IonSplitPane, IonAvatar, IonChip, IonRouterLink, IonListHeader, IonToggle, IonFooter, IonImg } from '@ionic/angular/standalone';
import { MenuController, Platform, ToastController } from '@ionic/angular';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { calendar, calendarOutline, hammer, help, informationCircleOutline, logIn, map, mapOutline, moonOutline, peopleOutline, personAdd, logOutOutline, appsOutline, ellipse, home, notifications, notificationsOutline, search, settingsOutline, square, triangle, people, searchOutline, basket, basketOutline, logOut } from 'ionicons/icons';
import { TabsPage } from './pages/tabs/tabs.page';
import { tap, distinctUntilChanged, filter, map as maprx } from 'rxjs';
import { AppRoutes } from './core/constants/constant.routes';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from './core/services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonImg,
    IonFooter, 
    IonToggle,
    IonListHeader, 
    IonApp,
    IonRouterOutlet,
    IonRouterLink,
    IonChip,
    IonAvatar,
    IonSplitPane,
    IonLabel,
    IonItem,
    IonList,
    IonButton, 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonMenu,
    IonMenuButton,
    IonButtons,
    IonIcon,
    IonMenuToggle,
    IonList,
    CommonModule,
    TabsPage,
    RouterModule,
  ],
  providers: []
})
export class AppComponent implements OnInit{
  appRoutes = AppRoutes;
  
  appPages = [
    {
      title: 'Home',
      url: `/${AppRoutes.tabnav.entry}/${AppRoutes.tabnav.home}`,
      icon: 'apps'
    },
    {
      title: 'Search',
      url: `/${AppRoutes.tabnav.entry}/${AppRoutes.tabnav.search}`,
      icon: 'search'
    },
    {
      title: 'Notifications',
      url: `/${AppRoutes.tabnav.entry}/${AppRoutes.tabnav.notifications}`,
      icon: 'notifications'
    },
    // {
    //   title: 'Account',
    //   url: `/${AppRoutes.tabnav.entry}/${AppRoutes.tabnav.account}`,
    //   icon: 'people'
    // },
    // {
    //   title: 'Shop Online',
    //   url: "https://amazon.com",
    //   icon: 'basket'
    // }
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
    //this.initializeApp();
    addIcons({hammer, calendarOutline, mapOutline, personAdd, moonOutline, help, logIn, informationCircleOutline, people, peopleOutline, logOutOutline, triangle, ellipse, square, home, settingsOutline, appsOutline, search , notifications, notificationsOutline, searchOutline, basketOutline, logOut})
    
    this.router.events .pipe(
      filter((event) => event instanceof NavigationEnd),
      maprx((e) => e as NavigationEnd) 
    ).subscribe((e) => {
      console.log(e.url)
      this.selectedPath = e.url;
      console.log(this.selectedPath);
    })
  }

  async ngOnInit() {
    // await this.storage.create();
    this.checkLoginStatus();
    this.listenForLoginEvents();

    // this.swUpdate.versionUpdates.subscribe(async res => {
    //   const toast = await this.toastCtrl.create({
    //     message: 'Update available!',
    //     position: 'bottom',
    //     buttons: [
    //       {
    //         role: 'cancel',
    //         text: 'Reload'
    //       }
    //     ]
    //   });

    //   await toast.present();

    //   toast
    //     .onDidDismiss()
    //     .then(() => this.swUpdate.activateUpdate())
    //     .then(() => window.location.reload());
    // });
  

  }

  shopOnline(){
    window.open("https://amazon.com/", "_blank");
  }

  handleDisplayMode(){
    this.dark = !this.dark;
    console.log(this.dark);
  }

  
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
