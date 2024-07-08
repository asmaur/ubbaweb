import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
// import {
//     Barcode,
//     BarcodeFormat,
//     BarcodeScanner,
//     LensFacing,
//     StartScanOptions,
// } from '@capacitor-mlkit/barcode-scanning';
import { InputCustomEvent } from '@ionic/angular';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'app-barcode-scan-deskop',
    standalone: true,
    template: `
      <ion-header>
        <ion-toolbar>
          <ion-title>Scanning</ion-title>
          <ion-buttons slot="end">
            <ion-button (click)="closeModal()">
              <ion-icon name="close"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <ion-content>
        <div style="margin: .5rem 5rem; background-color: #fff">
          <ion-select 
            color="primary"
            label="Select camera"
            label-placement="floating"
            placeholder="camera ..."
            (ionChange)="onSelectChange($event)"
          >
            <!-- <ion-select-option value="apple">Apple</ion-select-option>
            <ion-select-option value="banana">Banana</ion-select-option>
            <ion-select-option value="orange">Orange</ion-select-option> -->
            @for (camera of avalaibleCameras; track $index) {
              <ion-select-option [value]="camera">{{camera.label}}</ion-select-option>
            }
          </ion-select>
      </div>

        <div #square class="square">
        <zxing-scanner 
          #scanner 
          [(device)]="selectedCamera"
          (scanSuccess)="handleQrCodeResult($event)"
          (scanSuccess)="scanSuccessHandler($event)"
          (camerasFound)="camerasFoundHandler($event)"
        ></zxing-scanner>
        </div>
        <!-- <div class="zoom-ratio-wrapper">
          <ion-range
            [min]="minZoomRatio"
            [max]="maxZoomRatio"
            [disabled]="minZoomRatio === undefined || maxZoomRatio === undefined"
            (ionChange)="setZoomRatio($any($event))"
          ></ion-range>
        </div> -->
        @if (isTorchAvailable) {
          <ion-fab slot="fixed" horizontal="end" vertical="bottom">
            <ion-fab-button (click)="toggleTorch()">
              <ion-icon name="flashlight"></ion-icon>
            </ion-fab-button>
          </ion-fab>
        }
      </ion-content>
    `,
    styles: [
    `
        ion-content {
            --background: transparent;
        }

    .square {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 16px;
        width: 200px;
        height: 200px;
        border: 6px solid white;
        box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.3);
        }
        :host zxing-scanner {
          //background-color: red;
          height: 188px;
          border-radius: 16px;

        }
        :host ::ng-deep video{
          //object-fit: cover;
          height: 188px !important;
          border-radius: 16px;
        }

    .zoom-ratio-wrapper {
        position: absolute;
        left: 50%;
        bottom: 16px;
        transform: translateX(-50%);
        width: 50%;
    }
    `,
    ],
    imports: [
        SharedModule,
    ],
    
})
export class BarcodeScanDesktopModalComponent
    implements OnInit, AfterViewInit, OnDestroy
  {
    @ViewChild('scanner', { static: false })
    scanner?: ZXingScannerComponent;
    // @Input()
    // public formats: BarcodeFormat[] = [];
    // @Input()
    // public lensFacing: LensFacing = LensFacing.Back;

  
    @ViewChild('square')
    public squareElement: ElementRef<HTMLDivElement> | undefined;
  
    public isTorchAvailable = false;
    public minZoomRatio: number | undefined;
    public maxZoomRatio: number | undefined;
    qrResultString: string = ''
    selectedCamera: any = null
    avalaibleCameras: any[] = []
  
    constructor(
      private readonly dialogService: DialogService,
      private readonly ngZone: NgZone,
    ) {}
  
    public ngOnInit(): void {
      // BarcodeScanner.isTorchAvailable().then((result) => {
      //   this.isTorchAvailable = result.available;
      // });
    }

    handleQrCodeResult(resultString: string) {
      // console.log('Result: ', resultString);
      this.qrResultString = resultString;
  }
  
    public ngAfterViewInit(): void {
      setTimeout(() => {
        this.startScan();
      }, 500);
    }
  
    public ngOnDestroy(): void {
      this.stopScan();
    }
  
    public setZoomRatio(event: InputCustomEvent): void {
      if (!event.detail.value) {
        return;
      }
      // BarcodeScanner.setZoomRatio({
      //   zoomRatio: parseInt(event.detail.value as any, 10),
      // });
    }
  
    public async closeModal(): Promise<void> {
      this.dialogService.dismissModal({
        barcode: this.qrResultString,
      });
    }
  
    public async toggleTorch(): Promise<void> {
      //await BarcodeScanner.toggleTorch();
    }
  
    private async startScan(): Promise<void> {
      // Hide everything behind the modal (see `src/theme/variables.scss`)
      document.querySelector('body')?.classList.add('barcode-scanning-active');
  
      // const options: StartScanOptions = {
      //   formats: this.formats,
      //   lensFacing: this.lensFacing,
      // };
  
      const squareElementBoundingClientRect =
        this.squareElement?.nativeElement.getBoundingClientRect();
      const scaledRect = squareElementBoundingClientRect
        ? {
            left: squareElementBoundingClientRect.left * window.devicePixelRatio,
            right:
              squareElementBoundingClientRect.right * window.devicePixelRatio,
            top: squareElementBoundingClientRect.top * window.devicePixelRatio,
            bottom:
              squareElementBoundingClientRect.bottom * window.devicePixelRatio,
            width:
              squareElementBoundingClientRect.width * window.devicePixelRatio,
            height:
              squareElementBoundingClientRect.height * window.devicePixelRatio,
          }
        : undefined;
      const detectionCornerPoints = scaledRect
        ? [
            [scaledRect.left, scaledRect.top],
            [scaledRect.left + scaledRect.width, scaledRect.top],
            [
              scaledRect.left + scaledRect.width,
              scaledRect.top + scaledRect.height,
            ],
            [scaledRect.left, scaledRect.top + scaledRect.height],
          ]
        : undefined;
      // const listener = await BarcodeScanner.addListener(
      //   'barcodeScanned',
      //   async (event) => {
      //     this.ngZone.run(() => {
      //       const cornerPoints = event.barcode.cornerPoints;
      //       if (detectionCornerPoints && cornerPoints) {
      //         if (
      //           detectionCornerPoints[0][0] > cornerPoints[0][0] ||
      //           detectionCornerPoints[0][1] > cornerPoints[0][1] ||
      //           detectionCornerPoints[1][0] < cornerPoints[1][0] ||
      //           detectionCornerPoints[1][1] > cornerPoints[1][1] ||
      //           detectionCornerPoints[2][0] < cornerPoints[2][0] ||
      //           detectionCornerPoints[2][1] < cornerPoints[2][1] ||
      //           detectionCornerPoints[3][0] > cornerPoints[3][0] ||
      //           detectionCornerPoints[3][1] < cornerPoints[3][1]
      //         ) {
      //           return;
      //         }
      //       }
      //       listener.remove();
      //       this.closeModal(event.barcode);
      //     });
      //   },
      // );
      // await BarcodeScanner.startScan(options);
      // void BarcodeScanner.getMinZoomRatio().then((result) => {
      //   this.minZoomRatio = result.zoomRatio;
      // });
      // void BarcodeScanner.getMaxZoomRatio().then((result) => {
      //   this.maxZoomRatio = result.zoomRatio;
      // });
    }
  
    private async stopScan(): Promise<void> {
      // Show everything behind the modal again
      document.querySelector('body')?.classList.remove('barcode-scanning-active');
  
      // await BarcodeScanner.stopScan();
    }

    scanSuccessHandler(result: any){
      // console.log(result)
      this.closeModal()
    }

    camerasFoundHandler(cameras: any){
      // console.log(cameras)
      this.avalaibleCameras = cameras;
      // if(cameras.length !=0){
      //   this.selectedCamera = cameras[0]
      // }
      
    }

    onSelectChange(value: any){
      this.selectedCamera = value.detail.value;
    }

  }