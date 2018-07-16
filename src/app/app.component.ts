import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private snackBar: MatSnackBar,
              private ngsw: ServiceWorkerModule,
              private updates: SwUpdate) {

  }

  updateNetworkStatusUI() {
    if (navigator.onLine) {
      // You might be online
      (document.querySelector('body') as any).style = '';
    } else {
      // 100% sure You are offline
      (document.querySelector('body') as any).style = 'filter: grayscale(1)';
    }
  }

  ngOnInit() {
    interval(6 * 60 * 60).subscribe(() => this.updates.checkForUpdate());

    this.updates.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);

      this.updates.activateUpdate().then(() => document.location.reload());
    });
    this.updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });

    // this.updateNetworkStatusUI();

    window.addEventListener('online', this.updateNetworkStatusUI);
    window.addEventListener('offline', this.updateNetworkStatusUI);

    // Checking Installation Status
    if ((navigator as any).standalone === false) {
      // This is an iOS device and we are in the browser
      this.snackBar.open('You can add this PWA to the Home Screen', '', { duration: 3000 });
    }
    if ((navigator as any).standalone === undefined) {
      // It's not iOS
      if (window.matchMedia('(display-mode: browser').matches) {
        // We are in the browser
        window.addEventListener('beforeinstallprompt', event => {
          event.preventDefault();
          const sb = this.snackBar.open('Do you want to install this App?', 'Install', {duration: 5000});
          sb.onAction().subscribe(() => {
            (event as any).prompt();
            (event as any).userChoice.then(result => {
              if (result.outcome === 'dismissed') {
                // TODO: Track no installation
              } else {
                // TODO: It was installed
              }
            });
          });
          return false;
        });
      }
    }

  }
}


// https://www.npmjs.com/package/angular2-fontawesome
// https://www.npmjs.com/package/materialize-css
// https://github.com/angular/angularfire2/blob/master/docs/install-and-setup.md
