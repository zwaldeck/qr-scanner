import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrListComponent } from './qr-list.component';

describe('QrListComponent', () => {
  let component: QrListComponent;
  let fixture: ComponentFixture<QrListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
