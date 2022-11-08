import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DietaEditPage } from './dieta_detail.page.spec'

describe('DietaEditPage', () => {
  let component: DietaEditPage;
  let fixture: ComponentFixture<DietaEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietaEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DietaEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
