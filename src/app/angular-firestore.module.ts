import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment.prod';

@NgModule({
    imports: [
        AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule
    ],
    exports: [
        AngularFireModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule
    ]
})
export class AngularFireStoreModule {

}
