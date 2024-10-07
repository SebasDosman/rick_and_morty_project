import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
import { ModalComponent } from '../modal/modal.component';
import { StorageService } from 'src/app/services/storage.service';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
})
export class ScanComponent  implements OnInit {
  characters: any[] = [];
  isSupported = false;
  barcodes: Barcode[] = [];
  location: { latitude: number; longitude: number } | undefined;

  constructor(
    private alertController: AlertController,
    private storageService: StorageService,
    private modalController: ModalController,
    private http: HttpClient
  ) {}

  ngOnInit() {

    App.addListener('appStateChange', (state) => {
      if (!state.isActive) {
        BarcodeScanner.stopScan(); // Detén el escaneo si la app no está activa
      }
    });

    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    
    try {
      const { barcodes } = await BarcodeScanner.scan();
      if (barcodes.length > 0) {
        const qrCodeData = barcodes[0].rawValue;
        this.fetchCharacterData(qrCodeData);
      }
    } catch (error) {
      console.error("Error scanning:", error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo abrir la cámara.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
  
    if (camera !== 'granted') {
      await this.presentAlert();
      return false;
    }
    
    return true;
  }
  

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    
    await alert.present();
  }

  private fetchCharacterData(endpoint: string): void {

    this.http.get(endpoint).subscribe(
      async (character: any) => {

        if (this.storageService.isFound(character.id)) {
          const alert = await this.alertController.create({
            header: 'Personaje ya encontrado',
            message: 'El personaje ya está en tu lista.',
            buttons: ['OK'],
          });
          await alert.present();
          return;
        }

        await this.getLocation();

        character.ubicacion = {
          lat: this.location?.latitude,
          lng: this.location?.longitude
        };

        this.storageService.addFound(character);

        const successAlert = await this.alertController.create({
          header: 'Personaje Encontrado',
          message: `Se encontró al personaje: ${character.name}`,
          buttons: ['OK'],
        });

        await successAlert.present();

      },
      (error) => {
        console.error("Error fetching character data:", error);
        this.alertController.create({
          header: 'Error',
          message: 'No se pudo obtener los datos del personaje.',
          buttons: ['OK'],
        }).then(alert => alert.present());
      }
    );
  }

  private async getLocation(): Promise<void> {
    try {
      const position = await Geolocation.getCurrentPosition(); 
      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
    } catch (error) {
      console.error("Error getting location:", error);
      this.location = undefined;
    }
  }

  async openModal(character: any) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        character: character
      }
    });
    return await modal.present();
  }
}
