import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrListSortButtonComponent } from './qr-list-sort-button.component';

describe('QrListSortButtonComponent', () => {
  let component: QrListSortButtonComponent;
  let fixture: ComponentFixture<QrListSortButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrListSortButtonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrListSortButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
