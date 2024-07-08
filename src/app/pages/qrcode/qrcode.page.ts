import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTextarea, IonInput } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { Barcode, BarcodeFormat, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { Platform } from "@ionic/angular"
import { AlertController } from '@ionic/angular';
import { BarcodeScanDesktopModalComponent } from './barcode-scan-desktop-modal.component';
import QRCodeStyling from 'qr-code-styling';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/core/constants/constant.routes';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
  standalone: true,
  imports: [IonInput,  
    SharedModule
  ]
})
export class QrcodePage implements OnInit {
  appRoutes = AppRoutes;
  public barcodes: Barcode[] = [];
  public webBarcodes: string = '';
  public qrcodeScanResult: string = '';
  public isSupported = false;
  public isPermissionGranted = false;
  public readonly barcodeFormat = BarcodeFormat;
  public readonly lensFacing = LensFacing;

  @ViewChild("canvas", { static: true }) canvas!: ElementRef;
  showScan: boolean = true;
  
  constructor(
    private readonly dialogService: DialogService,
    private readonly ngZone: NgZone,
    private platform: Platform,
    private alertController: AlertController,
    private router: Router
  ) { 
    addIcons({close})
  }

  ngOnInit() {
    this.canvas;
  }

  public async startScanMobile(): Promise<void> {
    const formats:any = [];//this.formGroup.get('formats')?.value || [];
    const lensFacing = LensFacing.Back; //this.formGroup.get('lensFacing')?.value || LensFacing.Back;
    const element = await this.dialogService.showModal({
      component: BarcodeScanningModalComponent,
      // Set `visibility` to `visible` to show the modal (see `src/theme/variables.scss`)
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: formats,
        lensFacing: lensFacing,
      },
    });
    element.onDidDismiss().then((result) => {
      const barcode: Barcode | undefined = result.data?.barcode;
      if (barcode) {
        this.qrcodeScanResult = barcode.rawValue;
        //barcodes = [barcode];
        this.generateQrCodePreview(barcode.rawValue)
      }
    });
  }

  async startScanWeb(){
    const element = await this.dialogService.showModal({
      component: BarcodeScanDesktopModalComponent,
      // Set `visibility` to `visible` to show the modal (see `src/theme/variables.scss`)
      cssClass: 'barcode-scanning-modal',
      showBackdrop: true,
      backdropDismiss: false,
      // componentProps: {
      //   formats: formats,
      //   lensFacing: lensFacing,
      // },
    });
    element.onDidDismiss().then((result) => {
      // console.log("ON DISMISS: " + JSON.stringify(result.data))
      const barcode: string | undefined = result.data?.barcode;
      if (barcode) {
        
        // this.webBarcodes = barcode;
        this.qrcodeScanResult = barcode;
        // console.log("ON DISMISS: " + this.webBarcodes)
        this.generateQrCodePreview(barcode)
        // this.showScan = true;
      }
    });
  }

  startScan(){
    //this.showScan = false;
    console.log("Platform is desktop: " + this.platform.is("desktop"));
    if(this.platform.is("desktop")){
      this.startScanWeb()
      //this.showScan = true;
    }
    else{ this.startScanMobile()
    }
  }

  generateQrCodePreview(currentQrCode: string){
    const qrCode = new QRCodeStyling({
      width: 200,
      height: 200,
      type: "svg",
      data: currentQrCode,
      image: "/assets/images/ubba-logo-white-v3.png",
      dotsOptions: {
          color: "#000",
          type: "rounded"
      },
      cornersSquareOptions: {
        type: "extra-rounded"
      },
      backgroundOptions: {
          color: "#e9ebee",
      },
      imageOptions: {
          crossOrigin: "anonymous",
          margin: 20
      }
  });
  
  qrCode.append(this.canvas.nativeElement);
  
  //qrCode.download({ name: "qr", extension: "svg" });
  this.showScan = false;

  this.presentAlert()

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'A Short Title Is Best',
      subHeader: 'A Sub Header Is Optional',
      message: 'A message should be a short, complete sentence.',
      buttons: [
        {
          text: 'Register',
          handler: () => {
            console.log("Okay")
            this.router.navigate(["/pets/ahkhhj"])
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log("Okay")
            //this.router.navigate(["/app"])
            this.alertController.dismiss()
          }
        },
      ],
    });

    await alert.present();
  }

}
