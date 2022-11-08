import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DietaEditPage } from '././dieta-edit.page

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
