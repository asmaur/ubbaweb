import { Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTextarea, IonInput } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { Barcode, BarcodeFormat, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { addIcons } from 'ionicons';
import { close, scanCircleOutline } from 'ionicons/icons';
import { Platform } from "@ionic/angular"
import { AlertController } from '@ionic/angular';
import { BarcodeScanDesktopModalComponent } from './barcode-scan-desktop-modal.component';
import QRCodeStyling from 'qr-code-styling';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/core/constants/constant.routes';
import { PetService } from 'src/app/core/services/pet/pet.service';
import { HttpStatusCode } from '@angular/common/http';

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
  private tag: string = "";

  @ViewChild("canvas", { static: true }) canvas!: ElementRef;
  showScan: boolean = true;
  
  constructor(
    private readonly dialogService: DialogService,
    private readonly ngZone: NgZone,
    private platform: Platform,
    private alertController: AlertController,
    private router: Router,
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private petService: PetService
  ) { 
    addIcons({close,scanCircleOutline})
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
        // this.generateQrCodePreview(barcode.rawValue)
        this.checkTagStatus()
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
        // this.generateQrCodePreview(barcode)
        // this.showScan = true;
        this.checkTagStatus()
      }
    });
  }

  startScan(){
    //this.showScan = false;
    // this.renderer2.removeChild(
    //   this.elementRef.nativeElement, 
    //   this.canvas.nativeElement.remove()
    // );

    console.log("Platform is desktop: " + this.platform.is("desktop"));
    if(this.platform.is("desktop")){
      this.startScanWeb()
      //this.showScan = true;
    }
    else{ 
      this.startScanMobile()
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
  // this.showScan = false;

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
            this.cancelAlert();
          }
        },
      ],
    });

    await alert.present();
  }

  cancelAlert(){
    this.alertController.dismiss();
    // this.renderer2.removeChild(
    //   this.elementRef.nativeElement, 
    //   this.canvas.nativeElement.remove()
    // );
    // this.renderer2.createElement(
    //   this.elementRef.nativeElement,
    //   this.canvas.nativeElement
    // )
    // const qrcodeElementCanva = this.canvas.nativeElement.querySelectorAll("#qr-code-canva");
    // this.renderer2.removeChild(
    //     this.elementRef.nativeElement, 
    //     this.canvas.first.nativeElement
    //   );
  }

  checkTagStatus(){
    const loader = this.dialogService.showLoading()
    const url = new URL(this.qrcodeScanResult);
    this.tag = url.pathname.split("/")[2];
    console.log(this.tag);
    this.petService.getTagStatus({"uuid": this.tag}).subscribe({
      next: (response) => {
        if(response.registered){
          this.dialogService.showAlert({
            header: "Pet found!",
            message: "Ubba!, A pet with this tag was found.",
            buttons: [
              {
                text: "Cancel",
                role: "cancel"
              },
              {
                text: "View profile",
                handler: () => {
                  this.viewPetProfile(response.uuid)
                }
              }
            ]
          });
        }else{
          this.dialogService.showAlert({
            header: "Tag found!",
            message: "Ubba!, Let register a new pet.",
            buttons: [
              {
                text: "Cancel",
                role: "cancel"
              },
              {
                text: "Register",
                handler: () => {
                  this.registerNewPet(response.uuid)
                }
              }
            ]
          });
        }
      },
      error: (error) => {
        if(error.status == HttpStatusCode.NotFound){
          this.dialogService.showErrorAlert({
            message: "No Tag or pet found.",
            buttons: [
              {
                text: "Okay",
                role: "cancel"
              }
            ]
          })
        }else if(error.status == HttpStatusCode.BadRequest){
          this.dialogService.showErrorAlert({
            message: "Something went wrong.",
            buttons: [
              {
                text: "Okay",
                role: "cancel"
              }
            ]
          })
        }
      },
      complete: () => {
        this.dialogService.dismissLoading(loader);
      }
    });

    // this.dialogService.dismissLoading(loader);
  }

  viewPetProfile(tag: string){
    this.router.navigate(["pets/", tag]);
  }

  registerNewPet(tag: string){
    this.router.navigate(["pets/new"], {queryParams: {"tag": tag}});
  }

}
