import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BankServicesPage } from './bank-services.page';

describe('BankServicesPage', () => {
  let component: BankServicesPage;
  let fixture: ComponentFixture<BankServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankServicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BankServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
